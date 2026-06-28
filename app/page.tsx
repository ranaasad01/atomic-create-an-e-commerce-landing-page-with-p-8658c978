"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { Star, ShoppingBag, ArrowRight, Check, Truck, RefreshCw, Shield, Heart, ChevronRight, Sparkles } from 'lucide-react';
import { brandConstants } from "@/lib/data";
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
  slideInLeft,
  slideInRight,
} from "@/lib/motion";

// ─── Inline Data ────────────────────────────────────────────────────────────

const products = [
  {
    id: "p1",
    name: "Ceramic Pour-Over Set",
    price: 89,
    originalPrice: 120,
    rating: 4.9,
    reviewCount: 214,
    category: "Kitchen",
    image: "https://m.media-amazon.com/images/I/7159+ELcEOL._AC_UF894,1000_QL80_.jpg",
    badge: "Bestseller",
    description:
      "Hand-thrown stoneware with a matte glaze finish. Brews a perfect cup every morning.",
  },
  {
    id: "p2",
    name: "Linen Throw Blanket",
    price: 64,
    originalPrice: undefined,
    rating: 4.8,
    reviewCount: 178,
    category: "Home",
    image: "https://m.media-amazon.com/images/I/71EUmwZhM6L.jpg",
    badge: "New",
    description:
      "Woven from 100% European flax. Breathable, durable, and endlessly cozy.",
  },
  {
    id: "p3",
    name: "Walnut Desk Organizer",
    price: 112,
    originalPrice: undefined,
    rating: 4.7,
    reviewCount: 96,
    category: "Office",
    image: "https://i.etsystatic.com/18396026/r/il/269bc5/2056444760/il_fullxfull.2056444760_4tcv.jpg",
    badge: undefined,
    description:
      "Solid American walnut with a natural oil finish. Keeps your workspace calm and clear.",
  },
  {
    id: "p4",
    name: "Beeswax Pillar Candle",
    price: 38,
    originalPrice: undefined,
    rating: 5.0,
    reviewCount: 312,
    category: "Living",
    image: "https://m.media-amazon.com/images/I/71dZ-SyWiHL.jpg",
    badge: "Top Rated",
    description:
      "Pure beeswax with a cotton wick. Burns clean for 60+ hours with a warm honey scent.",
  },
  {
    id: "p5",
    name: "Merino Wool Cushion",
    price: 74,
    originalPrice: 95,
    rating: 4.6,
    reviewCount: 143,
    category: "Home",
    image: "https://cb2.scene7.com/is/image/CB2/AdleyChcGyMrnWlPllwCvr20SHF25?$web_pdp_main_carousel_med$",
    badge: "Sale",
    description:
      "Filled with ethically sourced merino wool. Naturally temperature-regulating.",
  },
  {
    id: "p6",
    name: "Brass Bookends Pair",
    price: 58,
    originalPrice: undefined,
    rating: 4.8,
    reviewCount: 87,
    category: "Office",
    image: "https://furnishgreen.com/cdn/shop/files/FG-42_6644211a-c4de-4a89-9d39-288e52e3a8c9.jpg?v=1781903154&width=1946",
    badge: undefined,
    description:
      "Solid brass with a brushed finish. A quiet, lasting presence on any shelf.",
  },
];

const featuredProduct = {
  id: "fp1",
  name: "The Lumière Morning Collection",
  subtitle: "Ritual objects for a considered start",
  price: 220,
  image: "https://i.ebayimg.com/images/g/aX8AAOSwP8Jk8MOx/s-l1200.jpg",
  features: [
    "Ceramic pour-over + matching mug",
    "Beeswax candle in linen pouch",
    "Hand-stamped recipe card",
    "Gift-ready kraft box",
  ],
  badge: "Limited Edition",
};

