import { useState, useMemo } from "react";
import AssignmentDetails from "./AssignmentDetails";

interface Attachment {
  id: number;
  name: string;
  size: number;
}

interface Assessment {
  id: number;
  title: string;
  subject: string;
  budget: number;
  timeRemaining?: string;
  submissionDate: string;
  submissionTime: string;
  timeZone: string;
  remainingTime: string;
  whatsappCountryCode: string;
  whatsappPhone: string;
  description: string;
  attachments: Attachment[];
  status:
    | "Tutor Assigned"
    | "Under Review"
    | "In Progress"
    | "Completed"
    | "No Tutor Found"
    | "Cancelled"
    | "Expired";
  payment?: "Cleared" | "Refunded";
}

interface AssessmentListProps {
  tabType: "active" | "completed";
  onDetailsViewChange?: (isViewingDetails: boolean) => void;
}

// Dummy data for active assignments
const DUMMY_ASSESSMENTS: Assessment[] = [
  {
    id: 1,
    title: "Maths Assignment",
    subject: "Mathematics",
    budget: 50,
    timeRemaining: "2:43:29",
    submissionDate: "2025.05.05",
    submissionTime: "12 am",
    timeZone: "India Standard Time",
    remainingTime: "2:23:53:34",
    whatsappCountryCode: "+94",
    whatsappPhone: "7712345678",
    description:
      "This is the short description about the posted assignment. This is the short description about the posted assignment. This is the short description about the posted assignment. This is the short description about the posted assignment.",
    attachments: [
      { id: 1, name: "File name", size: 3 },
      { id: 2, name: "File name", size: 3 },
    ],
    status: "Tutor Assigned",
  },
  {
    id: 2,
    title: "Maths Assignment",
    subject: "Mathematics",
    budget: 50,
    timeRemaining: "2:43:29",
    submissionDate: "2025.05.06",
    submissionTime: "2 pm",
    timeZone: "India Standard Time",
    remainingTime: "1:15:20:45",
    whatsappCountryCode: "+92",
    whatsappPhone: "3001234567",
    description:
      "Mathematics assignment about calculus and derivatives. Includes complex problems and solutions.",
    attachments: [
      { id: 1, name: "Assignment.pdf", size: 2.5 },
      { id: 2, name: "Solutions.docx", size: 1.8 },
    ],
    status: "Under Review",
  },
  {
    id: 3,
    title: "Maths Assignment",
    subject: "Algebra",
    budget: 50,
    timeRemaining: "2:43:29",
    submissionDate: "2025.05.07",
    submissionTime: "10 am",
    timeZone: "India Standard Time",
    remainingTime: "3:08:12:15",
    whatsappCountryCode: "+1",
    whatsappPhone: "2025551234",
    description: "Algebra problems focusing on equations and inequalities.",
    attachments: [{ id: 1, name: "Algebra_Problems.pdf", size: 4.2 }],
    status: "In Progress",
  },
  {
    id: 4,
    title: "Maths Assignment",
    subject: "Geometry",
    budget: 50,
    timeRemaining: "2:43:29",
    submissionDate: "2025.05.08",
    submissionTime: "3 pm",
    timeZone: "UTC",
    remainingTime: "0:22:35:10",
    whatsappCountryCode: "+44",
    whatsappPhone: "2071838750",
    description: "Geometry assignment on shapes, angles, and proofs.",
    attachments: [{ id: 1, name: "Geometry_Diagrams.zip", size: 5.6 }],
    status: "Under Review",
  },
  {
    id: 5,
    title: "Physics Assignment",
    subject: "Mechanics",
    budget: 75,
    timeRemaining: "1:20:15",
    submissionDate: "2025.05.10",
    submissionTime: "9 am",
    timeZone: "India Standard Time",
    remainingTime: "5:14:30:22",
    whatsappCountryCode: "+91",
    whatsappPhone: "9876543210",
    description: "Physics assignment on Newton's laws and motion.",
    attachments: [
      { id: 1, name: "Physics_Report.pdf", size: 3.8 },
      { id: 2, name: "Calculations.xlsx", size: 0.5 },
    ],
    status: "Tutor Assigned",
  },
  {
    id: 6,
    title: "Chemistry Project",
    subject: "Organic Chemistry",
    budget: 100,
    timeRemaining: "3:15:45",
    submissionDate: "2025.05.15",
    submissionTime: "5 pm",
    timeZone: "Eastern Time",
    remainingTime: "7:18:45:33",
    whatsappCountryCode: "+1",
    whatsappPhone: "2129876543",
    description:
      "Organic chemistry project on molecular structures and reactions.",
    attachments: [
      { id: 1, name: "Molecules.mol", size: 2.1 },
      { id: 2, name: "Report.docx", size: 1.9 },
    ],
    status: "In Progress",
  },
  {
    id: 7,
    title: "Biology Case Study",
    subject: "Genetics",
    budget: 60,
    timeRemaining: "5:30:20",
    submissionDate: "2025.05.12",
    submissionTime: "11 am",
    timeZone: "Pacific Time",
    remainingTime: "2:19:15:40",
    whatsappCountryCode: "+61",
    whatsappPhone: "412345678",
    description: "Biology case study on genetic inheritance patterns.",
    attachments: [{ id: 1, name: "Study.pdf", size: 4.3 }],
    status: "Under Review",
  },
  {
    id: 8,
    title: "English Essay",
    subject: "Literature",
    budget: 40,
    timeRemaining: "0:45:30",
    submissionDate: "2025.05.09",
    submissionTime: "1 pm",
    timeZone: "India Standard Time",
    remainingTime: "1:06:22:15",
    whatsappCountryCode: "+971",
    whatsappPhone: "501234567",
    description: "English essay on Shakespearean literature and themes.",
    attachments: [
      { id: 1, name: "Essay.docx", size: 0.8 },
      { id: 2, name: "Bibliography.pdf", size: 1.2 },
    ],
    status: "Tutor Assigned",
  },
  {
    id: 9,
    title: "History Report",
    subject: "World History",
    budget: 55,
    timeRemaining: "4:12:10",
    submissionDate: "2025.05.11",
    submissionTime: "8 am",
    timeZone: "Central European Time",
    remainingTime: "6:03:18:50",
    whatsappCountryCode: "+33",
    whatsappPhone: "123456789",
    description: "Historical report on World War II events and impact.",
    attachments: [{ id: 1, name: "History_Report.pdf", size: 5.2 }],
    status: "In Progress",
  },
  {
    id: 10,
    title: "Geography Project",
    subject: "Physical Geography",
    budget: 70,
    timeRemaining: "2:28:40",
    submissionDate: "2025.05.14",
    submissionTime: "4 pm",
    timeZone: "GMT",
    remainingTime: "4:11:52:28",
    whatsappCountryCode: "+86",
    whatsappPhone: "1234567890",
    description: "Geography project on climate zones and ecosystems.",
    attachments: [
      { id: 1, name: "Maps.pdf", size: 6.1 },
      { id: 2, name: "Data.csv", size: 0.3 },
    ],
    status: "Under Review",
  },
  {
    id: 11,
    title: "Computer Science",
    subject: "Programming",
    budget: 90,
    timeRemaining: "1:50:55",
    submissionDate: "2025.05.13",
    submissionTime: "6 pm",
    timeZone: "India Standard Time",
    remainingTime: "5:16:08:33",
    whatsappCountryCode: "+65",
    whatsappPhone: "90123456",
    description:
      "Computer science assignment on data structures and algorithms.",
    attachments: [
      { id: 1, name: "Code.zip", size: 8.5 },
      { id: 2, name: "Documentation.pdf", size: 2.3 },
    ],
    status: "Tutor Assigned",
  },
  {
    id: 12,
    title: "Economics Assignment",
    subject: "Microeconomics",
    budget: 65,
    timeRemaining: "3:05:25",
    submissionDate: "2025.05.16",
    submissionTime: "2 pm",
    timeZone: "India Standard Time",
    remainingTime: "3:09:42:18",
    whatsappCountryCode: "+27",
    whatsappPhone: "1234567890",
    description: "Economics assignment on supply and demand principles.",
    attachments: [
      { id: 1, name: "Analysis.excel", size: 1.7 },
      { id: 2, name: "Report.docx", size: 1.4 },
    ],
    status: "In Progress",
  },
];

