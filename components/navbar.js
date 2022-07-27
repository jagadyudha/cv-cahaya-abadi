import React from "react";
import Link from "next/link";
import { HiMenuAlt1 } from "react-icons/hi";

const navbar = [
  { name: "Beranda", href: "/" },
  { name: "Peti Mati", href: "/theme" },
  { name: "Tentang Kami", href: "/reseller" },
  { name: "Kontak Kami", href: "/reseller" },
];

const Navbar = () => {
  return (
    <>
      <nav className="z-10 bg-white mx-auto border-b md:py-3 py-1 sticky top-0 backdrop-filter backdrop-blur-sm bg-opacity-90">
        <div className="navbar max-w-7xl mx-auto flex justify-between">
          <a className="btn btn-ghost normal-case text-xl">
            <img
              src="/assets/images/logo.png"
              className="w-44 sm:w-48 navbar-start mx-2"
            />
          </a>

          {/* Desktop */}
          <div className="hidden lg:flex items-center navbar-end w-full">
            {/* Desktop Menu */}
            <ul className="menu menu-horizontal p-0">
              {navbar.map((item, index) => (
                <li key={index}>
                  <Link href={item.href}>
                    <a className="text-lg">{item.name}</a>
                  </Link>
                </li>
              ))}
              <button
                //   onClick={loginToggle}
                className="btn btn-ghost mr-2 ml-10 mt-0.5 capitalize text-lg font-normal"
              >
                Masuk
              </button>
            </ul>
          </div>

          {/* Right Side */}
          <div>
            {/* Register Button */}
            <button
              //   onClick={registerToggle}
              className="btn btn-primary text-white"
            >
              Daftar
            </button>

            {/* Mobile */}
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost lg:hidden">
                <HiMenuAlt1 />
              </label>

              {/* Mobile Menu */}
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content p-2 shadow-lg bg-base-100 border border-black border-opacity-10 mt-5 rounded-box w-52"
              >
                {navbar.map((item, index) => (
                  <li key={index}>
                    <Link href={item.href}>
                      <a className="text-lg">{item.name}</a>
                    </Link>
                  </li>
                ))}

                <button
                  // onClick={loginToggle}
                  className="btn btn-primary text-white mt-5"
                >
                  Masuk
                </button>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
