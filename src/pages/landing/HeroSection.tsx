import { Globe, Users, ShieldCheck } from "@phosphor-icons/react";

export default function HeroSection() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  return (
    <section
      id="home"
      className="relative h-[80vh] md:h-screen w-full flex flex-col justify-center z-0"
    >
      {/* Background images (mobile and desktop) */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 block md:hidden bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${basePath}/background/landing-cover-mobile.jpg)`,
          }}
        />
        <div
          className="absolute inset-0 hidden md:block bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${basePath}/background/landing-cover.webp)`,
          }}
        />
      </div>

      {/* Overlay for better text readability */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: "rgba(39, 39, 39, 0.2)",
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white flex flex-col px-5">
        <div className="flex flex-col items-center justify-center">
          <h1 className="heading-semi-bold-text md:d2-semi-bold-text">
            Let us do your work
          </h1>
          <p className="h6-semi-bold-text md:h3-semi-bold-text mt-5 mb-4 text-lg">
            While you enjoy your time
          </p>
          <div className="w-full flex justify-center">
            <p
              className="caption-text md:p-regular-text"
              style={{
                maxWidth: "507px",
                textAlign: "center",
              }}
            >
              Got a question that&apos;s melting your brain? Toss it here. Our
              certified brainiacs will send back a custom, step-by-step
              solution. You go have fun, we&apos;ll handle the hard stuff
            </p>
          </div>
          <button className="mt-5 px-6 py-2 mb-5 bg-blue-600 hover:bg-blue-700 text-white button-small-text md:button-large-text rounded-lg transition-all duration-300 shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 hover:scale-105">
            Post a assignment
          </button>
        </div>
      </div>
      <div className="w-full flex justify-center camption-text bottom-0 py-3 absolute text-white text-center">
        <div className="flex flex-col items-center">
          <Globe size={32} />
          <span className="caption-text md:p-regular-text">Global Reach</span>
        </div>
        <div className="flex flex-col items-center mx-10">
          <Users size={32} />
          <span className="caption-text md:p-regular-text">Expert Tutors</span>
        </div>
        <div className="flex flex-col items-center">
          <ShieldCheck size={32} />
          <span className="caption-text md:p-regular-text">
            Secure Platfrom
          </span>
        </div>
      </div>
    </section>
  );
}
