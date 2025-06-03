"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="top-0 z-50">
      <nav className="bg-black text-white p-4 w-full md:max-w-[800px] md:mx-auto md:mt-[35px] md:rounded-[15px] flex justify-between items-center">

        {/* Logo Section */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/tshirt-icon.png"
            alt="Tinnitus Tees Logo"
            width={46}
            height={40}
            className="h-10 w-[46px]"
          />
        </Link>

        {/* Hamburger Icon and Menu */}
        <div className="sm:hidden">
          <button onClick={toggleMenu} aria-label="Toggle menu">
            {isMenuOpen ? (
              <svg
                className="h-8 w-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-8 w-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden sm:flex space-x-4">
          <Link href="/" className="hover:underline text-base">
            Home
          </Link>
          <Link href="/products" className="hover:underline text-base">
            Shop
          </Link>
          <Link href="/cart" className="hover:underline text-base">
            Cart
          </Link>
          <Link href="/about" className="hover:underline text-base">
            About
          </Link>
        </div>
      </nav>

      {/* Mobile Menu (Expanded) */}
      {isMenuOpen && (
        <div className={`sm:hidden bg-[rgba(0,0,0,.75)] text-white p-4 transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-screen' : 'max-h-0'}`}>
          <div className="flex flex-col space-y-2 text-right">
            <Link href="/" onClick={toggleMenu} className="text-2xl active:text-red-600 focus:text-red-600 focus:underline focus:underline-offset-4 transition-colors duration-300 py-1">
              Home
            </Link>
            <Link href="/products" onClick={toggleMenu} className="text-2xl active:text-red-600 focus:text-red-600 focus:underline focus:underline-offset-4 transition-colors duration-300 py-1">
              Shop
            </Link>
            <Link href="/cart" onClick={toggleMenu} className="text-2xl active:text-red-600 focus:text-red-600 focus:underline focus:underline-offset-4 transition-colors duration-300 py-1">
              Cart
            </Link>
            <Link href="/about" onClick={toggleMenu} className="text-2xl active:text-red-600 focus:text-red-600 focus:underline focus:underline-offset-4 transition-colors duration-300 py-1">
              About
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}