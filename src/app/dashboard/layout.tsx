import React, { type ReactNode } from "react";
import Navbar from "../_components/dashboard/navbar/navbar";
import Sidebar from "../_components/dashboard/sidebar/sidebar";
import styles from "../_components/dashboard/dashboard.module.css";
import Footer from "../_components/dashboard/footer/footer";
import { getServerAuthSession } from "~/server/auth";
import { type IUserLogin } from "~/type/user";
interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = async({ children }) => {
  const session = await getServerAuthSession();
  const user: IUserLogin = {
    image: session?.user.image ?? "image kosong",
    name: session?.user.name ?? "name kosong",
    email: session?.user.email ?? "email kosong",
  };
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <Sidebar />
      </div>
      <div className={styles.content}>
        <Navbar image={user.image} name={user.name} email={user.email} />
        {children}
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
