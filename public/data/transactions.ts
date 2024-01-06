const columns = [
  { name: "NAME", uid: "name" },
  { name: "STATUS", uid: "status" },
  { name: "DATE", uid: "date" },
  { name: "AMOUNT", uid: "amount" },
];

const transactions = [
  {
    id: 1,
    name: "Tony Reichert",
    amount: "$3.200",
    status: "done",
    date: "14.02.2024",
    email: "tony.reichert@example.com",

    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
  },
  {
    id: 2,
    name: "Zoey Lang",
    amount: "$3.200",
    status: "pending",
    date: "14.02.2024",
    email: "zoey.lang@example.com",

    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  },
  {
    id: 3,
    name: "Jane Fisher",
    amount: "$3.200",
    status: "done",
    date: "14.02.2024",
    email: "jane.fisher@example.com",
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
  },
  {
    id: 4,
    name: "William Howard",
    amount: "$3.200",
    status: "cancelled",
    date: "14.02.2024",
    email: "william.howard@example.com",

    avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
  },
  {
    id: 5,
    name: "Kristen Copper",
    amount: "$3.200",
    status: "done",
    date: "14.02.2024",
    email: "kristen.cooper@example.com",

    avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
  },
];
export { columns, transactions };
