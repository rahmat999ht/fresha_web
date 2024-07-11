const columns = [
  { name: "NAME", uid: "name", sortable: true },
  { name: "STOCK", uid: "stock", sortable: true },
  { name: "PRICE", uid: "price", sortable: true },
  { name: "CATEGORY", uid: "category" },
  { name: "ACTIONS", uid: "actions", sortable: true },
];

const stockOptions = [
  { name: "Tersedia", uid: "tersedia" },
  { name: "Tidak Tersedia", uid: "tidak tersedia" },
];

const product = [
  {
    id: 1,
    name: "Tumulawak",
    category: "akar",
    hastag_ml: "Manpricement",
    stock: "13",
    price: "29.000",
    image: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
  },
  {
    id: 2,
    name: "Bayam",
    category: "daun",
    hastag_ml: "Development",
    stock: "4",
    price: "25.000",
    image: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  },
  {
    id: 3,
    name: "Kacang Hijau",
    category: "biji-bijian",
    hastag_ml: "Development",
    stock: "13",
    price: "22.000",
    image: "https://i.pravatar.cc/150?u=a04258114e29026702d",
  },
];

export { columns, product, stockOptions };
