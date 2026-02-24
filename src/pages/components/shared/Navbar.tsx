import Image from "next/image";
import Link from "next/link";
import navLogo from "../../../../public/images/logo/nav-logo.webp";
import blueNavLogo from "../../../../public/images/logo/blue-nav-logo.webp";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();
  const isLanding = router.pathname === "/";

  const [isOpen, setIsOpen] = useState(false);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About us", href: "/about" },
    { name: "Contact us", href: "/contact" },
    { name: "Become a tutor", href: "/tutor" },
  ];

  return (
    <>
      {/* Main Navbar */}
      <nav
        style={{
          position: "fixed",
          zIndex: 60,
          backgroundColor: "rgba(39, 39, 39, 0.7)",
          backdropFilter: "saturate(180%) blur(6px)",
        }}
        className="shadow-md top-0 left-0 right-0 lg:top-3 lg:left-[60px] lg:right-[60px] lg:rounded-lg"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 text-white">
            {/* Logo */}
            <div className="shrink-0">
              {isLanding ? (
                <Image src={navLogo} alt="Logo" className="w-40 h-auto" />
              ) : (
                <Image src={blueNavLogo} alt="Logo" className="w-40 h-auto" />
              )}
            </div>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center space-x-8">
              {/* Nav Links */}
              <div className="hidden md:flex space-x-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="p-regular-text hover:underline underline-offset-1"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              {/* CTA Button */}
              <div className="flex space-x-4">
                <button
                  onClick={() => router.push("/public/Login")}
                  className="button-small-text bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Sign in
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden hover:cursor-pointer p-2 rounded-lg hover:bg-white/10 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {/* Hamburger Icon */}
              <div className="w-6 h-5 flex flex-col justify-between">
                <span
                  className={`block h-0.5 w-full bg-white rounded-full transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`}
                ></span>
                <span
                  className={`block h-0.5 w-full bg-white rounded-full transition-all duration-300 ${isOpen ? "opacity-0" : ""}`}
                ></span>
                <span
                  className={`block h-0.5 w-full bg-white rounded-full transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}
                ></span>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 top-16 bg-black/50 z-50 lg:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-16 right-0 h-[calc(100%-64px)] w-[280px] bg-white z-50 lg:hidden transform transition-transform duration-300 ease-in-out shadow-2xl ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Menu Content */}
        <div className="p-4 pt-6">
          {/* Nav Links */}
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 p-medium-text transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Divider */}
          <div className="my-6 border-t border-gray-100"></div>

          {/* CTA Button */}
          <button
            style={{
              color: "white",
            }}
            className="px-6 py-2 w-full bg-blue-600 hover:bg-blue-700 button-small-text md:button-large-text rounded-lg transition-all duration-300 shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 hover:scale-105"
            onClick={() => {
              setIsOpen(false);
              router.push("/public/Login");
            }}
          >
            Sign in
          </button>

          {/* Additional Info */}
          <div className="mt-8 p-4 bg-blue-50 rounded-xl">
            <p className="caption-text text-gray-600 mb-2">Need help?</p>
            <a
              href="mailto:toptutorsglobal@gmail.com"
              className="caption-text text-blue-600 font-medium hover:underline"
            >
              toptutorsglobal@gmail.com
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