const testimonials = [
  {
    id: "t1",
    name: "Mara Jensen",
    location: "Copenhagen",
    rating: 5,
    text: "Every piece I've ordered from Lumière has exceeded my expectations. The quality is genuinely exceptional and the packaging feels like a gift to yourself.",
    avatar: "https://static.wikia.nocookie.net/tvdatabase/images/5/57/Maren_Jensen_001.jpg/revision/latest?cb=20150512155756",
    product: "Ceramic Pour-Over Set",
  },
  {
    id: "t2",
    name: "Oliver Reyes",
    location: "London",
    rating: 5,
    text: "I bought the walnut organizer six months ago and it's only gotten more beautiful with use. This is what slow design looks like.",
    avatar: "https://www.myprivia.com/sites/default/files/2025-04/flsp_Oliver_Reyes.jpg",
    product: "Walnut Desk Organizer",
  },
  {
    id: "t3",
    name: "Suki Tanaka",
    location: "Tokyo",
    rating: 5,
    text: "The linen throw is the softest thing in my apartment. I've recommended it to everyone I know. Worth every penny.",
    avatar: "https://covers.libro.fm/9781792227080_1120.jpg",
    product: "Linen Throw Blanket",
  },
];

const valueProps = [
  {
    icon: Truck,
    title: "Free Shipping Over $75",
    description: "Complimentary delivery on all orders above $75. Express options available at checkout.",
  },
  {
    icon: RefreshCw,
    title: "30-Day Returns",
    description: "Not in love? Return anything within 30 days, no questions asked.",
  },
  {
    icon: Shield,
    title: "Lifetime Guarantee",
    description: "Every product is backed by our craftsmanship guarantee. We stand behind what we make.",
  },
  {
    icon: Heart,
    title: "Ethically Sourced",
    description: "We work only with makers who share our commitment to fair wages and sustainable materials.",
  },
];

const categories = [
  { label: "Kitchen", image: "https://www.happi.com/wp-content/uploads/2024/04/710_main-28.jpg", count: 24 },
  { label: "Home", image: "https://www.happi.com/wp-content/uploads/2024/04/710_main-28.jpg", count: 38 },
  { label: "Office", image: "https://hips.hearstapps.com/hmg-prod/images/bcacfded-198f-4492-899c-da0e4457a247.jpg", count: 17 },
  { label: "Living", image: "https://hips.hearstapps.com/hmg-prod/images/bcacfded-198f-4492-899c-da0e4457a247.jpg", count: 29 },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

const cardHover: Variants = {
  rest: { y: 0, boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 4px 12px -4px rgba(0,0,0,0.08)" },
  hover: { y: -6, boxShadow: "0 4px 8px rgba(0,0,0,0.06), 0 20px 40px -12px rgba(0,0,0,0.16)" },
};

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            className={`w-3.5 h-3.5 ${
              i <= Math.round(rating)
                ? "fill-[#f4a623] text-[#f4a623]"
                : "fill-transparent text-[#1a1a1a]/20"
            }`}
          />
        ))}
      </div>
      <span className="text-xs text-[#1a1a1a]/50 font-medium">
        {rating.toFixed(1)} ({count})
      </span>
    </div>
  );
}

