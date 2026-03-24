import Link from "next/link";

export default function RefundPolicy() {
  const sections = [
    {
      id: 1,
      title: "Overview",
      content:
        "At Top Tutors Global, we believe in customer satisfaction and transparency. This Refund Policy explains the conditions under which refunds are issued and how to request one. Our goal is to ensure a smooth and fair refund process for all our valued customers.",
    },
    {
      id: 2,
      title: "Refund Eligibility",
      content:
        "You may request a refund if: The tutoring service was not provided as promised, The tutor failed to deliver quality work within the agreed timeframe, The final work does not meet the agreed-upon specifications, You are not satisfied with the service for valid reasons documented with evidence. Refund requests must be submitted within 7 days of service completion. Refunds are not available for services where the work has been substantially completed and you have initially accepted it.",
    },
    {
      id: 3,
      title: "Refund Request Process",
      content:
        "To request a refund, follow these steps: Contact our support team at toptutorsglobal@gmail.com with your order number and reason for refund, Provide detailed documentation of why you believe a refund is warranted, Allow 5-7 business days for our team to review your request, We will communicate our decision and the next steps via email. Our support team will evaluate your request fairly and transparently.",
    },
    {
      id: 4,
      title: "Partial Refunds",
      content:
        "In some cases, we may issue a partial refund if: A portion of the work is unsatisfactory while other parts meet expectations, The service was partially completed but abandoned, You received partial benefits from the service. Partial refund amounts are determined on a case-by-case basis by our review team after careful evaluation of the circumstances.",
    },
    {
      id: 5,
      title: "Non-Refundable Services",
      content:
        "The following scenarios are generally non-refundable: Services that were delivered on time and met agreed specifications, Work that the customer accepted or used before requesting a refund, Refund requests submitted more than 7 days after service completion, Services where the cancellation was initiated by the customer before work began (customer can request a different tutor instead), Disputes arising from miscommunication between customer and tutor regarding project requirements.",
    },
    {
      id: 6,
      title: "Refund Processing Time",
      content:
        "Once a refund is approved, the refund will be processed within 5-10 business days. The refund will be credited back to your original payment method. Depending on your financial institution, it may take an additional 2-5 business days for the funds to appear in your account. We cannot be held responsible for delays caused by your bank or payment provider.",
    },
    {
      id: 7,
      title: "Dispute Resolution",
      content:
        "If a customer and tutor cannot reach an agreement about service quality, we encourage open communication first. If the issue remains unresolved, our dispute resolution team will review the case and make a final determination. This review typically takes 7-14 days. Our decision in the dispute resolution process is final and binding.",
    },
    {
      id: 8,
      title: "Cancellation vs. Refund",
      content:
        "Cancellation: If you cancel before work has commenced, you may request to be matched with a different tutor instead of a refund. Your credit remains in your account for future use. Refund: If you request a refund after work has begun, it must meet the refund eligibility criteria outlined in Section 2 of this policy.",
    },
    {
      id: 9,
      title: "Fraudulent Refund Requests",
      content:
        "We take fraud very seriously. If we determine that a refund request is fraudulent or made in bad faith, we reserve the right to: Deny the refund request, Suspend or terminate your account, Report the activity to relevant authorities if necessary. Fraudulent activity includes submitting false claims, manipulating evidence, or attempting to exploit our refund system.",
    },
    {
      id: 10,
      title: "Money-Back Guarantee",
      content:
        "Top Tutors Global offers a 100% satisfaction guarantee on all services. If you are completely unsatisfied with your tutoring experience and our standard refund policy does not address your situation, please contact our management team at toptutorsglobal@gmail.com with your case details. We will work with you to find a fair resolution.",
    },
    {
      id: 11,
      title: "Special Circumstances",
      content:
        "In cases of technical issues, payment errors, or other exceptional circumstances, please contact our support team immediately. We handle special cases on an individual basis and are committed to resolving issues fairly. Documentation and communication are key to resolving special cases quickly.",
    },
    {
      id: 12,
      title: "Policy Updates",
      content:
        "We reserve the right to update this Refund Policy at any time. Changes will be effective immediately upon posting to our website. We will notify users of significant changes via email. Your continued use of our platform after policy updates indicates your acceptance of the new terms.",
    },
  ];

  return (
    <main className="bg-white">
      {/* Header Section */}
      <div
        className="py-16 md:py-24 text-center"
        style={{ backgroundColor: "#F8FAFC" }}
      >
        <div className="max-w-5xl mx-auto px-5">
          <h1
            className="h2-semi-bold-text md:h1-semi-bold-text mb-4"
            style={{ color: "#002662" }}
          >
            Refund Policy
          </h1>
          <p
            className="p-regular-text md:h4-semi-bold-text"
            style={{ color: "#6C7781" }}
          >
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Introduction */}
      <section className="max-w-5xl mx-auto px-5 py-12 md:py-16">
        <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg mb-12">
          <p
            className="p-regular-text leading-relaxed"
            style={{ color: "#1E293B" }}
          >
            Your satisfaction is our priority. We are committed to providing
            high-quality tutoring services. If for any reason you are not
            satisfied with our services, this policy outlines how we handle
            refunds and disputes.
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-8">
          {sections.map((section) => (
            <div key={section.id} className="border-b border-gray-200 pb-8">
              <div className="flex items-start gap-4 mb-4">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold shrink-0 mt-2"
                  style={{ backgroundColor: "#EA580C" }}
                >
                  {section.id}
                </div>
                <h2 className="h4-semi-bold-text" style={{ color: "#002662" }}>
                  {section.title}
                </h2>
              </div>
              <p
                className="p-regular-text leading-relaxed ml-12"
                style={{ color: "#6B7280" }}
              >
                {section.content}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Support Section */}
      <section
        className="py-12 md:py-16"
        style={{ backgroundColor: "#F8FAFC" }}
      >
        <div className="max-w-5xl mx-auto px-5">
          <div className="bg-white border border-gray-200 rounded-xl p-8 md:p-12">
            <h3 className="h3-semi-bold-text mb-4" style={{ color: "#002662" }}>
              Need Assistance?
            </h3>
            <p className="p-regular-text mb-6" style={{ color: "#6C7781" }}>
              If you have questions about our refund policy or need to file a
              refund request, our support team is here to help 24/7.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="mailto:toptutorsglobal@gmail.com"
                className="inline-block px-6 py-3 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-700 transition-colors duration-300 text-center"
              >
                Email Support
              </a>
              <Link
                href="/#faqs"
                className="inline-block px-6 py-3 border-2 border-amber-600 text-amber-600 font-medium rounded-lg hover:bg-amber-50 transition-colors duration-300 text-center"
              >
                View FAQs
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
