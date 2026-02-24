import Image from "next/image";
import learning from "../../public/images/landing/learn_while_earn.jpg";
import topDeskImg from "../../public/images/landing/about-top-desk.jpg";
import tobMobImg from "../../public/images/landing/about-top-mobile.jpg";
import step1Img from "../../public/images/landing/how_it_works_submit.webp";
import step2Img from "../../public/images/landing/how_it_works_confirm.webp";
import step3Img from "../../public/images/landing/how_it_works_have_fun.webp";
import step4Img from "../../public/images/landing/how_it_works_assignment_done.webp";
import { useEffect, useState } from "react";

export default function About() {
  const [isMobile, setIsMobile] = useState(false);
  const steps = [
    {
      id: 1,
      title: "Submit assignment",
      description: "Tell us what you want to do",
      image: step1Img,
    },
    {
      id: 2,
      title: "Confirm the assignment",
      description: "Discuss with the admin and confirm",
      image: step2Img,
    },
    {
      id: 3,
      title: "Have a fun",
      description: "Enjoy your free time",
      image: step3Img,
    },
    {
      id: 4,
      title: "Get the assignment done",
      description: "Submit your assignment & get A grade",
      image: step4Img,
    },
  ];

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); // Tailwind md breakpoint
    };

    checkScreenSize(); // run on mount

    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <main className="mx-auto py-20">
      {/* Top para section */}
      <div className="px-6">
        <h1
          style={{ color: "#002662" }}
          className="text-4xl md:h3-semi-bold-text font-semibold mb-6 text-center mt-5"
        >
          We believe no student should get stuck.
        </h1>
        <div className="md:mr-[30%] md:ml-[30%]">
          <p className="text-gray-700 p-regular-text mb-4 text-center">
            Learning is challenging. Getting help shouldn&apos;t be. We&apos;re
            here to connect you with the expert you need, exactly when you need
            them.
          </p>
        </div>
        {/* Top image section */}
        <div className="md:mr-10 md:ml-10">
          {isMobile ? (
            <Image
              src={tobMobImg}
              alt="About Top Tutors Global"
              className="w-full rounded-4xl shadow-lg mt-20 mb-20"
            />
          ) : (
            <Image
              src={topDeskImg}
              alt="About Top Tutors Global"
              className="w-full rounded-4xl shadow-lg mt-20 mb-40"
            />
          )}
        </div>
        {/* middle about section */}
        <div className="max-w-7xl mx-auto px-5 md:mr-[10%] md:ml-[10%]">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
            {/* right Content */}
            <div className="w-full md:w-1/2 order-1 md:order-2">
              <h2
                style={{ color: "#002662" }}
                className="md:h3-semi-bold-text h4-semi-bold-text md:h4-semi-bold-text mb-6 text-center md:text-left"
              >
                About Top-Tutor Global
              </h2>
              <p
                style={{ color: "#6C7781" }}
                className="p-regular-text mb-8 leading-relaxed text-center md:text-left"
              >
                We are revolutionizing online education by creating a secure,
                seamless platform that brings together students seeking
                knowledge and expert tutors from around the world. Our platform
                ensures quality education while maintaining privacy and security
                for all users.
              </p>
            </div>
            {/* left Image */}
            <div className="w-full md:w-1/2 order-2 md:order-1">
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
      </div>

      {/* How it works section */}
      <div className="mt-20 px-6 w-full py-16 md:py-24 bg-linear-to-b bg-[#EEF4FF] overflow-hidden">
        <h2
          style={{ color: "#002662" }}
          className="md:h3-semi-bold-text h4-semi-bold-text md:h4-semi-bold-text mb-2 text-center"
        >
          How it Works
        </h2>
        <p
          style={{ color: "#6C7781" }}
          className="p-regular-text mb-15 leading-relaxed text-center"
        >
          Be the &apos;effortlessly brilliant&apos; one. (Our little secret:
          it&apos;s just top-tier professional help)
        </p>
        <div className="flex flex-col md:flex-row gap-10 justify-center">
          {steps.map((step) => (
            <div
              key={step.id}
              className="flex flex-col items-center text-center"
            >
              <div className="relative w-full max-w-xs mb-4">
                <Image
                  src={step.image}
                  alt={step.title}
                  className="w-full h-48 object-cover rounded-2xl shadow-lg"
                />
              </div>
              <h3 className="h6-semi-bold-text text-gray-900 mb-2">
                {step.title}
              </h3>
              <p className="caption-text text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom image section */}
      <div className="px-6 mt-20 md:mr-10 md:ml-10 relative">
        <div
          className="absolute inset-0 mx-6 rounded-4xl"
          style={{
            backgroundColor: "rgba(39, 39, 39, 0.5)",
          }}
        ></div>
        <div className="flex px-6 flex-col bg-cover bg-center bg-no-repeat justify-center items-center w-full h-[500px] md:h-[400px] rounded-4xl bg-[url('/images/landing/about-bottom-mobile.jpg')] md:bg-[url('/images/landing/about-bottom-desk.jpg')]">
          <h2
            style={{ color: "white" }}
            className="md:h3-semi-bold-text h4-semi-bold-text md:h4-semi-bold-text mb-2 text-center relative z-10"
          >
            Ready to see how it works?
          </h2>
          <p
            style={{ color: "white" }}
            className="p-regular-text mb-5 leading-relaxed text-center relative z-10"
          >
            Join thousands of students and tutors already using Academic Help
          </p>
          <div className="text-white flex justify-center items-center flex-col md:flex-row gap-4 relative z-10">
            <div className="w-fit">
              <button className="mt-5 px-6 py-2 mb-5 bg-blue-600 hover:bg-blue-700 text-white button-small-text md:button-large-text rounded-lg transition-all duration-300 shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 hover:scale-105 w-fit">
                Post a assignment
              </button>
            </div>
            <div className=" w-fit">
              <button className="px-6 py-2.5 border-2 border-white font-medium rounded-lg hover:border-blue-500 hover:text-blue-600 transition-all duration-300 w-fit">
                Contact us
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