// Dummy data for completed assignments
const DUMMY_ASSESSMENTS_COMPLETED: Assessment[] = [
  {
    id: 1,
    title: "Maths Assignment",
    subject: "Mathematics",
    budget: 50,
    submissionDate: "2025.04.15",
    submissionTime: "11 am",
    timeZone: "India Standard Time",
    remainingTime: "0:00:00:00",
    whatsappCountryCode: "+94",
    whatsappPhone: "7712345678",
    description: "Completed mathematics assignment with all solutions.",
    attachments: [{ id: 1, name: "Solutions.pdf", size: 2.5 }],
    status: "Completed",
    payment: "Cleared",
  },
  {
    id: 2,
    title: "Maths Assignment",
    subject: "Algebra",
    budget: 50,
    submissionDate: "2025.04.12",
    submissionTime: "9 am",
    timeZone: "UTC",
    remainingTime: "0:00:00:00",
    whatsappCountryCode: "+1",
    whatsappPhone: "2025551234",
    description: "Algebra assignment that was not assigned to any tutor.",
    attachments: [],
    status: "No Tutor Found",
    payment: "Refunded",
  },
  {
    id: 3,
    title: "Maths Assignment",
    subject: "Geometry",
    budget: 50,
    submissionDate: "2025.04.10",
    submissionTime: "2 pm",
    timeZone: "Eastern Time",
    remainingTime: "0:00:00:00",
    whatsappCountryCode: "+44",
    whatsappPhone: "2071838750",
    description: "Geometry assignment that was cancelled by user.",
    attachments: [{ id: 1, name: "Partial_Work.docx", size: 1.2 }],
    status: "Cancelled",
    payment: "Refunded",
  },
  {
    id: 4,
    title: "Maths Assignment",
    subject: "Statistics",
    budget: 50,
    submissionDate: "2025.04.08",
    submissionTime: "4 pm",
    timeZone: "Pacific Time",
    remainingTime: "0:00:00:00",
    whatsappCountryCode: "+91",
    whatsappPhone: "9876543210",
    description: "Statistics assignment that expired before completion.",
    attachments: [],
    status: "Expired",
    payment: "Refunded",
  },
  {
    id: 5,
    title: "Physics Assignment",
    subject: "Mechanics",
    budget: 75,
    submissionDate: "2025.04.20",
    submissionTime: "10 am",
    timeZone: "India Standard Time",
    remainingTime: "0:00:00:00",
    whatsappCountryCode: "+92",
    whatsappPhone: "3001234567",
    description: "Physics assignment successfully completed.",
    attachments: [
      { id: 1, name: "Physics_Solution.pdf", size: 3.4 },
      { id: 2, name: "Calculations.xlsx", size: 0.6 },
    ],
    status: "Completed",
    payment: "Cleared",
  },
  {
    id: 6,
    title: "Chemistry Project",
    subject: "Organic Chemistry",
    budget: 100,
    submissionDate: "2025.04.18",
    submissionTime: "3 pm",
    timeZone: "Central European Time",
    remainingTime: "0:00:00:00",
    whatsappCountryCode: "+33",
    whatsappPhone: "123456789",
    description: "Chemistry project completed with detailed analysis.",
    attachments: [{ id: 1, name: "Chemistry_Report.pdf", size: 4.8 }],
    status: "Completed",
    payment: "Cleared",
  },
  {
    id: 7,
    title: "Biology Case Study",
    subject: "Genetics",
    budget: 60,
    submissionDate: "2025.04.05",
    submissionTime: "11 am",
    timeZone: "GMT",
    remainingTime: "0:00:00:00",
    whatsappCountryCode: "+86",
    whatsappPhone: "1234567890",
    description: "Biology case study that no tutor was willing to take.",
    attachments: [],
    status: "No Tutor Found",
    payment: "Refunded",
  },
  {
    id: 8,
    title: "English Essay",
    subject: "Literature",
    budget: 40,
    submissionDate: "2025.03.28",
    submissionTime: "1 pm",
    timeZone: "India Standard Time",
    remainingTime: "0:00:00:00",
    whatsappCountryCode: "+65",
    whatsappPhone: "90123456",
    description: "English essay assignment cancelled after partial submission.",
    attachments: [],
    status: "Cancelled",
    payment: "Refunded",
  },
  {
    id: 9,
    title: "History Report",
    subject: "World History",
    budget: 55,
    submissionDate: "2025.03.25",
    submissionTime: "8 am",
    timeZone: "Eastern Time",
    remainingTime: "0:00:00:00",
    whatsappCountryCode: "+27",
    whatsappPhone: "1234567890",
    description: "History report completed successfully.",
    attachments: [{ id: 1, name: "History_Report.pdf", size: 5.1 }],
    status: "Completed",
    payment: "Cleared",
  },
  {
    id: 10,
    title: "Geography Project",
    subject: "Physical Geography",
    budget: 70,
    submissionDate: "2025.03.30",
    submissionTime: "4 pm",
    timeZone: "Pacific Time",
    remainingTime: "0:00:00:00",
    whatsappCountryCode: "+61",
    whatsappPhone: "412345678",
    description: "Geography project that expired without completion.",
    attachments: [],
    status: "Expired",
    payment: "Refunded",
  },
  {
    id: 11,
    title: "Computer Science",
    subject: "Programming",
    budget: 90,
    submissionDate: "2025.04.22",
    submissionTime: "6 pm",
    timeZone: "India Standard Time",
    remainingTime: "0:00:00:00",
    whatsappCountryCode: "+44",
    whatsappPhone: "2071838750",
    description: "Computer science project successfully completed.",
    attachments: [
      { id: 1, name: "Code.zip", size: 7.9 },
      { id: 2, name: "Documentation.pdf", size: 2.1 },
    ],
    status: "Completed",
    payment: "Cleared",
  },
  {
    id: 12,
    title: "Economics Assignment",
    subject: "Microeconomics",
    budget: 65,
    submissionDate: "2025.04.02",
    submissionTime: "2 pm",
    timeZone: "UTC",
    remainingTime: "0:00:00:00",
    whatsappCountryCode: "+1",
    whatsappPhone: "2129876543",
    description: "Economics assignment completed with analysis.",
    attachments: [{ id: 1, name: "Analysis.excel", size: 1.6 }],
    status: "Completed",
    payment: "Cleared",
  },
];

