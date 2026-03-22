import { useState } from "react";
import Image from "next/image";
import dashWebImg from "../../../public/images/dashboard/dash_web.jpg";
import dashMobileImg from "../../../public/images/dashboard/dash_mobile.jpg";
import PostAssessment from "../../components/PostAssessment";
import AssessmentList from "../../components/AssessmentList";

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState<"active" | "completed">("active");
  const [showPostAssessment, setShowPostAssessment] = useState(false);
  const [showDetailsView, setShowDetailsView] = useState(false);

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
              alt="Dashboard Hero"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Mobile Background Image */}
          <div className="md:hidden relative w-full h-full">
            <Image
              src={dashMobileImg}
              alt="Dashboard Hero Mobile"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Overlay gradient for better text readability */}
          <div className="absolute inset-0 bg-linear-to-b from-transparent to-white/20"></div>
        </div>

        {/* Floating Content Section */}
        <div className="mx-auto px-4 md:px-6 max-w-7xl relative -mt-24 md:-mt-32 lg:-mt-40 z-10">
          {/* Dashboard Container - Floating Card */}
          <div className="bg-white rounded-lg shadow-lg border border-blue-300 overflow-hidden">
            {/* Tab Navigation - Hidden when showing PostAssessment or Details View */}
            {!showPostAssessment && !showDetailsView && (
              <div className="flex items-center justify-start border-b py-1 border-gray-200 md:px-6 px-1">
                {/* Tab Buttons - Left Side */}
                <div className="flex">
                  <button
                    onClick={() => setActiveTab("active")}
                    className={`px-2 md:px-6 py-2 font-medium transition-all duration-300 ${
                      activeTab === "active"
                        ? "text-blue-600 border-b-2 border-blue-600"
                        : "text-gray-600 hover:text-gray-800"
                    }`}
                  >
                    <span className="text-sm md:text-base">Active</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("completed")}
                    className={`px-2 md:px-6 py-2 font-medium transition-all duration-300 ${
                      activeTab === "completed"
                        ? "text-blue-600 border-b-2 border-blue-600"
                        : "text-gray-600 hover:text-gray-800"
                    }`}
                  >
                    <span className="text-sm md:text-base">Completed</span>
                  </button>
                </div>

                {/* Spacer */}
                <div className="flex-1"></div>

                {/* Post Assignment Button - Right Side */}
                <button
                  onClick={() => setShowPostAssessment(true)}
                  className="px-4 md:px-6 py-2 md:py-3 bg-blue-600 text-white font-semibold rounded-lg
                   transition-all duration-300 shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 
                   hover:scale-105 active:scale-95 text-xs md:text-sm whitespace-nowrap"
                >
                  Post a assignment
                </button>
              </div>
            )}

            {/* Content Area */}
            <div className="p-6 md:p-12 min-h-96">
              {showPostAssessment ? (
                <PostAssessment onClose={() => setShowPostAssessment(false)} />
              ) : (
                <AssessmentList
                  tabType={activeTab}
                  onDetailsViewChange={setShowDetailsView}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Additional spacing for footer */}
      <div className="h-12"></div>
    </main>
  );
}
