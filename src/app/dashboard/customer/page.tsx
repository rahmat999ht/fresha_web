import { type ICustomer } from "~/type/customer";
import CustamerView from "./view";
import { getAllCustomer } from "~/services/admin.service";

const CustamerPage: React.FC = async () => {
  const data: Promise<ICustomer[]> = getAllCustomer();

  return <CustamerView data={data} />;
};

export default CustamerPage;
