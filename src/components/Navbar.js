"use client"
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-white py-4'}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
            Library Lynx
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-indigo-600 transition-colors font-medium">
              Home
            </Link>
            <Link href="/allBooks" className="text-gray-700 hover:text-indigo-600 transition-colors font-medium">
            All Books
            </Link>
            <Link href="/pages/about" className="text-gray-700 hover:text-indigo-600 transition-colors font-medium">
              About
            </Link>
            <Link href="/pages/contacts" className="text-gray-700 hover:text-indigo-600 transition-colors font-medium"> 
              Contact
            </Link>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 space-y-3 pb-3 animate-fadeIn">
            <Link href="/" className="block text-gray-700 hover:text-indigo-600 transition-colors font-medium">
              Home
            </Link>
            <Link href="/allBooks" className="block text-gray-700 hover:text-indigo-600 transition-colors font-medium">
              Products
            </Link>
            <Link href="/pages/about" className="block text-gray-700 hover:text-indigo-600 transition-colors font-medium">
              About
            </Link>
            <Link href="/pages/contacts" className="block text-gray-700 hover:text-indigo-600 transition-colors font-medium">
              Contact
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}