function ProductCard({ product, index }: { product: typeof products[0]; index: number }) {
  const [wished, setWished] = useState(false);

  return (
    <motion.div
      variants={fadeInUp}
      initial="rest"
      whileHover="hover"
      animate="rest"
      custom={index}
      className="group relative bg-white rounded-2xl overflow-hidden border border-black/5 cursor-pointer"
      style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 4px 12px -4px rgba(0,0,0,0.08)" }}
    >
      <motion.div variants={cardHover} className="h-full flex flex-col">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-[#f8f6f2]">
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {product.badge && (
            <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#f4a623] text-white tracking-wide">
              {product.badge}
            </span>
          )}
          <button
            onClick={() => setWished((w) => !w)}
            aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
            className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm border border-black/5 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
          >
            <Heart
              className={`w-4 h-4 transition-colors duration-200 ${
                wished ? "fill-rose-500 text-rose-500" : "text-[#1a1a1a]/50"
              }`}
            />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1 gap-2">
          <span className="text-xs font-medium text-[#f4a623] uppercase tracking-widest">
            {product.category}
          </span>
          <h3 className="font-playfair text-lg font-semibold text-[#1a1a1a] leading-snug">
            {product.name}
          </h3>
          <p className="text-sm text-[#1a1a1a]/55 leading-relaxed flex-1">
            {product.description}
          </p>
          <StarRating rating={product.rating} count={product.reviewCount} />
          <div className="flex items-center justify-between mt-1 pt-3 border-t border-black/5">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-[#1a1a1a]">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-[#1a1a1a]/35 line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1a1a1a] text-white text-sm font-medium hover:bg-[#f4a623] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f4a623]"
              aria-label={`Add ${product.name} to cart`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              Add
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <main className="overflow-x-hidden">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center bg-[#f8f6f2] overflow-hidden">
        {/* Background texture */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 70% 40%, rgba(244,166,35,0.12) 0%, transparent 60%), radial-gradient(circle at 20% 80%, rgba(244,166,35,0.08) 0%, transparent 50%)",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6"
          >
            <motion.span
              variants={fadeIn}
              className="inline-flex items-center gap-2 w-fit px-3.5 py-1.5 rounded-full bg-[#f4a623]/12 border border-[#f4a623]/25 text-[#c4820a] text-xs font-semibold tracking-widest uppercase"
            >
              <Sparkles className="w-3.5 h-3.5" />
              New Collection 2025
            </motion.span>

            <motion.h1
              variants={fadeInUp}
              className="font-playfair text-5xl sm:text-6xl lg:text-7xl font-bold text-[#1a1a1a] leading-[1.08] tracking-tight text-balance"
            >
              Objects worth
              <br />
              <span className="text-[#f4a623]">living with.</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg text-[#1a1a1a]/60 leading-relaxed max-w-md text-pretty"
            >
              Lumière curates handcrafted homeware and everyday objects from
              independent makers. Each piece is chosen for its beauty, its
              honesty, and its ability to last.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-3 pt-2">
              <Link
                href="#products"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#1a1a1a] text-white font-semibold text-sm hover:bg-[#f4a623] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f4a623] shadow-[0_4px_14px_rgba(0,0,0,0.18)]"
              >
                Shop the Collection
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="#featured"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#featured")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-[#1a1a1a]/20 text-[#1a1a1a] font-semibold text-sm hover:border-[#f4a623] hover:text-[#f4a623] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f4a623]"
              >
                View Featured
              </Link>
            </motion.div>

            <motion.div
              variants={fadeIn}
              className="flex items-center gap-6 pt-2 border-t border-black/8"
            >
              {[
                { value: "4,800+", label: "Happy customers" },
                { value: "98%", label: "5-star reviews" },
                { value: "60+", label: "Makers worldwide" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span className="font-playfair text-2xl font-bold text-[#1a1a1a]">
                    {stat.value}
                  </span>
                  <span className="text-xs text-[#1a1a1a]/50 font-medium">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — hero image */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            animate="visible"
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-[0_8px_32px_rgba(0,0,0,0.12),0_2px_4px_rgba(0,0,0,0.06)]">
              <img
                src="https://www.lumiere.com.au/wp-content/uploads/2026/02/Sweet-Pea-jasmine-2.jpg"
                alt="Lumière curated homeware collection"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5, ease: "easeOut" }}
              className="absolute -bottom-5 -left-5 bg-white rounded-2xl px-5 py-4 shadow-[0_4px_24px_rgba(0,0,0,0.12)] border border-black/5"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#f4a623]/15 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-[#f4a623]" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#1a1a1a]">New arrivals weekly</p>
                  <p className="text-xs text-[#1a1a1a]/50">Handpicked by our team</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Value Props ──────────────────────────────────────────────────── */}
      <section className="bg-white border-y border-black/6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {valueProps.map((vp) => (
            <motion.div
              key={vp.title}
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#f4a623]/12 flex items-center justify-center">
                <vp.icon className="w-5 h-5 text-[#f4a623]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#1a1a1a] leading-snug">
                  {vp.title}
                </p>
                <p className="text-xs text-[#1a1a1a]/50 leading-relaxed mt-0.5 hidden sm:block">
                  {vp.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Categories ───────────────────────────────────────────────────── */}
      <section className="bg-[#f8f6f2] py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col gap-10"
          >
            <motion.div variants={fadeInUp} className="flex items-end justify-between">
              <div>
                <p className="text-xs font-semibold text-[#f4a623] uppercase tracking-widest mb-2">
                  Browse by Room
                </p>
                <h2 className="font-playfair text-4xl md:text-5xl font-bold text-[#1a1a1a] tracking-tight text-balance">
                  Shop by Category
                </h2>
              </div>
              <Link
                href="#products"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-[#1a1a1a]/60 hover:text-[#f4a623] transition-colors duration-200"
              >
                All products <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-2 lg:grid-cols-4 gap-4"
            >
              {categories.map((cat, i) => (
                <motion.div
                  key={cat.label}
                  variants={scaleIn}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.25 }}
                  className={`relative overflow-hidden rounded-2xl cursor-pointer group ${
                    i === 0 ? "lg:row-span-1" : ""
                  }`}
                  style={{ aspectRatio: i === 0 ? "3/4" : "4/3" }}
                >
                  <img
                    src={cat.image}
                    alt={cat.label}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="font-playfair text-xl font-bold text-white leading-tight">
                      {cat.label}
                    </p>
                    <p className="text-white/70 text-xs mt-0.5">{cat.count} products</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Products Grid ────────────────────────────────────────────────── */}
      <section id="products" className="bg-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col gap-12"
          >
            <motion.div variants={fadeInUp} className="text-center max-w-xl mx-auto">
              <p className="text-xs font-semibold text-[#f4a623] uppercase tracking-widest mb-3">
                The Collection
              </p>
              <h2 className="font-playfair text-4xl md:text-5xl font-bold text-[#1a1a1a] tracking-tight text-balance">
                Thoughtfully chosen, beautifully made
              </h2>
              <p className="mt-4 text-[#1a1a1a]/55 leading-relaxed text-pretty">
                Every product in our collection is tested by our team and sourced
                directly from the makers who craft them.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {products.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </motion.div>

            <motion.div variants={fadeInUp} className="flex justify-center">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border-2 border-[#1a1a1a] text-[#1a1a1a] font-semibold text-sm hover:bg-[#1a1a1a] hover:text-white transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f4a623]"
              >
                Load More Products
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Featured Product ─────────────────────────────────────────────── */}
      <section id="featured" className="bg-[#1a1a1a] py-20 md:py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image */}
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden aspect-square shadow-[0_8px_48px_rgba(0,0,0,0.4)]">
                <img
                  src={featuredProduct.image}
                  alt={featuredProduct.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#f4a623]/10 to-transparent" />
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-[#f4a623] flex items-center justify-center shadow-lg">
                <div className="text-center">
                  <p className="text-white text-xs font-bold leading-tight">Limited</p>
                  <p className="text-white text-xs font-bold leading-tight">Edition</p>
                </div>
              </div>
            </motion.div>

            {/* Copy */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="flex flex-col gap-6"
            >
              <motion.span
                variants={fadeIn}
                className="inline-flex w-fit items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f4a623]/15 border border-[#f4a623]/30 text-[#f4a623] text-xs font-semibold tracking-widest uppercase"
              >
                <Sparkles className="w-3.5 h-3.5" />
                {featuredProduct.badge}
              </motion.span>

              <motion.h2
                variants={fadeInUp}
                className="font-playfair text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight text-balance"
              >
                {featuredProduct.name}
              </motion.h2>

              <motion.p
                variants={fadeInUp}
                className="text-white/60 text-lg leading-relaxed"
              >
                {featuredProduct.subtitle}. A complete morning ritual, curated
                with care and packaged as a gift for someone you love — or
                yourself.
              </motion.p>

              <motion.ul variants={staggerContainer} className="flex flex-col gap-3">
                {featuredProduct.features.map((f) => (
                  <motion.li
                    key={f}
                    variants={fadeInUp}
                    className="flex items-center gap-3 text-white/80 text-sm"
                  >
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#f4a623]/20 border border-[#f4a623]/40 flex items-center justify-center">
                      <Check className="w-3 h-3 text-[#f4a623]" />
                    </span>
                    {f}
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div variants={fadeInUp} className="flex items-center gap-4 pt-2">
                <div>
                  <p className="text-white/40 text-xs font-medium uppercase tracking-widest">
                    Collection price
                  </p>
                  <p className="font-playfair text-4xl font-bold text-white">
                    ${featuredProduct.price}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="flex-1 flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-[#f4a623] text-white font-semibold text-sm hover:bg-[#e09510] transition-all duration-300 shadow-[0_4px_20px_rgba(244,166,35,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f4a623] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a1a]"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Add Collection to Cart
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────────────── */}
      <section className="bg-[#f8f6f2] py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col gap-12"
          >
            <motion.div variants={fadeInUp} className="text-center max-w-lg mx-auto">
              <p className="text-xs font-semibold text-[#f4a623] uppercase tracking-widest mb-3">
                Real Reviews
              </p>
              <h2 className="font-playfair text-4xl md:text-5xl font-bold text-[#1a1a1a] tracking-tight text-balance">
                Loved by people who care about quality
              </h2>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {testimonials.map((t, i) => (
                <motion.div
                  key={t.id}
                  variants={fadeInUp}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.25 }}
                  className={`bg-white rounded-2xl p-7 border border-black/5 flex flex-col gap-4 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)] ${
                    i === 1 ? "md:mt-6" : ""
                  }`}
                >
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-4 h-4 fill-[#f4a623] text-[#f4a623]" />
                    ))}
                  </div>
                  <p className="text-[#1a1a1a]/75 text-sm leading-relaxed flex-1 text-pretty" style={t.text === "The linen throw is the softest thing in my apartment. I've recommended it to everyone I know. Worth every penny." ? { color: "#f59e0b" } : undefined}>
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 pt-2 border-t border-black/5">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-[#f4a623]/20"
                    />
                    <div>
                      <p className="text-sm font-semibold text-[#1a1a1a]">{t.name}</p>
                      <p className="text-xs text-[#1a1a1a]/45">{t.location} · {t.product}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── About ────────────────────────────────────────────────────────── */}
      <section id="about" className="bg-white py-20 md:py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Copy */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="flex flex-col gap-6 order-2 md:order-1"
            >
              <motion.p
                variants={fadeIn}
                className="text-xs font-semibold text-[#f4a623] uppercase tracking-widest"
              >
                Our Story
              </motion.p>
              <motion.h2
                variants={fadeInUp}
                className="font-playfair text-4xl md:text-5xl font-bold text-[#1a1a1a] tracking-tight text-balance"
              >
                We believe in objects that outlast trends
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-[#1a1a1a]/60 leading-relaxed text-pretty"
              >
                Lumière was founded in 2019 by two friends who were tired of
                buying things that broke, faded, or simply stopped feeling
                special. We set out to find makers who still cared about the
                craft — potters, weavers, woodworkers, and chandlers who put
                real time into every piece.
              </motion.p>
              <motion.p
                variants={fadeInUp}
                className="text-[#1a1a1a]/60 leading-relaxed text-pretty"
              >
                Today we work with over 60 independent makers across 18
                countries. Every product is tested in our homes before it
                reaches yours. We ship in plastic-free packaging and offset
                100% of our delivery emissions.
              </motion.p>
              <motion.div
                variants={staggerContainer}
                className="grid grid-cols-3 gap-4 pt-4 border-t border-black/8"
              >
                {[
                  { value: "60+", label: "Makers" },
                  { value: "18", label: "Countries" },
                  { value: "100%", label: "Carbon offset" },
                ].map((s) => (
                  <motion.div key={s.label} variants={fadeInUp} className="flex flex-col">
                    <span className="font-playfair text-3xl font-bold text-[#f4a623]">
                      {s.value}
                    </span>
                    <span className="text-xs text-[#1a1a1a]/50 font-medium mt-0.5">
                      {s.label}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Image grid */}
            <motion.div
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="grid grid-cols-2 gap-4 order-1 md:order-2"
            >
              <div className="flex flex-col gap-4">
                <div className="rounded-2xl overflow-hidden aspect-[3/4] shadow-[0_4px_20px_rgba(0,0,0,0.10)]">
                  <img
                    src="https://ceramicartsnetwork.org/images/default-source/uploadedimages/wp-content/uploads/2019/04/dan-finnegan-studio-2012-04-07-16.jpg?sfvrsn=4975b200_0"
                    alt="Potter at work in their studio"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden aspect-square shadow-[0_4px_20px_rgba(0,0,0,0.10)]">
                  <img
                    src="https://ceramicartsnetwork.org/images/default-source/uploadedimages/wp-content/uploads/2019/04/dan-finnegan-studio-2012-04-07-16.jpg?sfvrsn=4975b200_0"
                    alt="Sustainable kraft packaging"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-4 pt-8">
                <div className="rounded-2xl overflow-hidden aspect-square shadow-[0_4px_20px_rgba(0,0,0,0.10)]">
                  <img
                    src="https://c8.alamy.com/comp/M0Y54D/1950s-historical-young-women-weaver-working-on-a-linen-weaving-lomb-M0Y54D.jpg"
                    alt="Weaver working with linen"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden aspect-[3/4] shadow-[0_4px_20px_rgba(0,0,0,0.10)]">
                  <img
                    src="https://c8.alamy.com/comp/M0Y54D/1950s-historical-young-women-weaver-working-on-a-linen-weaving-lomb-M0Y54D.jpg"
                    alt="Woodworker crafting walnut pieces"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Newsletter ───────────────────────────────────────────────────── */}
      <section id="newsletter" className="bg-[#1a1a1a] py-20 md:py-28 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 50%, rgba(244,166,35,0.25) 0%, transparent 55%), radial-gradient(circle at 80% 20%, rgba(244,166,35,0.12) 0%, transparent 45%)",
          }}
        />
        <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col items-center gap-6"
          >
            <motion.span
              variants={fadeIn}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f4a623]/15 border border-[#f4a623]/30 text-[#f4a623] text-xs font-semibold tracking-widest uppercase"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Join the Community
            </motion.span>

            <motion.h2
              variants={fadeInUp}
              className="font-playfair text-4xl md:text-5xl font-bold text-white tracking-tight text-balance"
            >
              New arrivals, maker stories, and 10% off your first order
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="text-white/55 leading-relaxed text-pretty"
            >
              We send one thoughtful email a week. No noise, no spam. Just
              beautiful things and the people who make them.
            </motion.p>

            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex items-center gap-3 px-7 py-4 rounded-full bg-[#f4a623]/15 border border-[#f4a623]/30"
              >
                <Check className="w-5 h-5 text-[#f4a623]" />
                <span className="text-white font-semibold text-sm">
                  You&apos;re in. Check your inbox for your discount code.
                </span>
              </motion.div>
            ) : (
              <motion.form
                variants={fadeInUp}
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-3 w-full max-w-md"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 px-5 py-3.5 rounded-full bg-white/8 border border-white/15 text-white placeholder:text-white/35 text-sm focus:outline-none focus:ring-2 focus:ring-[#f4a623] focus:border-transparent transition-all duration-200"
                />
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  type="submit"
                  className="px-7 py-3.5 rounded-full bg-[#f4a623] text-white font-semibold text-sm hover:bg-[#e09510] transition-all duration-300 shadow-[0_4px_20px_rgba(244,166,35,0.30)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f4a623] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a1a] whitespace-nowrap"
                >
                  Get 10% Off
                </motion.button>
              </motion.form>
            )}

            <motion.p variants={fadeIn} className="text-white/30 text-xs">
              Unsubscribe at any time. We respect your inbox.
            </motion.p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}