export default function PrivacyPolicy() {
  const sections = [
    {
      id: 1,
      title: "Information Collection and Use",
      content:
        "You can visit Top Tutors Global without submitting any personal information. However, to access certain features or services, we may collect personal information, including but not limited to: Name, Email address, Password, Profile photo (for tutors), Username. We may also collect any information you voluntarily provide in forms, surveys, forum posts, or direct communication. If you participate as a tutor, we may request additional information, such as identification details for verification purposes.",
    },
    {
      id: 2,
      title: "Aggregate Information",
      content:
        "We automatically collect certain aggregate information when you use our services. This includes your browser type, IP address, and how you interact with the website. This data is anonymized and used for statistical analysis to improve our services.",
    },
    {
      id: 3,
      title: "Use of Personal Information",
      content:
        "We use your personal information for the following purposes: To provide services and support as requested, To verify your identity and ensure security, To detect and prevent fraud and unauthorized use, To send promotional messages, offers, and updates (you can opt-out at any time), To improve the functionality of our site and services through data analysis.",
    },
    {
      id: 4,
      title: "Children's Privacy",
      content:
        "Top Tutors Global does not knowingly collect personal information from children under 16. Our site is not intended for users under this age. If we discover that a child under 16 has provided personal information, we will take steps to delete such information immediately.",
    },
    {
      id: 5,
      title: "Cookies and Online Tracking",
      content:
        "We use cookies to enhance your experience on our website. These small text files allow us to store your preferences and maintain your login session. We also use third-party analytics services, which may track user activity across our site. You may opt to disable cookies through your browser settings, but this may limit some features of the website.",
    },
    {
      id: 6,
      title: "Social Plugins",
      content:
        "Our website may include social media plugins (e.g., Facebook, Google, LinkedIn) that allow you to interact with those networks. These plugins may collect data as governed by their respective privacy policies.",
    },
    {
      id: 7,
      title: "Disclosure of Information",
      content:
        "We may share your personal data with third-party service providers to help us deliver services and manage the site. If you ask or answer a question publicly, your username and profile picture may be visible to other users. Private questions allow for anonymous interaction, but the question and responses will still be visible to others. We may also disclose information to comply with legal obligations, such as in response to legal processes, court orders, or regulatory requests.",
    },
    {
      id: 8,
      title: "Security Measures",
      content:
        "We implement reasonable security measures such as encryption, password protection, and secure data storage to protect your personal information from unauthorized access. However, no system is 100% secure, so we cannot guarantee absolute security.",
    },
    {
      id: 9,
      title: "Links to Third-Party Sites",
      content:
        "Top Tutors Global may provide links to external websites for your convenience. We are not responsible for the content or privacy policies of these third-party sites. We encourage you to review their privacy policies before using their services.",
    },
    {
      id: 10,
      title: "Data Retention and Deletion",
      content:
        "You may review, update, or delete your personal information by logging into your account. If you wish to delete your account, you can contact us at support@toptutorsglobal.com, and we will process your request to remove your account and associated data.",
    },
    {
      id: 11,
      title: "Changes to Privacy Policy",
      content:
        "We may update this Privacy Policy periodically. Any changes will be communicated via email to registered users and posted on our site. By continuing to use our services after such updates, you agree to the revised policy.",
    },
    {
      id: 12,
      title: "Questions and Contact Information",
      content:
        "If you have any questions about this Privacy Policy, feel free to contact us at support@toptutorsglobal.com.",
    },
    {
      id: 13,
      title: "Users Outside of Sri Lanka",
      content:
        "Our services are based in Sri Lanka, and personal data will be processed there. By using Top Tutors Global, you consent to this data transfer and processing. If you are located outside of Sri Lanka, please note that local data protection laws may differ from Sri Lanka Law.",
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
            Privacy Policy
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
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-12">
          <p
            className="p-regular-text leading-relaxed"
            style={{ color: "#1E293B" }}
          >
            At Top Tutors Global, we respect your privacy and are committed to
            protecting your personal information. This Privacy Policy outlines
            how we collect, use, and protect your data when you visit our
            website or use our services.
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-8">
          {sections.map((section) => (
            <div key={section.id} className="border-b border-gray-200 pb-8">
              <div className="flex items-start gap-4 mb-4">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold shrink-0 mt-2"
                  style={{ backgroundColor: "#003893" }}
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

      {/* Contact Section */}
      <section
        className="py-12 md:py-16"
        style={{ backgroundColor: "#F8FAFC" }}
      >
        <div className="max-w-5xl mx-auto px-5">
          <div className="bg-white border border-gray-200 rounded-xl p-8 md:p-12">
            <h3 className="h3-semi-bold-text mb-4" style={{ color: "#002662" }}>
              Have Questions?
            </h3>
            <p className="p-regular-text mb-6" style={{ color: "#6C7781" }}>
              If you have any concerns or questions about this Privacy Policy,
              please don&apos;t hesitate to reach out to us.
            </p>
            <a
              href="mailto:support@toptutorsglobal.com"
              className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
