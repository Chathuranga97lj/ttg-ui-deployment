import { useState } from "react";

interface Attachment {
  id: number;
  name: string;
  size: number;
}

interface AssignmentDetailsProps {
  id: number;
  title: string;
  subject: string;
  submissionDate: string;
  submissionTime: string;
  timeZone: string;
  remainingTime: string;
  whatsappCountryCode: string;
  whatsappPhone: string;
  budget: number;
  description: string;
  attachments: Attachment[];
  onBack: () => void;
}

export default function AssignmentDetails({
  id,
  title,
  subject,
  submissionDate,
  submissionTime,
  timeZone,
  remainingTime,
  whatsappCountryCode,
  whatsappPhone,
  budget,
  description,
  attachments,
  onBack,
}: AssignmentDetailsProps) {
  return (
    <div className="w-full">
      {/* Header with Back button */}
      <button
        onClick={onBack}
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
        {/* Basic Info Section */}
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Title
              </label>
              <p className="text-gray-600">{title}</p>
            </div>

            {/* Subject */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Subject
              </label>
              <p className="text-gray-600">{subject}</p>
            </div>
          </div>
          <div className="border-b border-gray-200 mt-6"></div>
        </div>

        {/* Time & Date Section */}
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Submission Date */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Submission date
                </label>
                <p className="text-gray-600">{submissionDate}</p>
              </div>

              {/* Time Zone */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Time zone
                </label>
                <p className="text-gray-600">{timeZone}</p>
              </div>

              {/* Remaining Time */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Remaining time
                </label>
                <p className="text-gray-600">{remainingTime}</p>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Submission Time */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Submission time
                </label>
                <p className="text-gray-600">{submissionTime}</p>
              </div>
            </div>
          </div>
          <div className="border-b border-gray-200 mt-6"></div>
        </div>

        {/* Contact & Budget Section */}
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* WhatsApp Number */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                WhatsApp number
              </label>
              <p className="text-gray-600">
                {whatsappCountryCode}
                {whatsappPhone}
              </p>
            </div>

            {/* Budget */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Budget($)
              </label>
              <p className="text-gray-600">{budget}</p>
            </div>
          </div>
          <div className="border-b border-gray-200 mt-6"></div>
        </div>

        {/* Description Section */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Description
          </label>
          <p className="text-gray-600 leading-relaxed">{description}</p>
          <div className="border-b border-gray-200 mt-6"></div>
        </div>

        {/* Attachments Section */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-4">
            Attachments
          </label>

          {attachments.length > 0 ? (
            <div className="space-y-3">
              {attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">📄</span>
                    <div>
                      <p className="text-gray-700 font-medium text-sm">
                        {attachment.name}
                      </p>
                      <p className="text-gray-500 text-xs">
                        {(attachment.size / 1024).toFixed(2)} MB
                      </p>
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
          ) : (
            <p className="text-gray-500 text-sm">No attachments</p>
          )}
        </div>
      </div>
    </div>
  );
}
