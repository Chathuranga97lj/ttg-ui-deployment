"use client";
import { useState } from "react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>("001");

  const faqs: FAQItem[] = [
    {
      id: "001",
      question: "What happens to my money when I pay?",
      answer:
        "We use a secure escrow system. When you hire an expert, your payment is held safely by us. It is only released to the expert after you have received your solution and confirmed you are 100% satisfied. It's risk-free.",
    },
    {
      id: "002",
      question: "How do I know the expert is qualified?",
      answer:
        "All our experts go through a rigorous verification process. We check their academic credentials, professional experience, and conduct sample tests. Each expert is rated by students, so you can see their track record before hiring.",
    },
    {
      id: "003",
      question: "What if I'm not satisfied with the solution?",
      answer:
        "Your satisfaction is our priority. If you're not happy with the solution, you can request unlimited revisions at no extra cost. If the work still doesn't meet your expectations, we offer a full refund under our money-back guarantee.",
    },
    {
      id: "004",
      question: "How long does it take to get my assignment done?",
      answer:
        "Delivery time depends on the complexity and length of your assignment. Most assignments are completed within 24-72 hours. For urgent requests, we offer express delivery options. You'll see the estimated delivery time before confirming your order.",
    },
  ];

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="w-full py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-5">
        <div className="flex flex-col md:flex-row md:gap-16">
          {/* Left Side - Header & Contact */}
          <div className="w-full md:w-2/5 mb-10 md:mb-0 text-center md:text-left">
            <span
              style={{ color: "#003893", backgroundColor: "#DBEAFE" }}
              className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-4"
            >
              FAQs
            </span>
            <h2
              style={{ color: "#002662" }}
              className="h4-semi-bold-text md:h3-semi-bold-text mb-4"
            >
              What our students frequently ask from us
            </h2>
            <p
              style={{ color: "#6C7781" }}
              className="caption-text md:p-regular-text mb-8"
            >
              Find answers to common questions that our most students had
            </p>

            {/* Desktop Still Have Questions */}
            <div className="mt-8 md:mt-12 hidden md:block">
              <h4
                className="p-semi-bold-text mb-2"
                style={{ color: "#1E293B" }}
              >
                Still Have Questions?
              </h4>
              <p className="caption-text text-gray-500 mb-4">
                Our support team is available 24/7 to help you with any
                questions about finding tutors, booking sessions, or using our
                platform.
              </p>
              <button className="px-6 py-2.5 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:border-blue-500 hover:text-blue-600 transition-all duration-300">
                Contact us
              </button>
            </div>
          </div>

          {/* Right Side - FAQ Accordion */}
          <div className="w-full md:w-3/5">
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div
                  key={faq.id}
                  className={`border rounded-xl transition-all duration-300 ${
                    openId === faq.id
                      ? "border-blue-200 bg-blue-50"
                      : "border-gray-200 bg-white hover:border-blue-100"
                  }`}
                >
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full flex items-center justify-between p-5 text-left"
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className="text-sm font-medium"
                        style={{ color: "#3B82F6" }}
                      >
                        {faq.id}
                      </span>
                      <h3
                        className="p-medium-text"
                        style={{ color: "#1E293B" }}
                      >
                        {faq.question}
                      </h3>
                    </div>
                    <div
                      className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                        openId === faq.id
                          ? "bg-blue-500 text-white rotate-45"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v12M6 12h12"
                        />
                      </svg>
                    </div>
                  </button>

                  {/* Answer - Collapsible */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openId === faq.id ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <div className="px-5 pb-5 pl-14">
                      <p
                        className="caption-text md:p-regular-text leading-relaxed"
                        style={{ color: "#6B7280" }}
                      >
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Still Have Questions */}
          <div className="mt-8 md:mt-12 md:hidden flex flex-col items-center text-center">
            <h4 className="p-semi-bold-text mb-2" style={{ color: "#1E293B" }}>
              Still Have Questions?
            </h4>
            <p className="caption-text text-gray-500 mb-4">
              Our support team is available 24/7 to help you with any questions
              about finding tutors, booking sessions, or using our platform.
            </p>
            <button className="px-6 py-2.5 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:border-blue-500 hover:text-blue-600 transition-all duration-300">
              Contact us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
