"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FaBars,
  FaBriefcase,
  FaCode,
  FaEnvelope,
  FaGraduationCap,
  FaHome,
  FaLaptopCode,
  FaUser,
} from "react-icons/fa";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navLinks = [
    { id: "home", icon: FaHome, text: "Home", href: "/" },
    { id: "about", icon: FaUser, text: "About", href: "/#about" },
    { id: "experience", icon: FaBriefcase, text: "Experience", href: "/#experience" },
    { id: "skills", icon: FaCode, text: "Skills", href: "/#skills" },
    { id: "projects", icon: FaLaptopCode, text: "Projects", href: "/#projects" },
    { id: "education", icon: FaGraduationCap, text: "Education", href: "/#education" },
    { id: "contact", icon: FaEnvelope, text: "Contact", href: "/#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-[9999] bg-gray-900/95 backdrop-blur-md md:bg-transparent md:backdrop-blur-none">
      <div className="md:fixed md:top-4 md:left-1/2 md:transform md:-translate-x-1/2 w-full md:w-auto">
        {/* Animated Gradient Border */}
        <div className="p-[2px] md:rounded-full bg-gradient-to-r from-emerald-400 via-cyan-500 to-indigo-500 animate-gradient-x">
          <nav className="bg-gray-900/90 backdrop-blur-md md:rounded-full px-4 md:px-6 py-2.5">
            
            {/* Mobile Header */}
            <div className="flex justify-between items-center md:hidden px-2">
              <Link href="/" className="text-[#16f2b3] font-bold text-xl">
                ROSHAID ATIQUE
              </Link>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white p-2"
              >
                <FaBars />
              </button>
            </div>

            {/* Nav Links */}
            <div className={`${isMenuOpen ? "block" : "hidden"} md:block`}>
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-1 lg:gap-2 py-4 md:py-0">
                {navLinks.map(({ id, icon: Icon, text, href }) => (
                  <Link
                    key={id}
                    href={href}
                    onClick={() => {
                      setActiveLink(id);
                      setIsMenuOpen(false);
                    }}
                    className={`px-3 py-2 md:py-1.5 rounded-lg md:rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 hover:bg-white/10 ${
                      activeLink === id
                        ? "bg-white/15 text-white"
                        : "text-gray-300 hover:text-white"
                    }`}
                  >
                    <Icon
                      className={`text-base transition-transform duration-200 ${
                        activeLink === id ? "scale-110" : ""
                      }`}
                    />
                    <span>{text}</span>
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        </div>
      </div>

      {/* Animated Gradient Border */}
      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient-x {
          animation: gradient-x 3s linear infinite;
          background-size: 200% 200%;
        }
      `}</style>
    </header>
  );
}
