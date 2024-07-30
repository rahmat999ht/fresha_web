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
type TFIDFDetails = {
  tf: number;
  idf: number;
  tfidf: number;
};

type TFIDF = Record<string, TFIDFDetails>;
type ProductWithTFIDF = Product & { tfidf: TFIDF };

// Fungsi untuk menghitung TF
const termFrequency = (term: string, document: string[]) => {
  const termCount = document.filter((t) => t === term).length;
  return termCount / document.length;
};

// Fungsi untuk menghitung IDF
const inverseDocumentFrequency = (term: string, documents: string[][]) => {
  const containingDocuments = documents.filter((document) =>
    document.includes(term),
  ).length;
  return Math.log(documents.length / (1 + containingDocuments));
};

// Fungsi untuk menghitung TF-IDF
function calculateTFIDF(
  allTerms: string[],
  documentTerms: string[],
  allDocuments: string[][],
) {
  const tfidf: { [term: string]: { tf: number; idf: number; tfidf: number } } =
    {};

  allTerms.forEach((term) => {
    if (term) {
      // Ensure term is not an empty string
      const tf = termFrequency(term, documentTerms);
      const idf = inverseDocumentFrequency(term, allDocuments);
      tfidf[term] = { tf, idf, tfidf: tf * idf };
    }
  });

  return tfidf;
}

// Fungsi untuk menghitung Cosine Similarity
function cosineSimilarity(vecA: TFIDF, vecB: TFIDF): number {
  const intersection = Object.keys(vecA).filter((term) => term in vecB);
  const dotProduct = intersection.reduce(
    (sum, term) => sum + (vecA[term]?.tfidf ?? 0) * (vecB[term]?.tfidf ?? 0),
    0,
  );

  const magnitudeA = Math.sqrt(
    Object.values(vecA).reduce((sum, val) => sum + val.tfidf * val.tfidf, 0),
  );
  const magnitudeB = Math.sqrt(
    Object.values(vecB).reduce((sum, val) => sum + val.tfidf * val.tfidf, 0),
  );
  return dotProduct / (magnitudeA * magnitudeB);
}

// export async function getsProductRekomen(
//   list_hastag: string[],
// ): Promise<ProductWithTFIDF[]> {
//   // Mengambil produk dari database berdasarkan hashtag yang diberikan pengguna
//   const products = await db.product.findMany({
//     where: { hastag_ml: { in: list_hastag } },
//     orderBy: { createdAt: "desc" },
//   });

//   // Memisahkan deskripsi produk menjadi kata-kata
//   const productDocuments = products.map((product) =>
//     product.hastag_ml.split(",").flatMap((hastag) => hastag.split(" "))
//   );

//   // Menggabungkan semua kata yang ada dalam deskripsi produk menjadi satu set unik
//   const allTerms = Array.from(new Set(productDocuments.flat()));

//   // Menghitung nilai TF-IDF untuk setiap produk
//   const productTFIDFs: ProductWithTFIDF[] = products.map((product) => ({
//     ...product,
//     tfidf: calculateTFIDF(
//       allTerms,
//       product.hastag_ml.split(",").flatMap((hastag) => hastag.split(" ")),
//       productDocuments,
//     ),
//   }));

//   // Menghitung nilai TF-IDF untuk hashtag pengguna
//   const userTFIDF = calculateTFIDF(
//     allTerms,
//     list_hastag.flatMap((hastag) => hastag.split(" ")),
//     productDocuments,
//   );

//   // Mengurutkan produk berdasarkan kesamaan cosine tertinggi
//   productTFIDFs.sort((a, b) => {
//     const simA = cosineSimilarity(a.tfidf, userTFIDF);
//     const simB = cosineSimilarity(b.tfidf, userTFIDF);
//     return simB - simA; // Urutkan berdasarkan kesamaan tertinggi
//   });

//   return productTFIDFs;
// }

export async function getsProductRekomen(
  list_hastag: string[],
): Promise<ProductWithTFIDF[]> {
  // Mengambil produk dari database
  const products = await db.product.findMany({
    where: {
      OR: list_hastag.map((tag) => ({
        hastag_ml: {
          contains: tag,
          mode: "insensitive",
        },
      })),
    },
    orderBy: { createdAt: "desc" },
  });

  // Filter produk berdasarkan list_hastag
  const filteredProducts = products.filter((product) => {
    const productHashtags = product.hastag_ml
      .split(",")
      .map((tag) => tag.trim());
    return list_hastag.some((tag) => productHashtags.includes(tag));
  });

  // Memisahkan deskripsi produk menjadi kata-kata
  const productDocuments = filteredProducts.map((product) =>
    product.hastag_ml.split(",").flatMap((hastag) => hastag.split(" ")),
  );

  // Menggabungkan semua kata yang ada dalam deskripsi produk menjadi satu set unik
  const allTerms = Array.from(new Set(productDocuments.flat()));

  // Menghitung nilai TF-IDF untuk setiap produk
  const productTFIDFs: ProductWithTFIDF[] = filteredProducts.map((product) => ({
    ...product,
    tfidf: calculateTFIDF(
      allTerms,
      product.hastag_ml.split(",").flatMap((hastag) => hastag.split(" ")),
      productDocuments,
    ),
  }));

  // Menghitung nilai TF-IDF untuk hashtag pengguna
  const userTFIDF = calculateTFIDF(
    allTerms,
    list_hastag.flatMap((hastag) => hastag.split(" ")),
    productDocuments,
  );

  // Mengurutkan produk berdasarkan kesamaan cosine tertinggi
  productTFIDFs.sort((a, b) => {
    const simA = cosineSimilarity(a.tfidf, userTFIDF);
    const simB = cosineSimilarity(b.tfidf, userTFIDF);
    return simB - simA; // Urutkan berdasarkan kesamaan tertinggi
  });

  return productTFIDFs;
}
