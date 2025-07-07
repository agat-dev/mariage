import React, { useState, useEffect } from "react";
import { motion } from "motion/react";

interface NavbarProps {
  className?: string;
}

export default function Navbar({ className = "" }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Invitation", href: "#invitation" },
    { name: "Programme", href: "#programme" },
    { name: "Venir à Trizac", href: "#venir" },
    { name: "Liens & Contact", href: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`transition-all duration-300 ${
        isScrolled ? "bg-black/80 backdrop-blur-md shadow-lg" : "bg-transparent"
      } ${className}`}
    >
      {/* Effet de pellicule en arrière-plan */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          background: `
            repeating-linear-gradient(
              90deg,
              transparent 0px,
              transparent 1px,
              rgba(255,255,255,0.05) 1px,
              rgba(255,255,255,0.05) 2px,
              transparent 2px,
              transparent 100px
            )
          `,
          animation: "filmGrain 0.4s infinite",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Noms */}
          <motion.div
            className="flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <img
              className="h-8 w-auto rounded-sm"
              src="/mariage-5.png"
              alt="Logo"
              width={24}
              height={24}
            />
          </motion.div>

          {/* Navigation Desktop */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="text-white/80 hover:text-white px-3 py-2 text-lg font-urbanist tracking-wide transition-colors duration-200 relative group"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {item.name}

                  {/* Film strip effect on hover */}
                  <span
                    className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-200 pointer-events-none"
                    style={{
                      background: `
                        repeating-linear-gradient(
                          0deg,
                          transparent 0px,
                          transparent 2px,
                          rgba(255,255,255,0.1) 2px,
                          rgba(255,255,255,0.1) 4px,
                          transparent 4px,
                          transparent 8px
                        )
                      `,
                    }}
                  />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Bouton menu mobile */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-white/80 focus:outline-none focus:text-white transition-colors duration-200"
              whileTap={{ scale: 0.95 }}
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Menu mobile */}
        <motion.div
          className={`fixed inset-0 bg-black z-50 md:hidden ${
            isMobileMenuOpen ? "" : "pointer-events-none"
          }`}
          initial={false}
          animate={{
            opacity: isMobileMenuOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className="h-full flex flex-col">
            {/* Header avec croix de fermeture */}
            <div className="flex justify-between items-center p-4 border-b border-white/10">
              <img
                className="h-8 w-auto rounded-sm"
                src="/mariage-5.png"
                alt="Logo"
                width={24}
                height={24}
              />
              <motion.button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white hover:text-white/80 focus:outline-none transition-colors duration-200"
                whileTap={{ scale: 0.95 }}
              >
                <svg
                  className="h-6 w-6"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </motion.button>
            </div>

            {/* Navigation links */}
            <div className="flex flex-col pt-8 px-4 space-y-6">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="text-white/80 hover:text-white text-2xl font-poiret-one tracking-wide transition-colors duration-200 py-4 border-b border-white/10"
                  onClick={() => setIsMobileMenuOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{
                    opacity: isMobileMenuOpen ? 1 : 0,
                    x: isMobileMenuOpen ? 0 : -20,
                  }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.name}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Ornements décoratifs */}
      <div className="absolute top-0 left-4 w-2 h-2 bg-white/20 rounded-full opacity-60" />
      <div className="absolute top-0 right-4 w-2 h-2 bg-white/20 rounded-full opacity-60" />

      <style jsx>{`
        @keyframes filmGrain {
          0% {
            transform: translateX(0px);
          }
          25% {
            transform: translateX(-1px);
          }
          50% {
            transform: translateX(1px);
          }
          75% {
            transform: translateX(-1px);
          }
          100% {
            transform: translateX(0px);
          }
        }
      `}</style>
    </motion.nav>
  );
}
