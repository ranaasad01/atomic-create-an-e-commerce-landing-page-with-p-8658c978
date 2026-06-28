"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag } from 'lucide-react';
import { navLinks, navCTA, brandConstants } from "@/lib/data";

type NavbarProps = {
  cartCount?: number;
  onCartOpen?: () => void;
};

export default function Navbar({ cartCount = 0, onCartOpen }: NavbarProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#")) {
      if (pathname === "/") {
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
        setMobileOpen(false);
      }
    } else {
      setMobileOpen(false);
    }
  };

  const getLinkHref = (href: string) => {
    if (href.startsWith("#")) {
      return pathname === "/" ? href : "/" + href;
    }
    return href;
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.10)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 group"
              aria-label="Lumière home"
            >
              <span className="font-playfair text-2xl font-bold tracking-tight text-[#1a1a1a] group-hover:text-[#f4a623] transition-colors duration-200">
                {brandConstants.name}
              </span>
              <span className="hidden sm:block w-1.5 h-1.5 rounded-full bg-[#f4a623] mt-1" />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={getLinkHref(link.href)}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 hover:bg-[#f4a623]/10 hover:text-[#f4a623] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f4a623] ${
                    pathname === link.href && !link.href.startsWith("#")
                      ? "text-[#f4a623]"
                      : "text-[#1a1a1a]/70"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Cart Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onCartOpen}
                className="relative p-2.5 rounded-full hover:bg-[#f4a623]/10 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f4a623]"
                aria-label={`Shopping cart, ${cartCount} items`}
              >
                <ShoppingBag className="w-5 h-5 text-[#1a1a1a]" />
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 min-w-[18px] min-h-[18px] flex items-center justify-center bg-[#f4a623] text-white text-[10px] font-bold rounded-full leading-none px-1"
                  >
                    {cartCount > 99 ? "99+" : cartCount}
                  </motion.span>
                )}
              </motion.button>

              {/* CTA */}
              <Link
                href={getLinkHref(navCTA.href)}
                onClick={(e) => handleNavClick(e, navCTA.href)}
                className="hidden md:inline-flex items-center px-5 py-2.5 bg-[#1a1a1a] text-white text-sm font-semibold rounded-full hover:bg-[#f4a623] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f4a623] focus-visible:ring-offset-2"
              >
                {navCTA.label}
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileOpen((v) => !v)}
                className="md:hidden p-2.5 rounded-full hover:bg-[#f4a623]/10 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f4a623]"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed top-16 left-0 right-0 z-40 bg-white/98 backdrop-blur-md border-b border-black/5 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.12)] md:hidden"
          >
            <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1" aria-label="Mobile navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={getLinkHref(link.href)}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="px-4 py-3 text-base font-medium text-[#1a1a1a]/80 hover:text-[#f4a623] hover:bg-[#f4a623]/8 rounded-xl transition-all duration-200"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 border-t border-black/5 mt-1">
                <Link
                  href={getLinkHref(navCTA.href)}
                  onClick={(e) => handleNavClick(e, navCTA.href)}
                  className="block w-full text-center px-5 py-3 bg-[#1a1a1a] text-white font-semibold rounded-xl hover:bg-[#f4a623] transition-all duration-300"
                >
                  {navCTA.label}
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}