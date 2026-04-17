"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";
import Image from "next/image";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        <Image
          src="/logo.svg"
          alt="TravelTrucks"
          width={136}
          height={16}
          priority
        />
      </Link>

      <nav className={styles.nav}>
        <Link href="/" className={pathname === "/" ? styles.active : ""}>
          Home
        </Link>

        <Link
          href="/catalog"
          className={pathname === "/catalog" ? styles.active : ""}
        >
          Catalog
        </Link>
      </nav>

      <div className={styles.right} />
    </header>
  );
}
