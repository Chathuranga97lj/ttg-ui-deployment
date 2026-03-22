import { useState, useMemo } from "react";
import Image from "next/image";
import dashWebImg from "../../../public/images/dashboard/dash_web.jpg";
import dashMobileImg from "../../../public/images/dashboard/dash_mobile.jpg";
import Footer from "../components/shared/Footer";

interface TutorAssignment {
  id: number;
  title: string;
  price: number;
  assignedDate: string;
  status: "Working" | "Revision Stage" | "Completed" | "Cancelled";
  payment?:
    | "Final Payment Required"
    | "Refunded"
    | "Cleared"
    | "Paid"
    | "Pending";
  timeRemaining?: string;
  description?: string;
  studentName?: string;
  studentEmail?: string;
  dueDate?: string;
  attachments?: string[];
}

export default function TutorDashboard() {
  const [activeTab, setActiveTab] = useState<"inprogress" | "completed">(
    "inprogress",
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAssignment, setSelectedAssignment] =
    useState<TutorAssignment | null>(null);
  const itemsPerPage = 10;

  // Dummy data for inprogress assignments
  const inprogressData: TutorAssignment[] = [
    {
      id: 1,
      title: "Maths Assignment",
      price: 50,
      timeRemaining: "2:4 32:29",
      assignedDate: "2025:10:10",
      status: "Working",
      studentName: "John Doe",
      studentEmail: "john@example.com",
      dueDate: "2025-10-15",
      description:
        "Complete the calculus problems from chapter 5. Solutions must include step-by-step working.",
      attachments: ["assignment.pdf", "reference_material.pdf"],
    },
    {
      id: 2,
      title: "Maths Assignment",
      price: 50,
      timeRemaining: "2:4 32:29",
      assignedDate: "2025:10:10",
      status: "Revision Stage",
      studentName: "Jane Smith",
      studentEmail: "jane@example.com",
      dueDate: "2025-10-12",
      description:
        "Review and correct the geometry proofs. Please provide detailed feedback on each solution.",
      attachments: ["proofs.pdf"],
    },
    {
      id: 3,
      title: "Maths Assignment",
      price: 50,
      timeRemaining: "2:4 32:29",
      assignedDate: "2025:10:10",
      status: "Working",
      studentName: "Mike Johnson",
      studentEmail: "mike@example.com",
      dueDate: "2025-10-18",
      description:
        "Solve the trigonometry problems and create a summary document.",
      attachments: ["trig_problems.pdf"],
    },
    {
      id: 4,
      title: "Maths Assignment",
      price: 50,
      timeRemaining: "2:4 32:29",
      assignedDate: "2025:10:10",
      status: "Revision Stage",
      studentName: "Sarah Wilson",
      studentEmail: "sarah@example.com",
      dueDate: "2025-10-14",
      description:
        "Check the linear algebra solutions. Student needs clarification on eigenvalues.",
      attachments: ["linear_algebra.pdf"],
    },
    {
      id: 5,
      title: "Maths Assignment",
      price: 50,
      timeRemaining: "2:4 32:29",
      assignedDate: "2025:10:10",
      status: "Working",
      studentName: "Tom Brown",
      studentEmail: "tom@example.com",
      dueDate: "2025-10-20",
      description: "Complete the statistics assignment with data analysis.",
      attachments: ["statistics_data.xlsx", "instructions.pdf"],
    },
    {
      id: 6,
      title: "Maths Assignment",
      price: 50,
      timeRemaining: "2:4 32:29",
      assignedDate: "2025:10:10",
      status: "Revision Stage",
      studentName: "Emma Davis",
      studentEmail: "emma@example.com",
      dueDate: "2025-10-13",
      description:
        "Revise the algebra problems. Some solutions need more detail.",
      attachments: ["algebra_solutions.pdf"],
    },
    {
      id: 7,
      title: "Maths Assignment",
      price: 50,
      timeRemaining: "2:4 32:29",
      assignedDate: "2025:10:10",
      status: "Working",
      studentName: "Alex Miller",
      studentEmail: "alex@example.com",
      dueDate: "2025-10-17",
      description: "Work on the calculus optimization problems.",
      attachments: ["optimization.pdf"],
    },
    {
      id: 8,
      title: "Maths Assignment",
      price: 50,
      timeRemaining: "2:4 32:29",
      assignedDate: "2025:10:10",
      status: "Revision Stage",
      studentName: "Lisa Anderson",
      studentEmail: "lisa@example.com",
      dueDate: "2025-10-11",
      description:
        "Review the differential equations. Please add more explanations.",
      attachments: ["diff_equations.pdf"],
    },
    {
      id: 9,
      title: "Maths Assignment",
      price: 50,
      timeRemaining: "2:4 32:29",
      assignedDate: "2025:10:10",
      status: "Working",
      studentName: "Chris Taylor",
      studentEmail: "chris@example.com",
      dueDate: "2025-10-19",
      description: "Complete the matrix operations assignment.",
      attachments: ["matrices.pdf"],
    },
    {
      id: 10,
      title: "Maths Assignment",
      price: 50,
      timeRemaining: "2:4 32:29",
      assignedDate: "2025:10:10",
      status: "Revision Stage",
      studentName: "Rachel Green",
      studentEmail: "rachel@example.com",
      dueDate: "2025-10-16",
      description: "Fix the vector calculations. Check your work carefully.",
      attachments: ["vectors.pdf"],
    },
  ];

  // Dummy data for completed assignments
  const completedData: TutorAssignment[] = [
    {
      id: 11,
      title: "Physics Assignment",
      price: 75,
      timeRemaining: "Completed",
      assignedDate: "2025:10:05",
      status: "Completed",
      payment: "Paid",
      studentName: "David Chen",
      studentEmail: "david@example.com",
      dueDate: "2025-10-10",
      description:
        "Wave mechanics problems - completed successfully with all diagrams.",
      attachments: ["completion_report.pdf"],
    },
    {
      id: 12,
      title: "Chemistry Assignment",
      price: 60,
      timeRemaining: "Completed",
      assignedDate: "2025:10:06",
      status: "Completed",
      payment: "Pending",
      studentName: "Olivia Martinez",
      studentEmail: "olivia@example.com",
      dueDate: "2025-10-09",
      description:
        "Organic chemistry reactions - all mechanisms explained clearly.",
      attachments: ["mechanisms.pdf", "summary.pdf"],
    },
    {
      id: 13,
      title: "English Essay",
      price: 40,
      timeRemaining: "Completed",
      assignedDate: "2025:10:04",
      status: "Completed",
      payment: "Paid",
      studentName: "Grace Lee",
      studentEmail: "grace@example.com",
      dueDate: "2025-10-08",
      description:
        "Shakespeare analysis essay - comprehensive review with feedback.",
      attachments: ["essay_final.docx"],
    },
    {
      id: 14,
      title: "History Research",
      price: 55,
      timeRemaining: "Completed",
      assignedDate: "2025:10:07",
      status: "Completed",
      payment: "Paid",
      studentName: "Marcus White",
      studentEmail: "marcus@example.com",
      dueDate: "2025-10-12",
      description: "Industrial revolution research paper with primary sources.",
      attachments: ["research_paper.pdf", "citations.pdf"],
    },
    {
      id: 15,
      title: "Biology Lab Report",
      price: 70,
      timeRemaining: "Completed",
      assignedDate: "2025:10:03",
      status: "Completed",
      payment: "Pending",
      studentName: "Sophia Jones",
      studentEmail: "sophia@example.com",
      dueDate: "2025-10-07",
      description:
        "Cellular biology lab report with detailed observations and conclusions.",
      attachments: ["lab_report.pdf", "data_analysis.xlsx"],
    },
    {
      id: 16,
      title: "Economics Project",
      price: 80,
      timeRemaining: "Completed",
      assignedDate: "2025:10:02",
      status: "Completed",
      payment: "Paid",
      studentName: "Henry Rodriguez",
      studentEmail: "henry@example.com",
      dueDate: "2025-10-06",
      description:
        "Market analysis project with graphs and economic theory application.",
      attachments: ["project_presentation.ppt", "analysis.pdf"],
    },
    {
      id: 17,
      title: "Programming Assignment",
      price: 100,
      timeRemaining: "Completed",
      assignedDate: "2025:10:01",
      status: "Completed",
      payment: "Paid",
      studentName: "Julia Park",
      studentEmail: "julia@example.com",
      dueDate: "2025-10-05",
      description:
        "Full-stack web application with database and API integration.",
      attachments: ["code_submission.zip", "documentation.pdf"],
    },
    {
      id: 18,
      title: "Art Portfolio",
      price: 65,
      timeRemaining: "Completed",
      assignedDate: "2025:10:08",
      status: "Completed",
      payment: "Pending",
      studentName: "Aisha Mohammed",
      studentEmail: "aisha@example.com",
      dueDate: "2025-10-14",
      description: "Digital art portfolio with 10 pieces and artist statement.",
      attachments: ["portfolio.pdf", "artwork_guide.pdf"],
    },
    {
      id: 19,
      title: "Music Composition",
      price: 90,
      timeRemaining: "Completed",
      assignedDate: "2025:09:30",
      status: "Completed",
      payment: "Paid",
      studentName: "Ethan Blake",
      studentEmail: "ethan@example.com",
      dueDate: "2025-10-04",
      description:
        "Classical music composition with full orchestration and notes.",
      attachments: ["composition.pdf", "audio_demo.mp3"],
    },
    {
      id: 20,
      title: "Philosophy Essay",
      price: 50,
      timeRemaining: "Completed",
      assignedDate: "2025:10:09",
      status: "Completed",
      payment: "Paid",
      studentName: "Natalie Foster",
      studentEmail: "natalie@example.com",
      dueDate: "2025-10-13",
      description:
        "Ethics essay examining moral frameworks and real-world applications.",
      attachments: ["essay.pdf", "references.pdf"],
    },
  ];

  // Get current data based on tab
  const currentData =
    activeTab === "inprogress" ? inprogressData : completedData;

  // Filter and paginate data
  const filteredData = useMemo(() => {
    return currentData.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery, currentData]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Working":
        return "bg-blue-100 text-blue-700";
      case "Revision Stage":
        return "bg-yellow-100 text-yellow-700";
      case "Completed":
        return "bg-green-100 text-green-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getPaymentColor = (payment: string) => {
    switch (payment) {
      case "Final Payment Required":
        return "bg-orange-100 text-orange-700";
      case "Refunded":
        return "bg-blue-100 text-blue-700";
      case "Cleared":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // If assignment is selected, show details page
  if (selectedAssignment) {
    return (
      <main className="w-full">
        {/* Hero Section with Background Image and Floating Card */}
        <div className="relative w-full">
          {/* Background Image Container */}
          <div className="relative w-full h-64 md:h-80 lg:h-96">
            {/* Desktop Background Image */}
            <div className="hidden md:block relative w-full h-full">
              <Image
                src={dashWebImg}
                alt="Tutor Dashboard Hero"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Mobile Background Image */}
            <div className="md:hidden relative w-full h-full">
              <Image
                src={dashMobileImg}
                alt="Tutor Dashboard Hero Mobile"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Overlay gradient for better text readability */}
            <div className="absolute inset-0 bg-linear-to-b from-transparent to-white/20"></div>
          </div>

          {/* Floating Content Section */}
          <div className="mx-auto px-4 md:px-6 max-w-4xl relative -mt-24 md:-mt-32 lg:-mt-40 z-10 mb-10">
            {/* Details Container - Floating Card */}
            <div className="bg-white rounded-lg shadow-lg border border-blue-300 overflow-hidden p-8 ">
              {/* Back Button */}
              <button
                onClick={() => setSelectedAssignment(null)}
                className="flex items-center text-blue-600 hover:text-blue-800 mb-6 font-medium text-sm md:text-base"
              >
                ← Back
              </button>

              {/* Page Title */}
              <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                  Assignment details
                </h1>
                <p className="text-gray-600 text-sm mt-1">
                  View your submitted assignment details
                </p>
              </div>

              {/* Details Container */}
              <div className="space-y-8">
                {/* Title & Subject Section */}
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Title */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Title
                      </label>
                      <p className="text-gray-600">
                        {selectedAssignment.title}
                      </p>
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Subject
                      </label>
                      <p className="text-gray-600">Mathematics</p>
                    </div>
                  </div>
                  <div className="border-b border-gray-200 mt-6"></div>
                </div>

                {/* Submission Date & Time Section */}
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-6">
                      {/* Submission Date */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Submission date
                        </label>
                        <p className="text-gray-600">
                          {selectedAssignment.dueDate || "N/A"}
                        </p>
                      </div>

                      {/* Time Zone */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Time zone
                        </label>
                        <p className="text-gray-600">India Standard Time</p>
                      </div>

                      {/* Remaining Time */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Remaining time
                        </label>
                        <p className="text-gray-600">
                          {selectedAssignment.timeRemaining || "N/A"}
                        </p>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                      {/* Submission Time */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Submission time
                        </label>
                        <p className="text-gray-600">12 am</p>
                      </div>
                    </div>
                  </div>
                  <div className="border-b border-gray-200 mt-6"></div>
                </div>

                {/* Student & Budget Section */}
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* WhatsApp number */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        WhatsApp number
                      </label>
                      <p className="text-gray-600">
                        {selectedAssignment.studentEmail || "N/A"}
                      </p>
                    </div>

                    {/* Budget */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Budget($)
                      </label>
                      <p className="text-gray-600">
                        {selectedAssignment.price}
                      </p>
                    </div>
                  </div>
                  <div className="border-b border-gray-200 mt-6"></div>
                </div>

                {/* Description Section */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description
                  </label>
                  <p className="text-gray-600 leading-relaxed">
                    {selectedAssignment.description ||
                      "No description provided"}
                  </p>
                  <div className="border-b border-gray-200 mt-6"></div>
                </div>

                {/* Attachments Section */}
                {selectedAssignment.attachments &&
                  selectedAssignment.attachments.length > 0 && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-4">
                        Attachments
                      </label>

                      <div className="space-y-3">
                        {selectedAssignment.attachments.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-xl">📄</span>
                              <div>
                                <p className="text-gray-700 font-medium text-sm">
                                  {file}
                                </p>
                                <p className="text-gray-500 text-xs">3 MB</p>
                              </div>
                            </div>
                            <button className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors">
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                />
                              </svg>
                              Download
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </main>
    );
  }

  return (
    <main className="w-full">
      {/* Hero Section with Background Image and Floating Card */}
      <div className="relative w-full">
        {/* Background Image Container */}
        <div className="relative w-full h-64 md:h-80 lg:h-96">
          {/* Desktop Background Image */}
          <div className="hidden md:block relative w-full h-full">
            <Image
              src={dashWebImg}
              alt="Tutor Dashboard Hero"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Mobile Background Image */}
          <div className="md:hidden relative w-full h-full">
            <Image
              src={dashMobileImg}
              alt="Tutor Dashboard Hero Mobile"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Overlay gradient for better text readability */}
          <div className="absolute inset-0 bg-linear-to-b from-transparent to-white/20"></div>
        </div>

        {/* Floating Content Section */}
        <div className="mx-auto px-4 md:px-6 max-w-7xl relative -mt-24 md:-mt-32 lg:-mt-40 z-10 mb-10">
          {/* Dashboard Container - Floating Card */}
          <div className="bg-white rounded-lg shadow-lg border border-blue-300 overflow-hidden">
            {/* Tab Navigation */}
            <div className="flex items-center justify-start border-b py-1 border-gray-200 md:px-6 px-1">
              <div className="flex">
                <button
                  onClick={() => {
                    setActiveTab("inprogress");
                    setCurrentPage(1);
                    setSearchQuery("");
                  }}
                  className={`px-2 md:px-6 py-2 font-medium transition-all duration-300 ${
                    activeTab === "inprogress"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  <span className="text-sm md:text-base">Inprogress</span>
                </button>
                <button
                  onClick={() => {
                    setActiveTab("completed");
                    setCurrentPage(1);
                    setSearchQuery("");
                  }}
                  className={`px-2 md:px-6 py-2 font-medium transition-all duration-300 ${
                    activeTab === "completed"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  <span className="text-sm md:text-base">Completed</span>
                </button>
              </div>
            </div>

            {/* Content Area */}
            <div className="p-6 md:p-12 min-h-96">
              {/* Empty State */}
              {filteredData.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">
                    {activeTab === "inprogress"
                      ? "No assigned assignments yet"
                      : "No completed assignments yet"}
                  </h2>
                  <p className="text-gray-600 text-sm md:text-base mb-6">
                    Checkout our WhatsApp group to get a assigned assignments
                  </p>
                  <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                    Join WhatsApp group
                  </button>
                </div>
              ) : (
                <>
                  {/* Search Bar */}
                  <div className="flex justify-between items-center mb-6">
                    <p className="text-sm text-gray-600">
                      Showing {Math.min(itemsPerPage, filteredData.length)} of{" "}
                      {filteredData.length} records
                    </p>
                    <input
                      type="text"
                      placeholder="Search"
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>

                  {/* Desktop Table View */}
                  <div className="hidden md:overflow-x-auto md:block">
                    <table className="w-full text-sm text-left text-gray-700">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="px-4 py-3 font-semibold text-gray-900">
                            Title
                          </th>
                          <th className="px-4 py-3 font-semibold text-gray-900">
                            Budget ($)
                          </th>
                          {activeTab === "inprogress" ? (
                            <>
                              <th className="px-4 py-3 font-semibold text-gray-900">
                                Time remaining
                              </th>
                              <th className="px-4 py-3 font-semibold text-gray-900">
                                Assigned date
                              </th>
                              <th className="px-4 py-3 font-semibold text-gray-900">
                                Status
                              </th>
                            </>
                          ) : (
                            <>
                              <th className="px-4 py-3 font-semibold text-gray-900">
                                Assigned date
                              </th>
                              <th className="px-4 py-3 font-semibold text-gray-900">
                                Status
                              </th>
                              <th className="px-4 py-3 font-semibold text-gray-900">
                                Payment
                              </th>
                            </>
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedData.map((item) => (
                          <tr
                            key={item.id}
                            onClick={() => setSelectedAssignment(item)}
                            className="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
                          >
                            <td className="px-4 py-3 text-gray-900">
                              {item.title}
                            </td>
                            <td className="px-4 py-3 text-gray-700">
                              ${item.price}
                            </td>
                            {activeTab === "inprogress" ? (
                              <>
                                <td className="px-4 py-3 text-gray-700">
                                  {item.timeRemaining}
                                </td>
                                <td className="px-4 py-3 text-gray-700">
                                  {item.assignedDate}
                                </td>
                                <td className="px-4 py-3">
                                  <span
                                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                      item.status,
                                    )}`}
                                  >
                                    {item.status}
                                  </span>
                                </td>
                              </>
                            ) : (
                              <>
                                <td className="px-4 py-3 text-gray-700">
                                  {item.assignedDate}
                                </td>
                                <td className="px-4 py-3">
                                  <span
                                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                      item.status,
                                    )}`}
                                  >
                                    {item.status}
                                  </span>
                                </td>
                                <td className="px-4 py-3">
                                  <span
                                    className={`px-3 py-1 rounded-full text-xs font-medium ${getPaymentColor(
                                      item.payment || "",
                                    )}`}
                                  >
                                    {item.payment}
                                  </span>
                                </td>
                              </>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Card View */}
                  <div className="md:hidden space-y-4">
                    {paginatedData.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => setSelectedAssignment(item)}
                      >
                        <div className="mb-3">
                          <h3 className="font-semibold text-gray-800 text-sm">
                            {item.title}
                          </h3>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Budget:</span>
                            <span className="font-semibold text-gray-800">
                              ${item.price}
                            </span>
                          </div>
                          {activeTab === "inprogress" ? (
                            <>
                              <div className="flex justify-between">
                                <span className="text-gray-600">
                                  Time remaining:
                                </span>
                                <span className="font-semibold text-gray-800">
                                  {item.timeRemaining}
                                </span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-gray-600">Status:</span>
                                <span
                                  className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                    item.status,
                                  )}`}
                                >
                                  {item.status}
                                </span>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="flex justify-between items-center">
                                <span className="text-gray-600">Status:</span>
                                <span
                                  className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                    item.status,
                                  )}`}
                                >
                                  {item.status}
                                </span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-gray-600">Payment:</span>
                                <span
                                  className={`px-3 py-1 rounded-full text-xs font-medium ${getPaymentColor(
                                    item.payment || "",
                                  )}`}
                                >
                                  {item.payment}
                                </span>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pagination */}
                  <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-gray-600">
                      Showing {Math.min(itemsPerPage, paginatedData.length)} of{" "}
                      {filteredData.length} records
                    </p>
                    <div className="flex items-center gap-2">
                      <button className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-100 transition-colors">
                        ←
                      </button>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-3 py-1 rounded transition-colors ${
                              currentPage === page
                                ? "bg-blue-600 text-white"
                                : "border border-gray-300 hover:bg-gray-100"
                            }`}
                          >
                            {page}
                          </button>
                        ),
                      )}
                      <button className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-100 transition-colors">
                        →
                      </button>
                      <select className="ml-4 px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>10/page</option>
                        <option>20/page</option>
                        <option>50/page</option>
                      </select>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
