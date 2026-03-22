import Image from "next/image";
import Link from "next/link";
import navLogo from "../../../../public/images/logo/nav-logo.webp";
import blueNavLogo from "../../../../public/images/logo/blue-nav-logo.webp";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();
  const isLanding = router.pathname === "/";
  const isAuthenticated = router.pathname.startsWith("/auth/");
  const isHidden = [
    "/public/Login",
    "/public/TutorReg",
    "/public/TutorInfo",
    "/public/StudentReg",
  ].includes(router.pathname);

  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  // Mock user data - replace with actual user data from context/session
  const userProfile = {
    name: "Chathurangalakmal",
    email: "chathurangalakmal@example.com",
    initials: "CL",
  };

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

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };

    if (isProfileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileOpen]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About us", href: "/about" },
    { name: "Contact us", href: "/contact" },
    { name: "Become a tutor", href: "/public/TutorReg" },
  ];

  return (
    <>
      {!isHidden && (
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
                    <Image
                      src={blueNavLogo}
                      alt="Logo"
                      className="w-40 h-auto"
                    />
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

                  {/* CTA Button / Profile */}
                  <div className="flex space-x-4 items-center">
                    {isAuthenticated ? (
                      <div className="relative" ref={profileDropdownRef}>
                        <button
                          onClick={() => setIsProfileOpen(!isProfileOpen)}
                          className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
                        >
                          {/* Profile Avatar */}
                          <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-sm font-semibold border-2 border-white/30">
                            {userProfile.initials}
                          </div>
                        </button>

                        {/* Dropdown Menu */}
                        {isProfileOpen && (
                          <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl z-50 py-2">
                            {/* User Info */}
                            <div className="px-4 py-3 border-b border-gray-100">
                              <p className="font-semibold text-gray-900">
                                {userProfile.name}
                              </p>
                              <p className="text-sm text-gray-500">
                                {userProfile.email}
                              </p>
                            </div>

                            {/* Menu Options */}
                            <div className="py-2">
                              {/* Settings */}
                              <button
                                onClick={() => {
                                  // Detect user type based on current page
                                  const userType = router.pathname.includes(
                                    "StudentDashboard",
                                  )
                                    ? "student"
                                    : router.pathname.includes("TutorDashboard")
                                      ? "tutor"
                                      : "student";
                                  router.push(
                                    `/auth/settings?userType=${userType}`,
                                  );
                                  setIsProfileOpen(false);
                                }}
                                className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center space-x-2 transition-colors"
                              >
                                <svg
                                  className="w-4 h-4 text-gray-600"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                                </svg>
                                <span>Settings</span>
                              </button>

                              {/* Delete Account */}
                              <button
                                onClick={() => {
                                  router.push("/auth/delete-account");
                                  setIsProfileOpen(false);
                                }}
                                className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 flex items-center space-x-2 transition-colors"
                              >
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  />
                                </svg>
                                <span>Delete account</span>
                              </button>

                              {/* Log out */}
                              <button
                                onClick={() => {
                                  router.push("/");
                                  setIsProfileOpen(false);
                                }}
                                className="w-full px-4 py-2 text-left text-blue-600 hover:bg-blue-50 flex items-center space-x-2 transition-colors border-t border-gray-100"
                              >
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                  />
                                </svg>
                                <span>Log out</span>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <button
                        onClick={() => router.push("/public/Login")}
                        className="button-small-text bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                      >
                        Sign in
                      </button>
                    )}
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

              {/* CTA Button / Profile */}
              {isAuthenticated ? (
                <div className="space-y-3">
                  {/* User Info */}
                  <div className="px-4 py-3 bg-blue-50 rounded-lg">
                    <p className="font-semibold text-gray-900">
                      {userProfile.name}
                    </p>
                    <p className="text-sm text-gray-500">{userProfile.email}</p>
                  </div>

                  {/* Settings */}
                  <button
                    onClick={() => {
                      router.push("/auth/settings");
                      setIsOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center space-x-2 transition-colors rounded-lg"
                  >
                    <svg
                      className="w-4 h-4 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span>Settings</span>
                  </button>

                  {/* Delete Account */}
                  <button
                    onClick={() => {
                      router.push("/auth/delete-account");
                      setIsOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 flex items-center space-x-2 transition-colors rounded-lg"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    <span>Delete account</span>
                  </button>

                  {/* Log out */}
                  <button
                    onClick={() => {
                      router.push("/public/Login");
                      setIsOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left text-blue-600 hover:bg-blue-50 flex items-center space-x-2 transition-colors rounded-lg"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    <span>Log out</span>
                  </button>
                </div>
              ) : (
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
              )}

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
      )}
    </>
  );
}
