import type { Product } from "@prisma/client";
import { db } from "~/server/db";

export function decreaseStockProduct(id: string, stock: number) {
  return db.product.update({
    where: { id: id },
    data: {
      stock: {
        decrement: stock,
      },
    },
  });
}

export function getsProduct(): Promise<Product[]> {
  return db.product.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export function getsProductCount() {
  return db.product.count();
}

export function getProductFirst(id: string): Promise<Product | null> {
  return db.product.findFirst({
    where: { id },
    orderBy: { createdAt: "desc" },
  });
}

// export function getsProductRekomen(list_hastag: string[]): Promise<Product[]> {
//   return db.product.findMany({
//     where: { hastag_ml: { in: list_hastag } },
//     orderBy: { createdAt: "desc" },
//   });
// }

type TFIDF = Record<string, number>; // Changed from index signature to Record
type ProductWithTFIDF = Product & { tfidf: TFIDF };

// Fungsi untuk menghitung TF
function calculateTF(term: string, document: string[]): number {
  const termFrequency = document.filter(word => word === term).length;
  return termFrequency > 0 ? 1 + Math.log(termFrequency) : 0;
}

// Fungsi untuk menghitung IDF
function calculateIDF(term: string, allDocuments: string[][]): number {
  const docCount = allDocuments.length;
  const docsWithTerm = allDocuments.filter(doc => doc.includes(term)).length;
  return Math.log((docCount + 1) / (1 + docsWithTerm));
}

// Fungsi untuk menghitung TF-IDF
function calculateTFIDF(
  terms: string[],
  document: string[],
  allDocuments: string[][],
): TFIDF {
  const tfidf: TFIDF = {};
  terms.forEach((term) => {
    const tf = calculateTF(term, document);
    const idf = calculateIDF(term, allDocuments);
    tfidf[term] = tf * idf;
  });
  return tfidf;
}

// Fungsi untuk menghitung Cosine Similarity
function cosineSimilarity(vecA: TFIDF, vecB: TFIDF): number {
  const intersection = Object.keys(vecA).filter((term) => term in vecB);
  const dotProduct = intersection.reduce(
    (sum, term) => sum + (vecA[term] ?? 0) * (vecB[term] ?? 0),
    0,
  );

  const magnitudeA = Math.sqrt(
    Object.values(vecA).reduce((sum, val) => sum + val * val, 0),
  );
  const magnitudeB = Math.sqrt(
    Object.values(vecB).reduce((sum, val) => sum + val * val, 0),
  );
  return dotProduct / (magnitudeA * magnitudeB);
}

export async function getsProductRekomen(
  list_hastag: string[],
): Promise<Product[]> {
  // Mengambil produk dari database berdasarkan hashtag yang diberikan pengguna
  const products = await db.product.findMany({
    where: { hastag_ml: { in: list_hastag } },
    orderBy: { createdAt: "desc" },
  });

  // Memisahkan deskripsi produk menjadi kata-kata
  const productDocuments = products.map((product) => product.hastag_ml.split(" "));
  // Menggabungkan semua kata yang ada dalam deskripsi produk menjadi satu set unik
  const allTerms = Array.from(new Set(productDocuments.flat()));

  // Menghitung nilai TF-IDF untuk setiap produk
  const productTFIDFs: ProductWithTFIDF[] = products.map((product) => ({
    ...product,
    tfidf: calculateTFIDF(allTerms, product.hastag_ml.split(" "), productDocuments),
  }));

  // Menghitung nilai TF-IDF untuk hashtag pengguna
  const userTFIDF = calculateTFIDF(allTerms, list_hastag, productDocuments);

  // Memfilter produk yang memiliki nilai TF-IDF tidak null
  const filteredProductTFIDFs = productTFIDFs.filter((product) => {
    return Object.values(product.tfidf).some((value) => value !== null);
  });

  // Mengurutkan produk berdasarkan kesamaan cosine tertinggi
  filteredProductTFIDFs.sort((a, b) => {
    const simA = cosineSimilarity(a.tfidf, userTFIDF);
    const simB = cosineSimilarity(b.tfidf, userTFIDF);
    return simB - simA; // Urutkan berdasarkan kesamaan tertinggi
  });

  return filteredProductTFIDFs.map((product) => product);

  // productTFIDFs.sort((a, b) => {
  //   const simA = cosineSimilarity(a.tfidf, userTFIDF);
  //   const simB = cosineSimilarity(b.tfidf, userTFIDF);
  //   return simB - simA; // Urutkan berdasarkan kesamaan tertinggi
  // });

  // return productTFIDFs.map(product => product);
}