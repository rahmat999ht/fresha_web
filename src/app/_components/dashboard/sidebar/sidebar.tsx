// import MenuLink from "./menuLink/menuLink";
import MenuLink from "../menulink/menuLink";
import styles from "./sidebar.module.css";
import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdShoppingBag,
  MdAttachMoney,
} from "react-icons/md";
import { FreshaImage } from "public/images/FRESHA";
interface MenuItem {
  title: string;
  path: string;
  icon: JSX.Element;
}

interface MenuCategory {
  title: string;
  list: MenuItem[];
}

const menuItems: MenuCategory[] = [
  {
    title: "Pages",
    list: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: <MdDashboard />,
      },
      {
        title: "Products",
        path: "/dashboard/products",
        icon: <MdShoppingBag />,
      },
      {
        title: "Transactions",
        path: "/dashboard/transactions",
        icon: <MdAttachMoney />,
      },
      {
        title: "Customer",
        path: "/dashboard/customer",
        icon: <MdSupervisedUserCircle />,
      },
    ],
  },
  // {
  //   title: "User",
  //   list: [
  //     {
  //       title: "Settings",
  //       path: "/settings",
  //       icon: <MdOutlineSettings />,
  //     },
  //     {
  //       title: "Help",
  //       path: "/help",
  //       icon: <MdHelpCenter />,
  //     },
  //   ],
  // },
];

const Sidebar: React.FC = async () => {
  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <FreshaImage />
      </div>
      <ul className={styles.list}>
        {menuItems.map((cat) => (
          <li key={cat.title}>
            <span className={styles.cat}>{cat.title}</span>
            {cat.list.map((item) => (
              <MenuLink item={item} key={item.title} />
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
