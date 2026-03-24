import { useState } from "react";
import { timeZones } from "../enum/timezone";

interface PostAssessmentProps {
  onClose?: () => void;
}

export default function PostAssessment({ onClose }: PostAssessmentProps) {
  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    submissionDate: "",
    submissionTime: "",
    timeZone: "",
    remainingDays: "",
    remainingHours: "",
    whatsappCountryCode: "+92",
    whatsappPhone: "",
    budget: "",
    description: "",
  });

  const [attachments, setAttachments] = useState<File[]>([]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setAttachments(Array.from(files));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    console.log("Attachments:", attachments);
    // Handle submission here
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8">
        {onClose && (
          <button
            onClick={onClose}
            className="flex items-center text-blue-600 hover:text-blue-800 mb-4 font-medium text-sm md:text-base"
          >
            ← Back
          </button>
        )}
      </div>

      {/* Form Container */}
      <form onSubmit={handleSubmit}>
        {/* BASIC INFO SECTION */}
        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Side - Label and Description */}
            <div className="flex flex-col justify-start">
              <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
                Basic info
              </h2>
              <p className="text-xs md:text-sm text-gray-500">
                Title & Subject of the assignment
              </p>
            </div>

            {/* Right Side - Input Fields */}
            <div className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter assignment title"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                  required
                />
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Enter assignment subject"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                  required
                />
              </div>
            </div>
          </div>
          <div className="border-b border-gray-200 mt-8"></div>
        </div>

        {/* TIME & DATE SECTION */}
        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Side - Label and Description */}
            <div className="flex flex-col justify-start">
              <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
                Time & Date
              </h2>
              <p className="text-xs md:text-sm text-gray-500">
                Assignment deadline
              </p>
            </div>

            {/* Right Side - Input Fields */}
            <div className="space-y-4">
              {/* Submission Date and Time - Two Columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Submission date
                  </label>
                  <input
                    type="date"
                    name="submissionDate"
                    value={formData.submissionDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Submission time
                  </label>
                  <input
                    type="time"
                    name="submissionTime"
                    value={formData.submissionTime}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Time Zone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time zone
                </label>
                <select
                  name="timeZone"
                  value={formData.timeZone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                  required
                >
                  <option value="">Select a time zone</option>
                  {timeZones.map((tz) => (
                    <option key={tz} value={tz}>
                      {tz}
                    </option>
                  ))}
                </select>
              </div>

              {/* Remaining Time (Optional) */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Remaining days (optional)
                  </label>
                  <input
                    type="number"
                    name="remainingDays"
                    value={formData.remainingDays}
                    onChange={handleInputChange}
                    placeholder="Enter days"
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Remaining hours (optional)
                  </label>
                  <input
                    type="number"
                    name="remainingHours"
                    value={formData.remainingHours}
                    onChange={handleInputChange}
                    placeholder="Enter hours"
                    min="0"
                    max="23"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="border-b border-gray-200 mt-8"></div>
        </div>

        {/* CONTACT & BUDGET SECTION */}
        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Side - Label and Description */}
            <div className="flex flex-col justify-start">
              <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
                Contact & Budget
              </h2>
              <p className="text-xs md:text-sm text-gray-500">
                Your WhatsApp number & budget
              </p>
            </div>

            {/* Right Side - Input Fields */}
            <div className="space-y-4">
              {/* WhatsApp Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  WhatsApp Number
                </label>
                <div className="flex gap-2">
                  {/* Country Code Input - Small */}
                  <input
                    type="text"
                    name="whatsappCountryCode"
                    value={formData.whatsappCountryCode}
                    onChange={handleInputChange}
                    placeholder="+92"
                    className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 text-sm"
                    required
                  />
                  {/* Phone Number Input - Large */}
                  <input
                    type="tel"
                    name="whatsappPhone"
                    value={formData.whatsappPhone}
                    onChange={handleInputChange}
                    placeholder="3001234567"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                    required
                  />
                </div>
              </div>

              {/* Assignment Budget */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Assignment budget($)
                </label>
                <input
                  type="text"
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  placeholder="Enter assignment budget"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                  required
                />
              </div>
            </div>
          </div>
          <div className="border-b border-gray-200 mt-8"></div>
        </div>

        {/* OTHER SECTION */}
        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Side - Label and Description */}
            <div className="flex flex-col justify-start">
              <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
                Other
              </h2>
              <p className="text-xs md:text-sm text-gray-500">
                Assignment description & attachments
              </p>
            </div>

            {/* Right Side - Input Fields */}
            <div className="space-y-4">
              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter assignment description"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 min-h-32 resize-none"
                ></textarea>
              </div>

              {/* Attachment */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Attachment(Optional)
                </label>
                <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 md:p-8 text-center hover:border-blue-500 transition-colors cursor-pointer bg-gray-50 hover:bg-blue-50">
                  <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    accept="*/*"
                  />
                  <div className="flex flex-col items-center justify-center">
                    <div className="text-3xl mb-2">📎</div>
                    <p className="text-gray-700 font-medium text-sm md:text-base">
                      Select file or drag & drop your file here
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      All formats support, maximum size is 5 mb
                    </p>
                  </div>
                </div>

                {/* Show selected files */}
                {attachments.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {attachments.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 p-2 bg-gray-100 rounded text-sm"
                      >
                        <span>📄</span>
                        <span className="text-gray-700">{file.name}</span>
                        <span className="text-xs text-gray-500">
                          ({(file.size / 1024).toFixed(2)} KB)
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 pt-8 border-t border-gray-200">
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg
               transition-all duration-300 hover:bg-gray-50 active:scale-95"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg
             transition-all duration-300 shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 
             hover:scale-105 active:scale-95"
          >
            Post assignment
          </button>
        </div>
      </form>
    </div>
  );
}
