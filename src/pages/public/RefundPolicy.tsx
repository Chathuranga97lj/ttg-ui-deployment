import Link from "next/link";

export default function RefundPolicy() {
  const sections = [
    {
      id: 1,
      title: "General Policy",
      content:
        "Top Tutors Global provides a platform connecting students and tutors for educational services, including tutoring sessions, assignments, and project assistance. All payments made through Top Tutors Global are final and non-refundable, except under the specific conditions outlined below. Refund decisions are made at the sole discretion of Top Tutors Global after reviewing all relevant evidence.",
    },
    {
      id: 2,
      title: "Eligible Refund Scenarios",
      subsections: [
        {
          subId: "2.1",
          subTitle: "Tutor No-Show or Non-Delivery",
          content:
            "A full refund may be issued if:\n• The tutor fails to attend a scheduled session\n• The tutor does not deliver the agreed assignment/project on time.",
        },
        {
          subId: "2.2",
          subTitle: "Technical Failure",
          content:
            "A refund may be issued if:\n• A platform-related technical issue prevents service delivery\n• The issue cannot be resolved within a reasonable time",
        },
        {
          subId: "2.3",
          subTitle: "Duplicate or Incorrect Payment",
          content:
            "• Duplicate transactions will be fully refunded\n• Incorrect charges will be corrected after verification",
        },
      ],
    },
    {
      id: 3,
      title: "Assignment & Project-Based Refunds (Conditional)",
      intro:
        "This is the sensitive part — read carefully. Refunds for assignments or projects are NOT automatic and are subject to strict review.",
      subsections: [
        {
          subId: "3.1",
          subTitle: "Eligibility for Refund (Failure-Based Claims)",
          content:
            "A student may request a partial or full refund if:\n• The submitted work is proven to be incorrect, incomplete, or not aligned with the agreed requirements, AND\n• The student provides clear, verifiable evidence, such as:\n  - Official grading feedback\n  - Marking rubric\n  - Instructor comments\n\nJust saying 'I failed' is NOT enough.",
        },
        {
          subId: "3.2",
          subTitle: "Review Process",
          content:
            "• Both student and tutor will be contacted\n• Evidence from both parties will be evaluated\n• The platform will act as a mediator, not blindly take sides\n• It will take 3-14 days, depending on the case's complexity.",
        },
        {
          subId: "3.3",
          subTitle: "Refund Outcomes",
          content:
            "Based on the review:\n• Full Refund → If work is completely unusable or wrong\n• Partial Refund → If work is partially correct but below expected standard\n• No Refund → If:\n  - Requirements were met\n  - Failure is due to student factors (e.g., poor understanding, misuse of solution, late submission)",
        },
        {
          subId: "3.4",
          subTitle: "Revision First Policy",
          content:
            "Before issuing refunds:\n• Tutors may be given a chance to revise or correct the work\n• If the tutor fixes the issue properly → refund may NOT be granted",
        },
      ],
    },
    {
      id: 4,
      title: "Non-Refundable Situations",
      content:
        "Refunds will NOT be provided in the following cases:\n• Change of mind after purchase\n• Student fails to use the service\n• Late submissions caused by the student\n• Miscommunication not reported during the process\n• Academic failure not directly caused by the tutor's work\n• Violation of platform rules",
    },
    {
      id: 5,
      title: "Dispute & Refund Request Process",
      content:
        "To request a refund:\n\nEmail: support@toptutorsglobal.com\n\nInclude:\n• Order (ID, Title, subject)\n• Detailed explanation\n• Supporting evidence\n\nRequests must be made within 3–5 days of:\n• Session date OR\n• Assignment/project delivery\n\nLate claims may be rejected (because sometimes tutors are not reachable when student asking refund after 2-3 months)",
    },
    {
      id: 6,
      title: "Decision Authority",
      content:
        "All refund decisions are:\n• Final\n• Based on internal review and available evidence\n\nTop Tutors Global reserves the right to:\n• Approve\n• Reject\n• Partially approve any request",
    },
    {
      id: 7,
      title: "Processing Time",
      content:
        "Approved refunds will be processed within 7 business days via the original payment method.",
    },
    {
      id: 8,
      title: "Abuse & Fraud Protection",
      content:
        "We actively monitor for refund abuse.\n\nAccounts may be:\n• Suspended\n• Permanently banned\n\nIf users:\n• Repeatedly request unjustified refunds\n• Provide false claims or manipulated evidence",
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
              {section.intro && (
                <p
                  className="p-regular-text leading-relaxed ml-12 mb-4 italic"
                  style={{ color: "#6B7280" }}
                >
                  {section.intro}
                </p>
              )}
              {section.content && (
                <p
                  className="p-regular-text leading-relaxed ml-12 whitespace-pre-line"
                  style={{ color: "#6B7280" }}
                >
                  {section.content}
                </p>
              )}
              {section.subsections && (
                <div className="ml-12 mt-4 space-y-6">
                  {section.subsections.map((subsection) => (
                    <div key={subsection.subId}>
                      <h3
                        className="h5-semi-bold-text mb-2"
                        style={{ color: "#002662" }}
                      >
                        {subsection.subId} {subsection.subTitle}
                      </h3>
                      <p
                        className="p-regular-text leading-relaxed whitespace-pre-line"
                        style={{ color: "#6B7280" }}
                      >
                        {subsection.content}
                      </p>
                    </div>
                  ))}
                </div>
              )}
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
