import Image from "next/image";
import step1Img from "../../../public/images/landing/how_it_works_submit.webp";
import step2Img from "../../../public/images/landing/how_it_works_confirm.webp";
import step3Img from "../../../public/images/landing/how_it_works_have_fun.webp";
import step4Img from "../../../public/images/landing/how_it_works_assignment_done.webp";

export default function HowItWorks() {
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

  return (
    <section className="w-full py-16 md:py-24 bg-linear-to-b from-slate-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-5">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-20">
          <span
            style={{ color: "#003893", backgroundColor: "#E0E7FF" }}
            className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-4"
          >
            Working process
          </span>
          <h2
            style={{ color: "#002662" }}
            className="h4-semi-bold-text md:h3-semi-bold-text text-gray-900 mb-2"
          >
            How it Works
          </h2>
          <p
            style={{ color: "#6C7781" }}
            className="caption-text md:p-regular-text max-w-xl mx-auto"
          >
            Be the &apos;effortlessly brilliant&apos; one. (Our little secret:
            it&apos;s just top-tier professional help)
          </p>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden flex flex-col gap-10">
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

        {/* Desktop Layout with Zigzag Pattern */}
        <div className="hidden md:block relative">
          {/* SVG Curved Path */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 1200 900"
            fill="none"
            preserveAspectRatio="xMidYMid slice"
          >
            <path
              d="M250 120 C400 120 450 280 600 280 C750 280 850 120 950 180 C1050 240 950 380 850 450 C750 520 550 450 450 520 C350 590 300 700 450 750 C600 800 750 720 850 720"
              stroke="#3B82F6"
              strokeWidth="8"
              strokeDasharray="20 20"
              fill="none"
              strokeLinecap="round"
            />
          </svg>

          {/* Decorative Icons */}
          <div className="absolute top-0 right-[15%] w-24 h-24">
            <div className="w-full h-full bg-linear-to-br from-orange-100 to-orange-200 rounded-xl rotate-6 flex items-center justify-center shadow-md">
              <span className="text-3xl">📅</span>
            </div>
          </div>
          <div className="absolute top-[25%] left-[25%] w-16 h-16">
            <div className="w-full h-full bg-linear-to-br from-purple-100 to-purple-200 rounded-xl -rotate-6 flex items-center justify-center shadow-md">
              <span className="text-2xl">📖</span>
            </div>
          </div>
          <div className="absolute top-[55%] right-[30%] w-16 h-16">
            <div className="w-full h-full bg-linear-to-br from-yellow-100 to-yellow-200 rounded-xl rotate-12 flex items-center justify-center shadow-md">
              <span className="text-2xl">📝</span>
            </div>
          </div>
          <div className="absolute bottom-[15%] left-[10%] w-20 h-20">
            <div className="w-full h-full bg-linear-to-br from-blue-100 to-blue-200 rounded-xl -rotate-12 flex items-center justify-center shadow-md">
              <span className="text-2xl">📄</span>
            </div>
          </div>

          {/* Steps Grid */}
          <div className="relative grid grid-cols-12 gap-8 min-h-[800px]">
            {/* Step 1 - Top Left */}
            <div className="col-span-5 col-start-1 row-start-1">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <Image
                    src={steps[0].image}
                    alt={steps[0].title}
                    className="w-64 h-48 object-cover rounded-2xl shadow-xl"
                  />
                </div>
                <h3 className="h6-semi-bold-text text-gray-900 mb-1">
                  {steps[0].title}
                </h3>
                <p className="caption-text text-gray-600 mb-2">
                  {steps[0].description}
                </p>
                <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-white font-bold">
                  1
                </div>
              </div>
            </div>

            {/* Step 2 - Middle Right */}
            <div className="col-span-5 col-start-8 row-start-1 mt-40">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <Image
                    src={steps[1].image}
                    alt={steps[1].title}
                    className="w-64 h-48 object-cover rounded-2xl shadow-xl"
                  />
                </div>
                <h3 className="h6-semi-bold-text text-gray-900 mb-1">
                  {steps[1].title}
                </h3>
                <p className="caption-text text-gray-600 mb-2">
                  {steps[1].description}
                </p>
                <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-white font-bold">
                  2
                </div>
              </div>
            </div>

            {/* Step 3 - Bottom Left */}
            <div className="col-span-5 col-start-1 row-start-2 -mt-20">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <Image
                    src={steps[2].image}
                    alt={steps[2].title}
                    className="w-64 h-48 object-cover rounded-2xl shadow-xl"
                  />
                </div>
                <h3 className="h6-semi-bold-text text-gray-900 mb-1">
                  {steps[2].title}
                </h3>
                <p className="caption-text text-gray-600 mb-2">
                  {steps[2].description}
                </p>
                <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-white font-bold">
                  3
                </div>
              </div>
            </div>

            {/* Step 4 - Bottom Center-Right */}
            <div className="col-span-5 col-start-7 row-start-2 mt-32">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <Image
                    src={steps[3].image}
                    alt={steps[3].title}
                    className="w-64 h-48 object-cover rounded-2xl shadow-xl"
                  />
                </div>
                <h3 className="h6-semi-bold-text text-gray-900 mb-1">
                  {steps[3].title}
                </h3>
                <p className="caption-text text-gray-600 mb-2">
                  {steps[3].description}
                </p>
                <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-white font-bold">
                  4
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
