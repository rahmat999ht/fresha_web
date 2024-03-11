import TransactionView from "./view";
import { getAllOrder } from "~/services/admin.service";
import { type IOrder } from "~/type/order";

const TransactionPage: React.FC = async () => {
  const data: Promise<IOrder[]> = getAllOrder();

  return <TransactionView data={data} />;
};

export default TransactionPage;
