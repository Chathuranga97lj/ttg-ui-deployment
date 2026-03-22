import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import dashWebImg from "../../../public/images/dashboard/dash_web.jpg";
import dashMobileImg from "../../../public/images/dashboard/dash_mobile.jpg";
import { TUTORING_AREAS } from "../../../src/enum/tutoring_areas";

type Tab = "profile" | "security";

interface TutoringAreaPair {
  mainArea: string;
  subject: string;
}

interface ProfileData {
  fullName: string;
  username: string;
  email: string;
  phone: string;
  countryCode: string;
  profileImage: string;
  tutoringAreas: TutoringAreaPair[];
  aboutMe: string;
}

export default function Settings() {
  const router = useRouter();

  // Detect user type from query parameter
  const userType = React.useMemo(() => {
    // Get from URL query parameter
    const queryUserType = router.query.userType;
    if (queryUserType === "student" || queryUserType === "tutor") {
      return queryUserType as "student" | "tutor";
    }
    // Fallback to student
    return "student";
  }, [router.query.userType]) as "student" | "tutor";

  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Password visibility states
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);

  // 2FA verification states
  const [show2FAModal, setShow2FAModal] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [is2FASuccess, setIs2FASuccess] = useState(false);
  const [canResend, setCanResend] = useState(false);
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Initial profile data
  const [profileData, setProfileData] = useState<ProfileData>({
    fullName: "Chathuranga Lankamal",
    username: "chathuranga1234",
    email: "chathurangalakmal@gmail.com",
    phone: "7712345678",
    countryCode: "+94",
    profileImage: "",
    tutoringAreas: [
      { mainArea: "Business", subject: "Accounting" },
      { mainArea: "Information Technology", subject: "Python" },
    ],
    aboutMe:
      "This is the short description about my self. This is the short description about my self. This is the short description about my self. This is the short description about my self. This is the short description about my self. This is the short description about my self.",
  });

  const [editData, setEditData] = useState<ProfileData>(profileData);

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageData = event.target?.result as string;
        setProfileData({ ...profileData, profileImage: imageData });
        setEditData({ ...editData, profileImage: imageData });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditClick = () => {
    if (isEditing) {
      // Save changes
      setProfileData(editData);
      setIsEditing(false);
    } else {
      // Enter edit mode
      setIsEditing(true);
    }
  };

  const handleCancel = () => {
    setEditData(profileData);
    setIsEditing(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleTutoringAreaChange = (
    index: number,
    field: "mainArea" | "subject",
    value: string,
  ) => {
    const newAreas = [...editData.tutoringAreas];
    newAreas[index] = { ...newAreas[index], [field]: value };
    setEditData({ ...editData, tutoringAreas: newAreas });
  };

  const getSubjectsByMainArea = (mainArea: string) => {
    const area = TUTORING_AREAS.find((a) => a.name === mainArea);
    return area ? area.subjects : [];
  };

  // 2FA handlers
  const handle2FAToggle = () => {
    if (!is2FAEnabled) {
      // Enable 2FA - show modal
      setShow2FAModal(true);
      setOtp(["", "", "", ""]);
      setTimeLeft(60);
      setIs2FASuccess(false);
      setCanResend(false);
    } else {
      // Disable 2FA
      setIs2FAEnabled(false);
    }
  };

  // Countdown timer effect
  useEffect(() => {
    if (!show2FAModal || is2FASuccess) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [show2FAModal, is2FASuccess]);

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(0, 1);
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleResendOtp = () => {
    setOtp(["", "", "", ""]);
    setTimeLeft(60);
    setCanResend(false);
    otpInputRefs.current[0]?.focus();
  };

  const handleVerifyOtp = () => {
    // Simulate verification (in real app, validate against backend)
    setIs2FASuccess(true);
  };

  const handleBackToWork = () => {
    setShow2FAModal(false);
    setIs2FASuccess(false);
    setIs2FAEnabled(true);
    // Navigate back to appropriate dashboard based on user type
    if (userType === "student") {
      router.push("/auth/StudentDashboard");
    } else {
      router.push("/auth/TutorDashboard");
    }
  };

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
              alt="Settings Hero"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Mobile Background Image */}
          <div className="md:hidden relative w-full h-full">
            <Image
              src={dashMobileImg}
              alt="Settings Hero Mobile"
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
          {/* Settings Container - Floating Card */}
          <div className="bg-white rounded-lg shadow-lg border border-blue-300 overflow-hidden mb-10">
            {/* Header */}
            <div className="border-b border-gray-200">
              <div className="px-4 md:px-12 py-4 md:py-6">
                {/* Only show back button when not in 2FA flow, or show the back button for 2FA modal */}
                {!show2FAModal && (
                  <button
                    onClick={() => router.back()}
                    className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors mb-6"
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
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                    <span>Back</span>
                  </button>
                )}
                {show2FAModal && !is2FASuccess && (
                  <button
                    onClick={() => setShow2FAModal(false)}
                    className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors mb-6"
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
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                    <span>Back</span>
                  </button>
                )}

                {/* Tabs - only show when not in 2FA flow */}
                {!show2FAModal && (
                  <div className="flex space-x-8 border-b border-gray-200 -mb-px">
                    <button
                      onClick={() => setActiveTab("profile")}
                      className={`px-1 py-2 border-b-2 font-medium text-sm transition-colors ${
                        activeTab === "profile"
                          ? "border-blue-600 text-blue-600"
                          : "border-transparent text-gray-700 hover:text-gray-900 hover:border-gray-300"
                      }`}
                    >
                      Profile
                    </button>
                    <button
                      onClick={() => setActiveTab("security")}
                      className={`px-1 py-2 border-b-2 font-medium text-sm transition-colors ${
                        activeTab === "security"
                          ? "border-blue-600 text-blue-600"
                          : "border-transparent text-gray-700 hover:text-gray-900 hover:border-gray-300"
                      }`}
                    >
                      Security
                    </button>
                  </div>
                )}
              </div>

              {/* Content Area */}
              <div className="p-6 md:p-12 min-h-96">
                {/* 2FA Verification Page */}
                {show2FAModal && !is2FASuccess && (
                  <div className="max-w-md mx-auto py-12">
                    <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
                      Verify its you
                    </h2>
                    <p className="text-gray-600 text-sm text-center mb-12">
                      We sent you an email with a 4-digit code to your inbox
                      <br />
                      Please check your email and enter it here
                    </p>

                    {/* OTP Input Fields */}
                    <div className="flex justify-center gap-4 mb-12">
                      {otp.map((digit, index) => (
                        <input
                          key={index}
                          ref={(el) => {
                            otpInputRefs.current[index] = el;
                          }}
                          type="text"
                          maxLength={1}
                          value={digit}
                          onChange={(e) =>
                            handleOtpChange(index, e.target.value)
                          }
                          onKeyDown={(e) => handleOtpKeyDown(index, e)}
                          placeholder=""
                          className="w-14 h-14 text-center text-2xl border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none transition-colors"
                        />
                      ))}
                    </div>

                    {/* Timer and Resend */}
                    <div className="text-center mb-12">
                      <p className="text-sm text-gray-600 mb-2">
                        Request a new code after{" "}
                        <span className="font-semibold text-blue-600">
                          {Math.floor(timeLeft / 60)}.
                          {String(timeLeft % 60).padStart(2, "0")} mins
                        </span>
                      </p>
                      {canResend ? (
                        <button
                          onClick={handleResendOtp}
                          className="text-blue-600 hover:text-blue-700 font-semibold"
                        >
                          Resend
                        </button>
                      ) : (
                        <p className="text-gray-500 text-sm">
                          Didn&apos;t receive a code?{" "}
                          <span className="text-gray-400">Resend</span>
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      onClick={handleVerifyOtp}
                      disabled={otp.some((digit) => !digit)}
                      className="w-full px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
                    >
                      Verify
                    </button>
                  </div>
                )}

                {/* 2FA Success Page */}
                {show2FAModal && is2FASuccess && (
                  <div className="max-w-md mx-auto py-12 text-center">
                    {/* Success Icon */}
                    <div className="flex justify-center mb-6">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                        <svg
                          className="w-8 h-8 text-green-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Success Title */}
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      2FA enable successful
                    </h2>
                    <p className="text-gray-600 text-sm mb-12">
                      You enable 2FA successfully, you can now go back to your
                      work
                    </p>

                    {/* Back to Work Button */}
                    <button
                      onClick={handleBackToWork}
                      className="w-full px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      Back to work
                    </button>
                  </div>
                )}

                {/* Profile Tab */}
                {!show2FAModal && activeTab === "profile" && (
                  <div>
                    <div className="mb-8">
                      <h1 className="text-2xl font-bold text-gray-900">
                        Profile
                      </h1>
                      <p className="text-gray-600 text-sm mt-1">
                        View & edit profile details
                      </p>
                    </div>

                    {/* ======== STUDENT PROFILE VIEW ======== */}
                    {userType === "student" && (
                      <>
                        {/* STUDENT VIEW MODE */}
                        {!isEditing && (
                          <div className="space-y-8">
                            {/* Photo and Basic Info */}
                            <div className="flex flex-col md:flex-row gap-8">
                              {/* Photo Section */}
                              <div className="shrink-0">
                                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-linear-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-3xl md:text-5xl font-semibold overflow-hidden">
                                  {profileData.profileImage ? (
                                    <Image
                                      src={profileData.profileImage}
                                      alt="Profile"
                                      fill
                                      className="object-cover"
                                    />
                                  ) : (
                                    profileData.fullName
                                      .substring(0, 2)
                                      .toUpperCase()
                                  )}
                                </div>
                              </div>

                              {/* Basic Info */}
                              <div className="flex-1 space-y-6">
                                <div>
                                  <p className="text-xs text-gray-500 font-medium">
                                    Full name
                                  </p>
                                  <p className="text-gray-900">
                                    {profileData.fullName}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500 font-medium">
                                    Username
                                  </p>
                                  <p className="text-gray-900">
                                    {profileData.username}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500 font-medium">
                                    Email
                                  </p>
                                  <p className="text-gray-900">
                                    {profileData.email}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500 font-medium">
                                    Number
                                  </p>
                                  <p className="text-gray-900">
                                    {profileData.countryCode}{" "}
                                    {profileData.phone}
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* Edit Button */}
                            <div className="flex justify-end">
                              <button
                                onClick={handleEditClick}
                                className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                              >
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
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                  />
                                </svg>
                                <span>Edit</span>
                              </button>
                            </div>
                          </div>
                        )}

                        {/* STUDENT EDIT MODE */}
                        {isEditing && (
                          <div className="space-y-8 max-w-2xl">
                            {/* Profile Photo Section */}
                            <div>
                              <div className="flex flex-col mb-4">
                                <p className="text-sm font-semibold text-gray-900">
                                  Profile photo
                                </p>
                                <p className="text-xs text-gray-500">
                                  Update your profile picture
                                </p>
                              </div>
                              <div className="flex items-center gap-6">
                                {/* Photo Display */}
                                <div className="w-20 h-20 rounded-full bg-linear-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xl font-semibold overflow-hidden shrink-0">
                                  {editData.profileImage ? (
                                    <Image
                                      src={editData.profileImage}
                                      alt="Profile"
                                      fill
                                      className="object-cover"
                                    />
                                  ) : (
                                    editData.fullName
                                      .substring(0, 2)
                                      .toUpperCase()
                                  )}
                                </div>
                                {/* Upload Button */}
                                <div>
                                  <button
                                    type="button"
                                    onClick={handlePhotoClick}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                                  >
                                    Upload photo
                                  </button>
                                  <p className="text-xs text-gray-500 mt-2">
                                    JPG, PNG or GIF (max 5MB)
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* Basic Info Section */}
                            <div>
                              <div className="flex flex-col mb-4">
                                <p className="text-sm font-semibold text-gray-900">
                                  Basic info
                                </p>
                                <p className="text-xs text-gray-500">
                                  View & edit user name
                                </p>
                              </div>
                              <div className="space-y-4">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Full name
                                    <span className="text-red-500">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    name="fullName"
                                    value={editData.fullName}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter full name"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Username
                                    <span className="text-red-500">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    name="username"
                                    value={editData.username}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter username"
                                  />
                                </div>
                              </div>
                            </div>

                            {/* Contact Info Section */}
                            <div className="border-t border-gray-200 pt-8">
                              <div className="flex flex-col mb-4">
                                <p className="text-sm font-semibold text-gray-900">
                                  Contact info
                                </p>
                                <p className="text-xs text-gray-500">
                                  View & edit contact info
                                </p>
                              </div>
                              <div className="space-y-4">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email<span className="text-red-500">*</span>
                                  </label>
                                  <input
                                    type="email"
                                    name="email"
                                    value={editData.email}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter email"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Mobile Number
                                    <span className="text-red-500">*</span>
                                  </label>
                                  <div className="flex gap-2">
                                    <select
                                      value={editData.countryCode}
                                      onChange={(e) =>
                                        setEditData({
                                          ...editData,
                                          countryCode: e.target.value,
                                        })
                                      }
                                      className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                      <option>+94</option>
                                      <option>+1</option>
                                      <option>+44</option>
                                      <option>+91</option>
                                    </select>
                                    <input
                                      type="text"
                                      name="phone"
                                      value={editData.phone}
                                      onChange={handleInputChange}
                                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                      placeholder="Enter phone number"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Save and Cancel Buttons */}
                            <div className="flex gap-3 justify-end border-t border-gray-200 pt-8">
                              <button
                                onClick={handleCancel}
                                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={handleEditClick}
                                className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                              >
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
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                                <span>Save</span>
                              </button>
                            </div>
                          </div>
                        )}
                      </>
                    )}

                    {/* ======== TUTOR PROFILE VIEW ======== */}
                    {userType === "tutor" && (
                      <>
                        {/* TUTOR VIEW MODE */}
                        {!isEditing && (
                          <div className="space-y-8">
                            {/* Photo and Basic Info */}
                            <div className="flex flex-col md:flex-row gap-8">
                              {/* Photo Section */}
                              <div className="shrink-0">
                                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-linear-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-3xl md:text-5xl font-semibold overflow-hidden">
                                  {profileData.profileImage ? (
                                    <Image
                                      src={profileData.profileImage}
                                      alt="Profile"
                                      fill
                                      className="object-cover"
                                    />
                                  ) : (
                                    profileData.fullName
                                      .substring(0, 2)
                                      .toUpperCase()
                                  )}
                                </div>
                                <p className="text-center text-sm text-gray-600 mt-3">
                                  Completed assignments 23
                                </p>
                                <button className="w-full mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                                  Share profile
                                </button>
                              </div>

                              {/* Basic Info */}
                              <div className="flex-1 space-y-6">
                                <div>
                                  <p className="text-xs text-gray-500 font-medium">
                                    Full name
                                  </p>
                                  <p className="text-gray-900">
                                    {profileData.fullName}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500 font-medium">
                                    Username
                                  </p>
                                  <p className="text-gray-900">
                                    {profileData.username}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500 font-medium">
                                    Email
                                  </p>
                                  <p className="text-gray-900">
                                    {profileData.email}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500 font-medium">
                                    Number
                                  </p>
                                  <p className="text-gray-900">
                                    {profileData.countryCode}{" "}
                                    {profileData.phone}
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* Main Tutoring Areas */}
                            <div className="border-t border-gray-200 pt-8">
                              <p className="text-sm font-semibold text-gray-900 mb-4">
                                Main tutoring areas
                              </p>
                              <div className="space-y-3">
                                {profileData.tutoringAreas.map(
                                  (area, index) => (
                                    <div key={index} className="flex gap-3">
                                      <div className="flex-1">
                                        <p className="text-xs text-gray-500 font-medium">
                                          Main area
                                        </p>
                                        <p className="text-gray-900 text-sm">
                                          {area.mainArea}
                                        </p>
                                      </div>
                                      <div className="flex-1">
                                        <p className="text-xs text-gray-500 font-medium">
                                          Subject
                                        </p>
                                        <p className="text-gray-900 text-sm">
                                          {area.subject}
                                        </p>
                                      </div>
                                    </div>
                                  ),
                                )}
                              </div>
                            </div>

                            {/* About Me */}
                            <div className="border-t border-gray-200 pt-8">
                              <p className="text-sm font-semibold text-gray-900 mb-2">
                                About me
                              </p>
                              <p className="text-gray-700 text-sm leading-relaxed">
                                {profileData.aboutMe}
                              </p>
                            </div>

                            {/* Edit Button */}
                            <div className="flex justify-end">
                              <button
                                onClick={handleEditClick}
                                className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                              >
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
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                  />
                                </svg>
                                <span>Edit</span>
                              </button>
                            </div>
                          </div>
                        )}

                        {/* TUTOR EDIT MODE */}
                        {isEditing && (
                          <div className="space-y-8 max-w-2xl">
                            {/* Profile Photo Section */}
                            <div>
                              <div className="flex flex-col mb-4">
                                <p className="text-sm font-semibold text-gray-900">
                                  Profile photo
                                </p>
                                <p className="text-xs text-gray-500">
                                  Update your profile picture
                                </p>
                              </div>
                              <div className="flex items-center gap-6">
                                {/* Photo Display */}
                                <div className="w-20 h-20 rounded-full bg-linear-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xl font-semibold overflow-hidden shrink-0">
                                  {editData.profileImage ? (
                                    <Image
                                      src={editData.profileImage}
                                      alt="Profile"
                                      fill
                                      className="object-cover"
                                    />
                                  ) : (
                                    editData.fullName
                                      .substring(0, 2)
                                      .toUpperCase()
                                  )}
                                </div>
                                {/* Upload Button */}
                                <div>
                                  <button
                                    type="button"
                                    onClick={handlePhotoClick}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                                  >
                                    Upload photo
                                  </button>
                                  <p className="text-xs text-gray-500 mt-2">
                                    JPG, PNG or GIF (max 5MB)
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* Basic Info Section */}
                            <div>
                              <div className="flex flex-col mb-4">
                                <p className="text-sm font-semibold text-gray-900">
                                  Basic info
                                </p>
                                <p className="text-xs text-gray-500">
                                  View & edit user name
                                </p>
                              </div>
                              <div className="space-y-4">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Full name
                                    <span className="text-red-500">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    name="fullName"
                                    value={editData.fullName}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter full name"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Username
                                    <span className="text-red-500">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    name="username"
                                    value={editData.username}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter username"
                                  />
                                </div>
                              </div>
                            </div>

                            {/* Contact Info Section */}
                            <div className="border-t border-gray-200 pt-8">
                              <div className="flex flex-col mb-4">
                                <p className="text-sm font-semibold text-gray-900">
                                  Contact info
                                </p>
                                <p className="text-xs text-gray-500">
                                  View & edit contact info
                                </p>
                              </div>
                              <div className="space-y-4">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email<span className="text-red-500">*</span>
                                  </label>
                                  <input
                                    type="email"
                                    name="email"
                                    value={editData.email}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter email"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Mobile Number
                                    <span className="text-red-500">*</span>
                                  </label>
                                  <div className="flex gap-2">
                                    <select
                                      value={editData.countryCode}
                                      onChange={(e) =>
                                        setEditData({
                                          ...editData,
                                          countryCode: e.target.value,
                                        })
                                      }
                                      className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                      <option>+94</option>
                                      <option>+1</option>
                                      <option>+44</option>
                                      <option>+91</option>
                                    </select>
                                    <input
                                      type="text"
                                      name="phone"
                                      value={editData.phone}
                                      onChange={handleInputChange}
                                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                      placeholder="Enter phone number"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Tutoring Areas Section */}
                            <div className="border-t border-gray-200 pt-8">
                              <div className="flex flex-col mb-4">
                                <p className="text-sm font-semibold text-gray-900">
                                  Main tutoring areas
                                </p>
                                <p className="text-xs text-gray-500">
                                  View & edit specialized subjects
                                </p>
                              </div>
                              <div className="space-y-4">
                                {editData.tutoringAreas.map((area, index) => (
                                  <div
                                    key={index}
                                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                                  >
                                    <div>
                                      <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Main area
                                        <span className="text-red-500">*</span>
                                      </label>
                                      <select
                                        value={area.mainArea}
                                        onChange={(e) =>
                                          handleTutoringAreaChange(
                                            index,
                                            "mainArea",
                                            e.target.value,
                                          )
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                      >
                                        <option value="">
                                          Select main area
                                        </option>
                                        {TUTORING_AREAS.map((ta) => (
                                          <option key={ta.id} value={ta.name}>
                                            {ta.name}
                                          </option>
                                        ))}
                                      </select>
                                    </div>
                                    <div>
                                      <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Subject
                                        <span className="text-red-500">*</span>
                                      </label>
                                      <select
                                        value={area.subject}
                                        onChange={(e) =>
                                          handleTutoringAreaChange(
                                            index,
                                            "subject",
                                            e.target.value,
                                          )
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                      >
                                        <option value="">Select subject</option>
                                        {getSubjectsByMainArea(
                                          area.mainArea,
                                        ).map((subject) => (
                                          <option key={subject} value={subject}>
                                            {subject}
                                          </option>
                                        ))}
                                      </select>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* More Details Section */}
                            <div className="border-t border-gray-200 pt-8">
                              <div className="flex flex-col mb-4">
                                <p className="text-sm font-semibold text-gray-900">
                                  More details
                                </p>
                                <p className="text-xs text-gray-500">
                                  View & edit more info
                                </p>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  About me{" "}
                                  <span className="text-gray-500">
                                    (Optional)
                                  </span>
                                </label>
                                <textarea
                                  name="aboutMe"
                                  value={editData.aboutMe}
                                  onChange={handleInputChange}
                                  rows={4}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  placeholder="Tell us about yourself"
                                />
                              </div>
                            </div>

                            {/* Save and Cancel Buttons */}
                            <div className="flex gap-3 justify-end border-t border-gray-200 pt-8">
                              <button
                                onClick={handleCancel}
                                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={handleEditClick}
                                className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                              >
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
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                                <span>Save</span>
                              </button>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}

                {/* Security Tab */}
                {!show2FAModal && activeTab === "security" && (
                  <div>
                    <div className="mb-8">
                      <h1 className="text-2xl font-bold text-gray-900">
                        Security
                      </h1>
                      <p className="text-gray-600 text-sm mt-1">
                        View & update your account security
                      </p>
                    </div>

                    {/* Desktop Layout */}
                    <div className="hidden md:block space-y-12">
                      {/* Row 1: Change Password Section */}
                      <div className="flex gap-12">
                        {/* Left Column - Label */}
                        <div className="w-48 shrink-0">
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-1">
                              Change password
                            </h3>
                            <p className="text-sm text-gray-600">
                              Change your password here
                            </p>
                          </div>
                        </div>

                        {/* Right Column - Inputs */}
                        <div className="flex-1">
                          <div className="space-y-4">
                            <div>
                              <label className="block text-gray-700 font-medium mb-2">
                                Current password
                                <span className="text-red-500">*</span>
                              </label>
                              <div className="relative">
                                <input
                                  type={
                                    showCurrentPassword ? "text" : "password"
                                  }
                                  placeholder="Enter current password"
                                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                                />
                                <button
                                  onClick={() =>
                                    setShowCurrentPassword(!showCurrentPassword)
                                  }
                                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                  {showCurrentPassword ? (
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
                                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-4.803m5.604-1.273A9.973 9.973 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.049 10.049 0 01-4.117 5.503m-4.817.713a9.996 9.996 0 01-1.389-1.36m5.532-3.51a9.991 9.991 0 002.25-3.993M3 12a9 9 0 018.572-8.963m5.648 7.155L3 3m0 9h15"
                                      />
                                    </svg>
                                  ) : (
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
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                      />
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                      />
                                    </svg>
                                  )}
                                </button>
                              </div>
                            </div>

                            <div>
                              <label className="block text-gray-700 font-medium mb-2">
                                New password
                                <span className="text-red-500">*</span>
                              </label>
                              <div className="relative">
                                <input
                                  type={showNewPassword ? "text" : "password"}
                                  placeholder="Enter new password"
                                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                                />
                                <button
                                  onClick={() =>
                                    setShowNewPassword(!showNewPassword)
                                  }
                                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                  {showNewPassword ? (
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
                                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-4.803m5.604-1.273A9.973 9.973 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.049 10.049 0 01-4.117 5.503m-4.817.713a9.996 9.996 0 01-1.389-1.36m5.532-3.51a9.991 9.991 0 002.25-3.993M3 12a9 9 0 018.572-8.963m5.648 7.155L3 3m0 9h15"
                                      />
                                    </svg>
                                  ) : (
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
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                      />
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                      />
                                    </svg>
                                  )}
                                </button>
                              </div>
                            </div>

                            <div>
                              <label className="block text-gray-700 font-medium mb-2">
                                Confirm new password
                                <span className="text-red-500">*</span>
                              </label>
                              <div className="relative">
                                <input
                                  type={
                                    showConfirmPassword ? "text" : "password"
                                  }
                                  placeholder="Confirm new password"
                                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                                />
                                <button
                                  onClick={() =>
                                    setShowConfirmPassword(!showConfirmPassword)
                                  }
                                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                  {showConfirmPassword ? (
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
                                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-4.803m5.604-1.273A9.973 9.973 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.049 10.049 0 01-4.117 5.503m-4.817.713a9.996 9.996 0 01-1.389-1.36m5.532-3.51a9.991 9.991 0 002.25-3.993M3 12a9 9 0 018.572-8.963m5.648 7.155L3 3m0 9h15"
                                      />
                                    </svg>
                                  ) : (
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
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                      />
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                      />
                                    </svg>
                                  )}
                                </button>
                              </div>
                            </div>

                            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                              Change password
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Row 2: 2FA Section */}
                      <div className="flex gap-12">
                        {/* Left Column - Label */}
                        <div className="w-48 shrink-0">
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-1">
                              2FA
                            </h3>
                            <p className="text-sm text-gray-600">
                              Enable disable 2FA
                            </p>
                          </div>
                        </div>

                        {/* Right Column - Toggle */}
                        <div>
                          <div className="items-center justify-between">
                            <p className="text-gray-700 font-medium">Status</p>
                            <div className="flex items-center gap-3">
                              <span className="text-sm text-gray-600">
                                {is2FAEnabled ? "Enable" : "Disable"}
                              </span>
                              <button
                                onClick={handle2FAToggle}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                  is2FAEnabled ? "bg-blue-600" : "bg-gray-300"
                                }`}
                              >
                                <span
                                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                    is2FAEnabled
                                      ? "translate-x-6"
                                      : "translate-x-1"
                                  }`}
                                />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Mobile Layout */}
                    <div className="md:hidden space-y-6">
                      {/* Change Password Section */}
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">
                            Change password
                          </h3>
                          <p className="text-sm text-gray-600 mb-4">
                            Change your password here
                          </p>
                        </div>

                        <div>
                          <label className="block text-gray-700 font-medium mb-2">
                            Current password
                            <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <input
                              type={showCurrentPassword ? "text" : "password"}
                              placeholder="Enter current password"
                              className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                            />
                            <button
                              onClick={() =>
                                setShowCurrentPassword(!showCurrentPassword)
                              }
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                              {showCurrentPassword ? (
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
                                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-4.803m5.604-1.273A9.973 9.973 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.049 10.049 0 01-4.117 5.503m-4.817.713a9.996 9.996 0 01-1.389-1.36m5.532-3.51a9.991 9.991 0 002.25-3.993M3 12a9 9 0 018.572-8.963m5.648 7.155L3 3m0 9h15"
                                  />
                                </svg>
                              ) : (
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
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                  />
                                </svg>
                              )}
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-gray-700 font-medium mb-2">
                            New password<span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <input
                              type={showNewPassword ? "text" : "password"}
                              placeholder="Enter new password"
                              className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                            />
                            <button
                              onClick={() =>
                                setShowNewPassword(!showNewPassword)
                              }
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                              {showNewPassword ? (
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
                                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-4.803m5.604-1.273A9.973 9.973 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.049 10.049 0 01-4.117 5.503m-4.817.713a9.996 9.996 0 01-1.389-1.36m5.532-3.51a9.991 9.991 0 002.25-3.993M3 12a9 9 0 018.572-8.963m5.648 7.155L3 3m0 9h15"
                                  />
                                </svg>
                              ) : (
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
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                  />
                                </svg>
                              )}
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-gray-700 font-medium mb-2">
                            Confirm new password
                            <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <input
                              type={showConfirmPassword ? "text" : "password"}
                              placeholder="Confirm new password"
                              className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                            />
                            <button
                              onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                              }
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                              {showConfirmPassword ? (
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
                                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-4.803m5.604-1.273A9.973 9.973 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.049 10.049 0 01-4.117 5.503m-4.817.713a9.996 9.996 0 01-1.389-1.36m5.532-3.51a9.991 9.991 0 002.25-3.993M3 12a9 9 0 018.572-8.963m5.648 7.155L3 3m0 9h15"
                                  />
                                </svg>
                              ) : (
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
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                  />
                                </svg>
                              )}
                            </button>
                          </div>
                        </div>

                        <button className="w-full px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                          Change password
                        </button>
                      </div>

                      {/* 2FA Section Mobile */}
                      <div className="border-t pt-6">
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">
                            2FA
                          </h3>
                          <p className="text-sm text-gray-600 mb-4">
                            Enable disable 2FA
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-gray-700 font-medium">Status</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-600">
                              {is2FAEnabled ? "Enable" : "Disable"}
                            </span>
                            <button
                              onClick={handle2FAToggle}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                is2FAEnabled ? "bg-blue-600" : "bg-gray-300"
                              }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                  is2FAEnabled
                                    ? "translate-x-6"
                                    : "translate-x-1"
                                }`}
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden file input for photo upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handlePhotoChange}
        className="hidden"
      />
    </main>
  );
}
