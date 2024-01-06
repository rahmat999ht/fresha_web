"use client";

import Link from 'next/link';
import { type ReactNode } from 'react';
import styles from './menuLink.module.css';
import { usePathname } from 'next/navigation';

interface MenuItem {
  title: string;
  path: string;
  icon: ReactNode;
}

const MenuLink: React.FC<{ item: MenuItem }> = ({ item }) => {
  const pathname = usePathname();

  return (
    <Link href={item.path}>
      <div className={`${styles.container} ${pathname === item.path && styles.active}`}>
        {item.icon}
        {item.title}
      </div>
    </Link>
  );
};

export default MenuLink;
