import Image from "next/image";
import contactImg from "../../public/images/landing/contact-us.webp";
import { User, EnvelopeIcon, PhoneIcon } from "@phosphor-icons/react";

export default function Contact() {
  return (
    <main className="mx-auto px-6 py-20">
      <div className="mt-20 max-w-7xl mx-auto px-5 md:mr-[10%] md:ml-[10%]">
        <div className="flex flex-col md:flex-row gap-12 md:gap-16">
          {/* right Content */}
          <div className="w-full md:w-1/2 order-1 md:order-2 flex flex-col items-center">
            <h2
              style={{ color: "#002662" }}
              className="md:h3-semi-bold-text h4-semi-bold-text md:h4-semi-bold-text mb-6 text-center md:text-left "
            >
              Get in touch
            </h2>
            <p
              style={{ color: "#6C7781" }}
              className="p-regular-text mb-8 leading-relaxed text-center md:text-left"
            >
              Our support team is here to help 24/7. Have a question about an
              order, a payment, or our service? We&apos;ve got your back.
            </p>
            <div className="mt-2 w-full px-8 border border-blue-300 rounded-md p-4">
              <div className="pt-5">
                <label htmlFor="name">
                  Your name<span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <User
                    size={20}
                    className="absolute left-3 top-7 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    id="name"
                    className="w-full border border-gray-300 rounded-md pl-10 p-3 mt-1 mb-4 
               focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your name"
                  />
                </div>
              </div>
              <div className="pt-2">
                <label htmlFor="name">
                  Email<span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <EnvelopeIcon
                    size={20}
                    className="absolute left-3 top-7 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="email"
                    id="email"
                    className="w-full border border-gray-300 rounded-md pl-10 p-3 mt-1 mb-4 
               focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              <div className="pt-2">
                <label htmlFor="name">
                  WhatsApp number<span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <PhoneIcon
                    size={20}
                    className="absolute left-3 top-7 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="number"
                    id="phone"
                    className="w-full border border-gray-300 rounded-md pl-10 p-3 mt-1 mb-4 
               focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your whatsapp number"
                  />
                </div>
              </div>
              <div className="pt-2">
                <label htmlFor="name">
                  Your message<span className="text-red-600">*</span>
                </label>
                <textarea
                  id="message"
                  className="w-full border border-gray-300 rounded-md p-3 mt-1 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your message here"
                  rows={4}
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg transition-all duration-300 shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 hover:scale-105"
              >
                Send a message
              </button>
            </div>
          </div>
          {/* left Image */}
          <div className="w-full md:w-1/2 order-2 md:order-1 items-center flex justify-center">
            <div className="relative">
              {/* Decorative background */}
              <div className="absolute -inset-4 bg-linear-to-br from-blue-100 to-indigo-100 rounded-3xl -rotate-3"></div>
              {/* Image container - placeholder until you add your own image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-linear-to-br from-blue-50 to-indigo-100">
                {/* Decorative placeholder with icon */}
                <div className="text-center">
                  <Image
                    src={contactImg}
                    alt="Learning"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
