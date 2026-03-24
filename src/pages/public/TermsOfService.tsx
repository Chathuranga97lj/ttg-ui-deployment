export default function TermsOfService() {
  const sections = [
    {
      id: 1,
      title: "Acceptance of Terms",
      content:
        "By accessing and using Top Tutors Global, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service. We reserve the right to make changes to our Terms of Service at any time. Changes are effective immediately upon posting to the website. If you continue using the service after changes are posted, you agree to accept the updated terms.",
    },
    {
      id: 2,
      title: "Use License",
      content:
        "Permission is granted to temporarily download one copy of the materials (information or software) on Top Tutors Global for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not: modify or copy the materials; use the materials for any commercial purpose or for any public display; attempt to decompile or reverse engineer any software contained on the site; remove any copyright or other proprietary notations from the materials; transfer the materials to another person or 'mirror' the materials on any other server.",
    },
    {
      id: 3,
      title: "Disclaimer",
      content:
        "The materials on Top Tutors Global are provided 'as is'. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights. Further, we do not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its internet web site or otherwise relating to such materials or on any sites linked to this site.",
    },
    {
      id: 4,
      title: "Limitations",
      content:
        "In no event shall Top Tutors Global or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on the Top Tutors Global site, even if we or our authorized representative has been notified orally or in writing of the possibility of such damage.",
    },
    {
      id: 5,
      title: "Accuracy of Materials",
      content:
        "The materials appearing on Top Tutors Global could include technical, typographical, or photographic errors. We do not warrant that any of the materials on our site are accurate, complete, or current. We may make changes to the materials contained on our site at any time without notice.",
    },
    {
      id: 6,
      title: "Materials on Website",
      content:
        "Top Tutors Global does not review all materials posted to our website and is not responsible for the content of these materials. However, we reserve the right to remove, refuse to post, or edit any material submitted. We also reserve the right to limit or deny access to our site to any person.",
    },
    {
      id: 7,
      title: "Links",
      content:
        "Without prior approval and express written permission, we may not be responsible for the contents of any off-site pages or any other links contained within an off-site page. Your access to and use of linked websites is at your own risk, and we are not responsible for the accuracy, legality, or content of external sites or resources.",
    },
    {
      id: 8,
      title: "Modifications",
      content:
        "We may revise our Terms of Service for our website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these Terms of Service.",
    },
    {
      id: 9,
      title: "Governing Law",
      content:
        "These terms and conditions are governed by and construed in accordance with the laws of Sri Lanka, and you irrevocably submit to the exclusive jurisdiction of the courts located in Sri Lanka.",
    },
    {
      id: 10,
      title: "User Accounts and Responsibilities",
      content:
        "If you create an account on Top Tutors Global, you are responsible for maintaining the confidentiality of your password and account information. You agree to accept responsibility for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account. We reserve the right to refuse service or terminate accounts that we determine, in our sole discretion, violate these terms.",
    },
    {
      id: 11,
      title: "Intellectual Property Rights",
      content:
        "All content, features, and functionality (including but not limited to all information, software, text, displays, images, video, and audio) are owned by Top Tutors Global, its licensors, or other providers of such material and are protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, transmit, display, or perform any content from our website without prior written permission.",
    },
    {
      id: 12,
      title: "User-Generated Content",
      content:
        "When you submit content to our platform, you grant Top Tutors Global a non-exclusive, royalty-free, perpetual license to use, reproduce, modify, and distribute your content. You represent and warrant that you own or have the necessary permissions to submit the content and that it does not infringe on any third-party rights.",
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
            Terms of Service
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
        <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg mb-12">
          <p
            className="p-regular-text leading-relaxed"
            style={{ color: "#1E293B" }}
          >
            Welcome to Top Tutors Global. These Terms of Service govern your use
            of our website and services. By accessing our platform, you agree to
            comply with these terms. If you do not agree, please refrain from
            using our services.
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-8">
          {sections.map((section) => (
            <div key={section.id} className="border-b border-gray-200 pb-8">
              <div className="flex items-start gap-4 mb-4">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold shrink-0 mt-2"
                  style={{ backgroundColor: "#16A34A" }}
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

      {/* Dispute Resolution */}
      <section
        className="py-12 md:py-16"
        style={{ backgroundColor: "#F8FAFC" }}
      >
        <div className="max-w-5xl mx-auto px-5">
          <div className="bg-white border border-gray-200 rounded-xl p-8 md:p-12">
            <h3 className="h3-semi-bold-text mb-4" style={{ color: "#002662" }}>
              Questions About Our Terms?
            </h3>
            <p className="p-regular-text mb-6" style={{ color: "#6C7781" }}>
              If you have any questions regarding these Terms of Service or your
              usage of our platform, please contact our support team.
            </p>
            <a
              href="mailto:toptutorsglobal@gmail.com"
              className="inline-block px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors duration-300"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