const ITEMS_PER_PAGE = 10;

export default function AssessmentList({
  tabType,
  onDetailsViewChange,
}: AssessmentListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // Notify parent when details view changes
  const handleSelectAssessment = (id: number | null) => {
    setSelectedId(id);
    onDetailsViewChange?.(id !== null);
  };

  // Select data based on tab type
  const assessmentData =
    tabType === "active" ? DUMMY_ASSESSMENTS : DUMMY_ASSESSMENTS_COMPLETED;

  // Filter data based on search query
  const filteredAssessments = useMemo(() => {
    return assessmentData.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery, assessmentData]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredAssessments.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedAssessments = filteredAssessments.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  // Get selected assessment for details view
  const selectedAssessment = selectedId
    ? assessmentData.find((item) => item.id === selectedId)
    : null;

  // Reset to page 1 when search changes
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  // Status badge color for Active tab
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Tutor Assigned":
        return "bg-blue-100 text-blue-700 border border-blue-300";
      case "Under Review":
        return "bg-yellow-100 text-yellow-700 border border-yellow-300";
      case "In Progress":
        return "bg-blue-100 text-blue-700 border border-blue-300";
      default:
        return "bg-gray-100 text-gray-700 border border-gray-300";
    }
  };

  // Status badge color for Completed tab
  const getCompletedStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700 border border-green-300";
      case "No Tutor Found":
        return "bg-red-100 text-red-700 border border-red-300";
      case "Cancelled":
        return "bg-red-100 text-red-700 border border-red-300";
      case "Expired":
        return "bg-red-100 text-red-700 border border-red-300";
      default:
        return "bg-gray-100 text-gray-700 border border-gray-300";
    }
  };

  // Payment badge color
  const getPaymentColor = (payment: string) => {
    switch (payment) {
      case "Cleared":
        return "bg-green-100 text-green-700 border border-green-300";
      case "Refunded":
        return "bg-blue-100 text-blue-700 border border-blue-300";
      default:
        return "bg-gray-100 text-gray-700 border border-gray-300";
    }
  };

  // If showing details, return details view
  if (selectedAssessment && selectedId) {
    return (
      <AssignmentDetails
        id={selectedAssessment.id}
        title={selectedAssessment.title}
        subject={selectedAssessment.subject}
        submissionDate={selectedAssessment.submissionDate}
        submissionTime={selectedAssessment.submissionTime}
        timeZone={selectedAssessment.timeZone}
        remainingTime={selectedAssessment.remainingTime}
        whatsappCountryCode={selectedAssessment.whatsappCountryCode}
        whatsappPhone={selectedAssessment.whatsappPhone}
        budget={selectedAssessment.budget}
        description={selectedAssessment.description}
        attachments={selectedAssessment.attachments}
        onBack={() => handleSelectAssessment(null)}
      />
    );
  }

  // Show empty state if no data
  if (assessmentData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-4xl mb-4">📋</div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          No posted assignments
        </h3>
        <p className="text-gray-600 text-center max-w-sm">
          You haven&apos;t posted any assignments yet. Click &quot;Post a
          assignment&quot; to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Search Bar and Pagination Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center md:justify-end gap-4 mb-6">
        {/* Search Input */}
        <div className="w-full md:w-80">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
            />
            <svg
              className="absolute right-3 top-2.5 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">
                Title
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">
                Budget ($)
              </th>
              {tabType === "active" ? (
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">
                  Time remaining
                </th>
              ) : (
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">
                  Status
                </th>
              )}
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">
                {tabType === "active" ? "Status" : "Payment"}
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedAssessments.map((assessment) => (
              <tr
                key={assessment.id}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => handleSelectAssessment(assessment.id)}
              >
                <td className="px-6 py-4 text-sm text-gray-700">
                  {assessment.title}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {assessment.budget}
                </td>
                {tabType === "active" ? (
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {assessment.timeRemaining}
                  </td>
                ) : (
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getCompletedStatusColor(
                        assessment.status,
                      )}`}
                    >
                      {assessment.status}
                    </span>
                  </td>
                )}
                <td className="px-6 py-4">
                  {tabType === "active" ? (
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        assessment.status,
                      )}`}
                    >
                      {assessment.status}
                    </span>
                  ) : (
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getPaymentColor(
                        assessment.payment || "",
                      )}`}
                    >
                      {assessment.payment}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {paginatedAssessments.map((assessment) => (
          <div
            key={assessment.id}
            className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleSelectAssessment(assessment.id)}
          >
            <div className="mb-3">
              <h3 className="font-semibold text-gray-800 text-sm">
                {assessment.title}
              </h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Budget:</span>
                <span className="font-semibold text-gray-800">
                  ${assessment.budget}
                </span>
              </div>
              {tabType === "active" ? (
                <>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time remaining:</span>
                    <span className="font-semibold text-gray-800">
                      {assessment.timeRemaining}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Status:</span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        assessment.status,
                      )}`}
                    >
                      {assessment.status}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Status:</span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getCompletedStatusColor(
                        assessment.status,
                      )}`}
                    >
                      {assessment.status}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Payment:</span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getPaymentColor(
                        assessment.payment || "",
                      )}`}
                    >
                      {assessment.payment}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {filteredAssessments.length > 0 && (
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-6 pt-6 border-t border-gray-200">
          {/* Records Info */}
          <div className="text-sm text-gray-600">
            Showing {startIndex + 1} of {filteredAssessments.length} records
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center gap-2">
            {/* Previous Button */}
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              ← Prev
            </button>

            {/* Page Numbers */}
            <div className="flex gap-1">
              {Array.from({ length: Math.min(totalPages, 4) }).map(
                (_, index) => {
                  const pageNum = index + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        currentPage === pageNum
                          ? "bg-blue-600 text-white border border-blue-600"
                          : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                },
              )}
              {totalPages > 4 && (
                <span className="px-1 py-2 text-gray-700">...</span>
              )}
            </div>

            {/* Next Button */}
            <button
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next →
            </button>

            {/* Items Per Page Selector */}
            <select
              value={ITEMS_PER_PAGE}
              className="px-3 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={10}>10/Page</option>
              <option value={25}>25/Page</option>
              <option value={50}>50/Page</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
