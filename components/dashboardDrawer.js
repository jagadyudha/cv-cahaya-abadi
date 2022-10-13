import React from "react";
import Link from "next/link";
import { HiMenuAlt1 } from "react-icons/hi";
import { useRouter } from "next/router";

const DashboardDrawer = ({ children }) => {
  const router = useRouter();

  if (router.asPath === "/dashboard") {
    return <>{children}</>;
  }

  return (
    <div className="drawer drawer-mobile">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content justify-center shadow-md">
        <label
          htmlFor="my-drawer-2"
          className=" drawer-button lg:hidden py-4 px-4 flex sticky top-0 bg-white"
        >
          <HiMenuAlt1 className="text-2xl" />
        </label>
        {children}
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 py-8 overflow-y-auto w-80 bg-base-100 text-base-content space-y-12">
          <Link href={"/"}>
            <a className="text-xl">
              <img
                src="/assets/images/logo.png"
                className="w-44 sm:w-48 navbar-start mx-2"
              />
            </a>
          </Link>
          <div>
            <li>
              <Link href="/dashboard/beranda">
                <a>Beranda</a>
              </Link>
            </li>
            <li>
              <Link href="/dashboard/menunggu">
                <a>Transaksi Menunggu</a>
              </Link>
            </li>
            <li>
              <Link href="/dashboard/berhasil">
                <a>Transaksi Berhasil</a>
              </Link>
            </li>
            <li>
              <Link href="/dashboard/produk">
                <a>Data Produk</a>
              </Link>
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default DashboardDrawer;
