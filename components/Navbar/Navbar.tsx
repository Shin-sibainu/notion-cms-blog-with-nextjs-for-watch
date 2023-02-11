import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="lg:px-2 px-5 border-gray-200 container lg:w-2/5 mx-auto font-Zen">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <Link href="/" className="text-dark-100 font-medium text-2xl">
          ShinCode
        </Link>
        <div>
          <ul className="py-4 text-sm flex items-center">
            <li>
              <Link
                href="/"
                className="block px-4 py-2 text-dark-100 hover:text-sky-900 transition"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="block px-4 py-2 text-dark-100 hover:text-sky-900 transition"
              >
                Twitter
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="block px-4 py-2 text-dark-100 hover:text-sky-900 transition"
              >
                Qiita
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
