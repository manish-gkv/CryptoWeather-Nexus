'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Weather', href: '/weather' },
    { name: 'Crypto', href: '/crypto' },
    { name: 'News', href: '/news' },
  ];

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed left-1/2 top-3 z-50 flex w-[90%] max-w-[1200px] -translate-x-1/2 items-center justify-between bg-white px-5 py-3 shadow-lg  ${
        isHidden ? '-translate-y-[130%]' : ''
      } ${isMenuOpen ? 'rounded-t-xl' : 'rounded-xl'}`}
    >
      <div className="text-lg font-semibold text-[#31513f]">CryptoWeather Nexus</div>

      {/* Desktop Navigation */}
      <ul className="hidden items-center gap-12 md:flex">
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link
              href={link.href}
              className={`relative text-sm font-medium text-gray-700 transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#31513f] after:transition-all after:duration-300 hover:text-[#31513f] hover:after:w-full ${
                pathname === link.href
                  ? 'text-[#31513f] after:w-full'
                  : ''
              }`}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="text-2xl text-[#31513f] md:hidden"
      >
        {isMenuOpen ? '×' : '☰'}
      </button>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <ul className="absolute left-0 top-full w-full rounded-b-xl bg-white py-2 shadow-lg md:hidden ">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className={`block px-4 py-3 text-sm text-gray-700 transition-colors hover:bg-gray-100 hover:text-[#31513f] ${
                  pathname === link.href ? 'bg-gray-100 text-[#31513f]' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}