"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Camera as Instagram, MessageCircle as Twitter, Mail, Heart } from 'lucide-react';
import { navLinks, brandConstants } from "@/lib/data";
import { staggerContainer, fadeInUp } from "@/lib/motion";

const footerSections = [
  {
    title: "Shop",
    links: [
      { label: "New Arrivals", href: "#products" },
      { label: "Bestsellers", href: "#featured" },
      { label: "All Products", href: "#products" },
      { label: "Sale", href: "#products" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#about" },
      { label: "Sustainability", href: "#about" },
      { label: "Careers", href: "#about" },
      { label: "Press", href: "#about" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "FAQ", href: "#newsletter" },
      { label: "Shipping & Returns", href: "#newsletter" },
      { label: "Track Order", href: "#newsletter" },
      { label: "Contact Us", href: "#newsletter" },
    ],
  },
];

export default function Footer() {
  const pathname = usePathname();

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#") && pathname === "/") {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getLinkHref = (href: string) => {
    if (href.startsWith("#")) {
      return pathname === "/" ? href : "/" + href;
    }
    return href;
  };

  return (
    <footer className="bg-[#1a1a1a] text-white">
      {/* Main Footer */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand Column */}
          <motion.div variants={fadeInUp} className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 mb-4 group">
              <span className="font-playfair text-2xl font-bold tracking-tight group-hover:text-[#f4a623] transition-colors duration-200">
                {brandConstants.name}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#f4a623] mt-1" />
            </Link>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs mb-6">
              {brandConstants.tagline}. We curate products that bring beauty and
              function into everyday life.
            </p>
            <div className="flex items-center gap-3">
              <a
                href={`https://instagram.com/${brandConstants.instagram.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="p-2.5 rounded-full bg-white/8 hover:bg-[#f4a623] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f4a623]"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={`https://twitter.com/${brandConstants.twitter.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="p-2.5 rounded-full bg-white/8 hover:bg-[#f4a623] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f4a623]"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${brandConstants.email}`}
                aria-label="Email us"
                className="p-2.5 rounded-full bg-white/8 hover:bg-[#f4a623] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f4a623]"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Link Columns */}
          {footerSections.map((section) => (
            <motion.div key={section.title} variants={fadeInUp}>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={getLinkHref(link.href)}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="text-sm text-white/60 hover:text-[#f4a623] transition-colors duration-200 focus-visible:outline-none focus-visible:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Bottom Bar */}
      <div className="border-t border-white/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-xs">
            &copy; {new Date().getFullYear()} {brandConstants.name}. All rights reserved.
          </p>
          <p className="text-white/30 text-xs flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-[#f4a623] fill-[#f4a623]" /> for modern living
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-white/40 text-xs hover:text-white/70 transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <Link
              href="/"
              className="text-white/40 text-xs hover:text-white/70 transition-colors duration-200"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}