const columns = [
  { name: "NAME", uid: "name" },
  { name: "STATUS", uid: "status" },
  { name: "DATE", uid: "date" },
  { name: "PRICE", uid: "totPrice" },
];

const transactions = [
  {
    id: 1,
    nameCustomer: "Tony Reichert",
    totPrice: "$3.200",
    amount : 2,
    status: "done",
    date: "14.02.2024",
    email: "tony.reichert@example.com",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
  },
  {
    id: 2,
    nameCustomer: "Zoey Lang",
    totPrice: "$3.200",
    amount : 3,
    status: "pending",
    date: "14.02.2024",
    email: "zoey.lang@example.com",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  },
  {
    id: 3,
    nameCustomer: "Jane Fisher",
    totPrice: "$3.200",
    amount : 2,
    status: "done",
    date: "14.02.2024",
    email: "jane.fisher@example.com",
  },
  {
    id: 4,
    nameCustomer: "William Howard",
    totPrice: "$3.200",
    amount : 5,
    status: "cancelled",
    date: "14.02.2024",
    email: "william.howard@example.com",
  },
  {
    id: 5,
    nameCustomer: "Kristen Copper",
    totPrice: "$3.200",
    amount : 1,
    status: "done",
    date: "14.02.2024",
    email: "kristen.cooper@example.com",
  },
];
export { columns, transactions };
