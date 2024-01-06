"use client";

import React from "react";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Image,
} from "@nextui-org/react";

export interface IDashboardProps {
  src?: string;
  name?: string;
  email?: string;
}

const DashboardComponent = (props: IDashboardProps) => {
  const menuItems = ["Sayur", "Pesanan", "Customer"];
  const toMenuItem = ["/sayur", "/pesanan", "/customer"];
  return (
    <Navbar disableAnimation isBordered>
      <NavbarBrand>
        <Image
          src="public//images/f_logo.png"
          height={144}
          width={144}
          alt="Your Name"
        />
        <p className="font-bold text-inherit">Fresha</p>
      </NavbarBrand>

      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        {menuItems.map((item, index) => (
          <NavbarItem key={`${item}-${index}`} isActive>
            <Link href={toMenuItem[index]} color="foreground" size="sm">
              {item}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src={props.src}
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
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link className="w-full" color="foreground" href="#" size="lg">
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default DashboardComponent;
