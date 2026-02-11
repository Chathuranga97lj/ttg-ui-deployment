import Image from "next/image";
import map from "../../../public/images/landing/world-map.jpg";
import learning from "../../../public/images/landing/learn_while_earn.jpg";
import {
  ShieldCheck,
  SealCheckIcon,
  ClockIcon,
  CertificateIcon,
} from "@phosphor-icons/react";

export default function GlobalPartner() {
  const features = [
    {
      id: 1,
      icon: <ShieldCheck size={30} />,
      title: "Secure Escrow Payment",
      description:
        "Your payment is protected until you approve the final solution. Complete peace of mind.",
    },
    {
      id: 2,
      icon: <SealCheckIcon size={30} />,
      title: "Vetted Subject Experts",
      description:
        "All tutors pass rigorous verification. Every expert is qualified, reviewed, and rated by students.",
    },
    {
      id: 3,
      icon: <ClockIcon size={30} />,
      title: "On-Time Delivery",
      description:
        "Meet your deadlines with confidence. 95% of assignments are delivered early or on schedule.",
    },
    {
      id: 4,
      icon: <CertificateIcon size={30} />,
      title: "100% Confidential",
      description:
        "Your privacy matters. Every transaction is encrypted and your information stays completely private.",
    },
  ];

  const learnFeatures = [
    {
      title: "Detailed explanations",
      description: "Understand the 'why' behind every step",
    },
    {
      title: "Follow-up questions included",
      description: "Ask for clarification at no extra cost",
    },
    {
      title: "Multiple approaches",
      description: "Learn different ways to tackle problems",
    },
  ];

  return (
    <>
      {/* Section 1: Trusted by Students Around the World */}
      <section className="w-full py-16 md:py-24 relative overflow-hidden bg-[#0A1628]">
        {/* World Map Background */}
        <div className="absolute inset-0 opacity-30">
          <Image
            src={map}
            alt="World Map"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-5 text-center text-white">
          <span
            style={{ color: "#003893", backgroundColor: "#E0E7FF" }}
            className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-6"
          >
            Community
          </span>
          <h2 className="h4-semi-bold-text md:h2-semi-bold-text text-white mb-6">
            Trusted by Students Around the World
          </h2>
          <p className="p-regular-text md:h6-regular-text text-blue-100/80 max-w-2xl mx-auto mb-8 leading-relaxed">
            You&apos;re in good company. From top universities in North America
            and Europe to campuses in Asia and Australia, students from over 100
            countries use our platform. They trust our vetted experts to get
            unstuck on difficult concepts, finish their toughest assignments,
            and study smarter.
          </p>
          <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white button-small-text md:button-large-text rounded-lg transition-all duration-300 shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 hover:scale-105">
            Get my homework done
          </button>
        </div>
      </section>

      {/* Section 2: Your trusted academic partner */}
      <section className="w-full py-16 md:py-24 bg-[#EEF4FF]">
        <div className="max-w-7xl mx-auto px-5">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <span
              style={{ color: "#003893", backgroundColor: "#DBEAFE" }}
              className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-4"
            >
              Why choose us
            </span>
            <h2
              style={{ color: "#002662" }}
              className="h4-semi-bold-text md:h3-semi-bold-text mb-4"
            >
              Your trusted academic partner
            </h2>
            <p
              style={{ color: "#6C7781" }}
              className="caption-text md:p-regular-text max-w-2xl mx-auto"
            >
              We&apos;ve built a platform with your success and security in
              mind. From payment protection to expert verification, every
              feature is designed to give you confidence and peace of mind.
            </p>
          </div>

          {/* Mobile Layout - Vertical Stack */}
          <div className="md:hidden flex flex-col gap-8">
            {features.map((feature) => (
              <div
                key={feature.id}
                className="flex flex-col items-center text-center px-4"
              >
                {/* Icon Container */}
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 shadow-md"
                  style={{ backgroundColor: "#3B82F6" }}
                >
                  <span className="text-white">{feature.icon}</span>
                </div>
                {/* Title */}
                <h3
                  className="p-semi-bold-text mb-2"
                  style={{ color: "#1E293B" }}
                >
                  {feature.title}
                </h3>
                {/* Description */}
                <p className="caption-text" style={{ color: "#6B7280" }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Desktop Layout - Horizontal Grid */}
          <div className="hidden md:grid md:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div
                key={feature.id}
                className="flex flex-col items-center text-center p-6 rounded-2xl transition-all duration-300 hover:bg-white hover:shadow-lg"
              >
                {/* Icon Container */}
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 shadow-md transition-transform duration-300 hover:scale-110"
                  style={{ backgroundColor: "#3B82F6" }}
                >
                  <span className="text-white">{feature.icon}</span>
                </div>
                {/* Title */}
                <h3
                  className="p-semi-bold-text mb-3"
                  style={{ color: "#1E293B" }}
                >
                  {feature.title}
                </h3>
                {/* Description */}
                <p
                  className="caption-text leading-relaxed"
                  style={{ color: "#6B7280" }}
                >
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Learn while you get help */}
      <section className="w-full py-16 md:py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-5">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
            {/* Left Content */}
            <div className="w-full md:w-1/2 order-1 md:order-1">
              <span
                style={{ color: "#003893", backgroundColor: "#DBEAFE" }}
                className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-4"
              >
                Learn while you get help
              </span>
              <h2
                style={{ color: "#002662" }}
                className="h4-semi-bold-text md:h3-semi-bold-text mb-6"
              >
                Not just answers, it&apos;s understanding
              </h2>
              <p
                style={{ color: "#6C7781" }}
                className="p-regular-text mb-8 leading-relaxed"
              >
                Our experts don&apos;t just solve your problem-they teach you
                how to solve them yourself. Every solution comes with detailed
                explanations, step-by-step breakdowns, and the reasoning behind
                each step.
              </p>

              {/* Feature List */}
              <ul className="space-y-5">
                {learnFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <div className="shrink-0 w-6 h-6 mt-0.5">
                      <svg
                        className="w-6 h-6 text-blue-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4
                        className="p-semi-bold-text mb-1"
                        style={{ color: "#1E293B" }}
                      >
                        {feature.title}
                      </h4>
                      <p className="caption-text" style={{ color: "#6B7280" }}>
                        {feature.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Image */}
            <div className="w-full md:w-1/2 order-2 md:order-2">
              <div className="relative">
                {/* Decorative background */}
                <div className="absolute -inset-4 bg-linear-to-br from-blue-100 to-indigo-100 rounded-3xl -rotate-3"></div>
                {/* Image container - placeholder until you add your own image */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-linear-to-br from-blue-50 to-indigo-100">
                  {/* Decorative placeholder with icon */}
                  <div className="text-center">
                    <Image
                      src={learning}
                      alt="Learning"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
