"use client";

import React from "react";
import { usePathname } from "next/navigation";
import styles from "./navbar.module.css";
import { MdSearch } from "react-icons/md";

import {
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@nextui-org/react";
import { type IUser } from "~/app/model/user";

const Navbar: React.FC<IUser> = (props) => {
  const pathname = usePathname();

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        {pathname == "/" ? "Dashboard" : pathname.split("/").pop()}
      </div>
      <div className={styles.menu}>
        <div className={styles.search}>
          <MdSearch />
          <input type="text" placeholder="Search..." className={styles.input} />
        </div>
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src={props.image}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{props.email}</p>
            </DropdownItem>
            <DropdownItem key="logout" color="danger" href="/api/auth/signout">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
};

export default Navbar;
