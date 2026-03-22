import Image from "next/image";
import logo from "../../../public/images/logo/main-logo.webp";
import { useState } from "react";
import {
  UserIcon,
  MapPinIcon,
  CaretDownIcon,
  CertificateIcon,
  BuildingOfficeIcon,
  UserCirclePlusIcon,
  ClockAfternoonIcon,
  CurrencyDollarIcon,
  SealCheckIcon,
} from "@phosphor-icons/react";
import { useRouter } from "next/router";
import { countries } from "@/enum/country";
import { education } from "@/enum/education";
import { TUTORING_AREAS } from "@/enum/tutoring_areas";

export default function TutorInfo() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedHigherEducation, setSelectedHigherEducation] = useState("");
  const [selectedEducation, setSelectedEducation] = useState("");
  const [selectedMainArea1, setSelectedMainArea1] = useState("");
  const [selectedSubject1, setSelectedSubject1] = useState("");
  const [selectedMainArea2, setSelectedMainArea2] = useState("");
  const [selectedSubject2, setSelectedSubject2] = useState("");
  const stepItems = [
    { title: "Step 01", subtitle: "Personal Info" },
    { title: "Step 02", subtitle: "Education" },
    { title: "Step 03", subtitle: "Experience" },
    { title: "Step 04", subtitle: "Other" },
    { title: "Step 05", subtitle: "Preview" },
  ];
  const mobileWindowSize = 3;
  const mobileStartStep = Math.min(
    Math.max(step - 1, 1),
    stepItems.length - mobileWindowSize + 1,
  );
  const mobileStepItems = stepItems.slice(
    mobileStartStep - 1,
    mobileStartStep - 1 + mobileWindowSize,
  );

  function nextStep() {
    setStep((prev) => prev + 1);
  }

  function prevStep() {
    setStep((prev) => prev - 1);
  }

  function getSubjectsByMainArea(mainAreaName: string): string[] {
    const area = TUTORING_AREAS.find((a) => a.name === mainAreaName);
    return area ? area.subjects : [];
  }
  return (
    <div className="flex">
      <div className="w-1/2 bg-cover bg-center bg-no-repeat bg-[url('/images/login/tutor.webp')] hidden md:block"></div>
      <div className="w-full md:w-1/2 p-5 align-middle flex items-center justify-center  bg-[#EEF4FF]">
        <div className="flex flex-col items-center justify-center w-full">
          {step !== 6 && (
            <div className="w-full max-w-4xl mt-5 mb-15">
              <div className="hidden md:flex items-start justify-between gap-2">
                {stepItems.map((stepItem, index) => {
                  const stepNumber = index + 1;
                  const isCompleted = step > stepNumber;
                  const isActive = step === stepNumber;
                  const isInitialActiveStyle = isActive && step === 1;

                  return (
                    <div
                      key={stepItem.title}
                      className="flex items-start flex-1 last:flex-none"
                    >
                      <div className="flex flex-col items-center">
                        <div
                          className={`h-6 w-6 rounded-lg flex items-center justify-center ${
                            isCompleted
                              ? "bg-blue-500"
                              : isActive
                                ? isInitialActiveStyle
                                  ? "bg-blue-500"
                                  : "bg-blue-500 ring-4 ring-blue-200"
                                : "border-2 border-gray-300 bg-white"
                          }`}
                        >
                          {isCompleted ? (
                            <span className="text-white text-lg leading-none">
                              ✓
                            </span>
                          ) : (
                            <div
                              className={`h-3 w-3 rounded-sm ${
                                isActive ? "bg-white" : "bg-gray-300"
                              }`}
                            ></div>
                          )}
                        </div>
                        <p className="mt-3 text-sm font-semibold text-black">
                          {stepItem.title}
                        </p>
                        <p className="text-gray-500 text-[12px]">
                          {stepItem.subtitle}
                        </p>
                      </div>

                      {index < stepItems.length - 1 && (
                        <div
                          className={`h-[3px] flex-1 mt-3 mx-1 rounded-full ${
                            index < step - 1 ? "bg-blue-400" : "bg-gray-300"
                          }`}
                        ></div>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="flex md:hidden items-start justify-between gap-2">
                {mobileStepItems.map((stepItem, index) => {
                  const stepNumber = mobileStartStep + index;
                  const isCompleted = step > stepNumber;
                  const isActive = step === stepNumber;
                  const isInitialActiveStyle = isActive && step === 1;

                  return (
                    <div
                      key={`${stepItem.title}-mobile`}
                      className="flex items-start flex-1 last:flex-none"
                    >
                      <div className="flex flex-col items-center">
                        <div
                          className={`h-6 w-6 rounded-lg flex items-center justify-center ${
                            isCompleted
                              ? "bg-blue-500"
                              : isActive
                                ? isInitialActiveStyle
                                  ? "bg-blue-500"
                                  : "bg-blue-500 ring-4 ring-blue-200"
                                : "border-2 border-gray-300 bg-white"
                          }`}
                        >
                          {isCompleted ? (
                            <span className="text-white text-lg leading-none">
                              ✓
                            </span>
                          ) : (
                            <div
                              className={`h-3 w-3 rounded-sm ${
                                isActive ? "bg-white" : "bg-gray-300"
                              }`}
                            ></div>
                          )}
                        </div>
                        <p className="mt-3 text-sm font-semibold text-black">
                          {stepItem.title}
                        </p>
                        <p className="text-gray-500 text-[12px]">
                          {stepItem.subtitle}
                        </p>
                      </div>

                      {index < mobileStepItems.length - 1 && (
                        <div
                          className={`h-[3px] flex-1 mt-3 mx-1 rounded-full ${
                            stepNumber < step ? "bg-blue-400" : "bg-gray-300"
                          }`}
                        ></div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <Image src={logo} alt="Main Logo" height={100} width={100} />
          {step === 1 && (
            <>
              <p className="font-semibold mt-5">Personal information</p>
              <p className="text-gray-600 text-sm">Tell us about yourself</p>
              <div className="mt-2 w-full md:px-15">
                <div className="pt-5">
                  <label htmlFor="name">
                    Full Name<span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <UserIcon
                      size={20}
                      className="absolute left-3 top-7 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="text"
                      id="name"
                      className="w-full border border-gray-300 rounded-md pl-10 p-3 mt-1 mb-4 
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="country">
                    Country<span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <MapPinIcon
                      size={20}
                      className="absolute left-3 top-7 -translate-y-1/2 text-gray-400"
                    />
                    <select
                      id="country"
                      value={selectedCountry}
                      onChange={(e) => setSelectedCountry(e.target.value)}
                      className={`w-full border border-gray-300 rounded-md pl-10 pr-10 p-3 mt-1 mb-4 appearance-none 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                           selectedCountry ? "text-black" : "text-gray-400"
                         }`}
                    >
                      <option value="" disabled>
                        Select country
                      </option>
                      {countries.map((country) => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                    <CaretDownIcon
                      size={18}
                      className="absolute right-3 top-2/5 -translate-y-1/2 text-gray-400 pointer-events-none"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="address">
                    Address<span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <MapPinIcon
                      size={20}
                      className="absolute left-3 top-7 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="text"
                      id="addressOne"
                      className="w-full border border-gray-300 rounded-md pl-10 p-3 mt-1 mb-4 
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Lane 1"
                    />
                  </div>
                  <div className="relative">
                    <MapPinIcon
                      size={20}
                      className="absolute left-3 top-7 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="text"
                      id="addressTwo"
                      className="w-full border border-gray-300 rounded-md pl-10 p-3 mb-4 
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Lane 2 (Optional)"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-between w-full  p-5">
                <button className="px-6 py-2.5 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:border-blue-500 hover:text-blue-600 transition-all duration-300">
                  Cancel
                </button>
                <button
                  onClick={nextStep}
                  type="submit"
                  className="px-5 bg-blue-600 text-white py-3 rounded-lg transition-all duration-300 shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50"
                >
                  Next
                </button>
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <p className="font-semibold mt-5">Education information</p>
              <p className="text-gray-600 text-sm">
                Tell us about your education qualification
              </p>
              <div className="mt-2 w-full md:px-15">
                <div className="pt-5">
                  <label htmlFor="highestEducation">
                    Highest education qualification
                    <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <CertificateIcon
                      size={20}
                      className="absolute left-3 top-7 -translate-y-1/2 text-gray-400"
                    />
                    <select
                      id="highestEducation"
                      value={selectedHigherEducation}
                      onChange={(e) =>
                        setSelectedHigherEducation(e.target.value)
                      }
                      className={`w-full border border-gray-300 rounded-md pl-10 pr-10 p-3 mt-1 mb-4 appearance-none 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                           selectedHigherEducation
                             ? "text-black"
                             : "text-gray-400"
                         }`}
                    >
                      <option value="" disabled>
                        Select education qualification
                      </option>
                      {education.map((edu) => (
                        <option key={edu} value={edu}>
                          {edu}
                        </option>
                      ))}
                    </select>
                    <CaretDownIcon
                      size={18}
                      className="absolute right-3 top-2/5 -translate-y-1/2 text-gray-400 pointer-events-none"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="highestEducation">
                    Name of education qualification
                    <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <CertificateIcon
                      size={20}
                      className="absolute left-3 top-7 -translate-y-1/2 text-gray-400"
                    />
                    <select
                      id="highestEducation"
                      value={selectedEducation}
                      onChange={(e) => setSelectedEducation(e.target.value)}
                      className={`w-full border border-gray-300 rounded-md pl-10 pr-10 p-3 mt-1 mb-4 appearance-none 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                           selectedEducation ? "text-black" : "text-gray-400"
                         }`}
                    >
                      <option value="" disabled>
                        Enter name of education qualification
                      </option>
                      {education.map((edu) => (
                        <option key={edu} value={edu}>
                          {edu}
                        </option>
                      ))}
                    </select>
                    <CaretDownIcon
                      size={18}
                      className="absolute right-3 top-2/5 -translate-y-1/2 text-gray-400 pointer-events-none"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="university">
                    University/ High school/ Institution
                    <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <BuildingOfficeIcon
                      size={20}
                      className="absolute left-3 top-7 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="text"
                      id="university"
                      className="w-full border border-gray-300 rounded-md pl-10 p-3 mt-1 mb-4 
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter university, high school, or institution name"
                    />
                  </div>
                </div>
                <div>
                  <p className="font-semibold">Main tutoring areas</p>
                  <div className="flex gap-5">
                    <div className="flex-1/2 relative mt-2">
                      <label htmlFor="mainArea1">
                        Main area
                        <span className="text-red-600">*</span>
                      </label>
                      <select
                        id="mainArea1"
                        value={selectedMainArea1}
                        onChange={(e) => {
                          setSelectedMainArea1(e.target.value);
                          setSelectedSubject1("");
                        }}
                        className={`w-full border border-gray-300 rounded-md pr-10 p-3 mt-1 mb-4 appearance-none 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                           selectedMainArea1 ? "text-black" : "text-gray-400"
                         }`}
                      >
                        <option value="" disabled>
                          Select main area
                        </option>
                        {TUTORING_AREAS.map((area) => (
                          <option key={area.id} value={area.name}>
                            {area.name}
                          </option>
                        ))}
                      </select>
                      <CaretDownIcon
                        size={18}
                        className="absolute right-3 top-3/5 -translate-y-1/2 text-gray-400 pointer-events-none"
                      />
                    </div>
                    <div className="flex-1/2 relative mt-2">
                      <label htmlFor="subject1">
                        Subject
                        <span className="text-red-600">*</span>
                      </label>
                      <select
                        id="subject1"
                        value={selectedSubject1}
                        onChange={(e) => setSelectedSubject1(e.target.value)}
                        disabled={!selectedMainArea1}
                        className={`w-full border border-gray-300 rounded-md pr-10 p-3 mt-1 mb-4 appearance-none 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed ${
                           selectedSubject1 ? "text-black" : "text-gray-400"
                         }`}
                      >
                        <option value="" disabled>
                          {selectedMainArea1
                            ? "Select subject"
                            : "Select main area first"}
                        </option>
                        {selectedMainArea1 &&
                          getSubjectsByMainArea(selectedMainArea1).map(
                            (subject) => (
                              <option key={subject} value={subject}>
                                {subject}
                              </option>
                            ),
                          )}
                      </select>
                      <CaretDownIcon
                        size={18}
                        className="absolute right-3 top-3/5 -translate-y-1/2 text-gray-400 pointer-events-none"
                      />
                    </div>
                  </div>
                  <div className="flex gap-5">
                    <div className="flex-1/2 relative">
                      <label htmlFor="mainArea2">
                        Main area
                        <span className="text-red-600">*</span>
                      </label>
                      <select
                        id="mainArea2"
                        value={selectedMainArea2}
                        onChange={(e) => {
                          setSelectedMainArea2(e.target.value);
                          setSelectedSubject2("");
                        }}
                        className={`w-full border border-gray-300 rounded-md pr-10 p-3 mt-1 mb-4 appearance-none 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                           selectedMainArea2 ? "text-black" : "text-gray-400"
                         }`}
                      >
                        <option value="" disabled>
                          Select main area
                        </option>
                        {TUTORING_AREAS.map((area) => (
                          <option key={area.id} value={area.name}>
                            {area.name}
                          </option>
                        ))}
                      </select>
                      <CaretDownIcon
                        size={18}
                        className="absolute right-3 top-3/5 -translate-y-1/2 text-gray-400 pointer-events-none"
                      />
                    </div>
                    <div className="flex-1/2 relative">
                      <label htmlFor="subject2">
                        Subject
                        <span className="text-red-600">*</span>
                      </label>
                      <select
                        id="subject2"
                        value={selectedSubject2}
                        onChange={(e) => setSelectedSubject2(e.target.value)}
                        disabled={!selectedMainArea2}
                        className={`w-full border border-gray-300 rounded-md pr-10 p-3 mt-1 mb-4 appearance-none 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed ${
                           selectedSubject2 ? "text-black" : "text-gray-400"
                         }`}
                      >
                        <option value="" disabled>
                          {selectedMainArea2
                            ? "Select subject"
                            : "Select main area first"}
                        </option>
                        {selectedMainArea2 &&
                          getSubjectsByMainArea(selectedMainArea2).map(
                            (subject) => (
                              <option key={subject} value={subject}>
                                {subject}
                              </option>
                            ),
                          )}
                      </select>
                      <CaretDownIcon
                        size={18}
                        className="absolute right-3 top-3/5 -translate-y-1/2 text-gray-400 pointer-events-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between w-full p-5">
                <button
                  className="px-6 py-2.5 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:border-blue-500 hover:text-blue-600 transition-all duration-300"
                  onClick={prevStep}
                >
                  Back
                </button>
                <button
                  type="submit"
                  onClick={nextStep}
                  className="px-5 bg-blue-600 text-white py-3 rounded-lg transition-all duration-300 shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50"
                >
                  Next
                </button>
              </div>
            </>
          )}
          {step === 3 && (
            <>
              <p className="font-semibold mt-5">Previous experiences</p>
              <p className="text-gray-600 text-sm">
                Tell us about your previous experiences
              </p>
              <div className="mt-2 w-full md:px-15">
                <div className="pt-5">
                  <label htmlFor="highestEducation">
                    Do you have previous Tutoring experience?
                    <span className="text-red-600">*</span>
                  </label>
                  <div className="gap-5 mt-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="experience"
                        value="yes"
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      Yes
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="experience"
                        value="no"
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      No
                    </label>
                  </div>
                </div>
                <div className="pt-5">
                  <label htmlFor="highestEducation">
                    If yes, which teaching method did you used
                  </label>
                  <div className="gap-5 mt-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="experience"
                        value="online"
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      Online
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="experience"
                        value="physical"
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      Physical
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex justify-between w-full p-5">
                <button
                  className="px-6 py-2.5 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:border-blue-500 hover:text-blue-600 transition-all duration-300"
                  onClick={prevStep}
                >
                  Back
                </button>
                <button
                  type="submit"
                  onClick={nextStep}
                  className="px-5 bg-blue-600 text-white py-3 rounded-lg transition-all duration-300 shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50"
                >
                  Next
                </button>
              </div>
            </>
          )}
          {step === 4 && (
            <>
              <p className="font-semibold mt-5">Other information</p>
              <p className="text-gray-600 text-sm">
                Finally tell us about this extra information
              </p>
              <div className="mt-2 w-full md:px-15">
                <div className="pt-5">
                  <label htmlFor="highestEducation">
                    The device/s you have
                    <span className="text-red-600">*</span>
                  </label>
                  <div className="flex gap-5 mt-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="experience"
                        value="mobile"
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      Mobile
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="experience"
                        value="tablet"
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      Tablet
                    </label>
                  </div>
                  <div className="flex gap-5 mt-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="experience"
                        value="laptop"
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      Laptop
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="experience"
                        value="pc"
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      PC
                    </label>
                  </div>
                </div>
                <div className="pt-5">
                  <label htmlFor="country">
                    Country<span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <UserCirclePlusIcon
                      size={20}
                      className="absolute left-3 top-7 -translate-y-1/2 text-gray-400"
                    />
                    <select
                      id="country"
                      value={selectedCountry}
                      onChange={(e) => setSelectedCountry(e.target.value)}
                      className={`w-full border border-gray-300 rounded-md pl-10 pr-10 p-3 mt-1 mb-4 appearance-none 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                           selectedCountry ? "text-black" : "text-gray-400"
                         }`}
                    >
                      <option value="" disabled>
                        Current status about you
                      </option>
                      {countries.map((country) => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                    <CaretDownIcon
                      size={18}
                      className="absolute right-3 top-2/5 -translate-y-1/2 text-gray-400 pointer-events-none"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="name">
                    Hours do plan to work online for a week(hr)
                    <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <ClockAfternoonIcon
                      size={20}
                      className="absolute left-3 top-7 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="text"
                      id="name"
                      className="w-full border border-gray-300 rounded-md pl-10 p-3 mt-1 mb-4 
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter work hours"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="name">
                    Expected earnings for a month(USD)
                    <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <CurrencyDollarIcon
                      size={20}
                      className="absolute left-3 top-7 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="text"
                      id="name"
                      className="w-full border border-gray-300 rounded-md pl-10 p-3 mt-1 mb-4 
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter amount"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-between w-full p-5">
                <button
                  className="px-6 py-2.5 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:border-blue-500 hover:text-blue-600 transition-all duration-300"
                  onClick={prevStep}
                >
                  Back
                </button>
                <button
                  type="submit"
                  onClick={nextStep}
                  className="px-5 bg-blue-600 text-white py-3 rounded-lg transition-all duration-300 shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50"
                >
                  Next
                </button>
              </div>
            </>
          )}
          {step === 5 && (
            <>
              <p className="font-semibold mt-5">Preview application</p>
              <p className="text-gray-600 text-sm">
                Review your application before submission
              </p>
              <p className="text-gray-600 text-sm">
                If you want change anything in application, you can go back and
                change, then submit the application.
              </p>
              <div className="mt-2 w-full md:px-15 border-b border-gray-300 pb-10">
                <div className="mt-10">
                  <h2 className="font-semibold text-center mb-2">
                    Basic Information
                  </h2>
                  <div className="md:flex">
                    <p className="md:w-1/5">Email</p>
                    <p className="text-gray-500">email@example.com</p>
                  </div>
                  <div className="md:flex mt-2">
                    <p className="md:w-1/5">User name</p>
                    <p className="text-gray-500">test name</p>
                  </div>
                  <div className="md:flex mt-2">
                    <p className="md:w-1/5">number</p>
                    <p className="text-gray-500">+94 71 123 4567</p>
                  </div>
                </div>
              </div>
              <div className="mt-2 w-full md:px-15 border-b border-gray-300 pb-10">
                <div className="mt-10">
                  <h2 className="font-semibold text-center mb-2">
                    Personal Information
                  </h2>
                  <div className="md:flex">
                    <p className="md:w-1/5">Full Name</p>
                    <p className="text-gray-500">John Doe</p>
                  </div>
                  <div className="md:flex mt-2">
                    <p className="md:w-1/5">Country</p>
                    <p className="text-gray-500">Sri Lanka</p>
                  </div>
                  <div className="md:flex mt-2">
                    <p className="md:w-1/5">Address</p>
                    <div className="text-gray-500">
                      <p>123 Main Street, Malpara</p>
                      <p>Colombo, Sri Lanka</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-2 w-full md:px-15 border-b border-gray-300 pb-10">
                <div className="mt-10">
                  <h2 className="font-semibold text-center mb-2">
                    Education Information
                  </h2>
                  <div>
                    <p>Highest education qualification</p>
                    <p className="text-gray-500 md:ml-5">
                      Bachelor&apos;s degree of A.B.C University
                    </p>
                  </div>
                  <div className="mt-3">
                    <p>Name of education qualification</p>
                    <p className="text-gray-500 md:ml-5">
                      National degree Infromation Technology
                    </p>
                  </div>
                  <div className="mt-3">
                    <p>University/ High school/ Institution</p>
                    <p className="text-gray-500 md:ml-5">
                      University of Colombo
                    </p>
                  </div>
                  <div className="mt-3">
                    <p>Main tutoring areas</p>
                    <div className="md:flex mt-2 md:mt-0">
                      <div className="md:flex md:w-1/3">
                        <p className="md:ml-5">Main area - </p>
                        <p className="text-gray-500 md:ml-1">Science</p>
                      </div>
                      <div className="md:flex">
                        <p className="md:ml-5">Subject - </p>
                        <p className="text-gray-500 md:ml-1">Mathematics</p>
                      </div>
                    </div>
                    <div className="md:flex mt-5 md:mt-0">
                      <div className="md:flex md:w-1/3">
                        <p className="md:ml-5">Main area - </p>
                        <p className="text-gray-500 md:ml-1">Science</p>
                      </div>
                      <div className="md:flex">
                        <p className="md:ml-5">Subject - </p>
                        <p className="text-gray-500 md:ml-1">Mathematics</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-2 w-full md:px-15 border-b border-gray-300 pb-10">
                <div className="mt-10">
                  <h2 className="font-semibold text-center mb-2">
                    Previous Experiences
                  </h2>
                  <div className="md:flex">
                    <p>Do you have previous Tutoring experiences</p>
                    <p className="text-gray-500 md:ml-5">Yes</p>
                  </div>
                  <div className="mt-3 md:flex">
                    <p>If yes, which teaching methods did you used</p>
                    <p className="text-gray-500 md:ml-5">Online</p>
                  </div>
                </div>
              </div>
              <div className="mt-2 w-full md:px-15 border-b border-gray-300 pb-10">
                <div className="mt-10">
                  <h2 className="font-semibold text-center mb-2">
                    Other Information
                  </h2>
                  <div>
                    <p>The devices you have</p>
                    <p className="text-gray-500 md:ml-5">
                      Mobile, Tablet, Laptop, PC
                    </p>
                  </div>
                  <div className="mt-3">
                    <p>Current status about you</p>
                    <p className="text-gray-500 md:ml-5">High School Student</p>
                  </div>
                  <div className="mt-3">
                    <p>Hours do plan to work online for a week(hr)</p>
                    <p className="text-gray-500 md:ml-5">20 Hours</p>
                  </div>
                  <div className="mt-3">
                    <p>Expected earnings for a month</p>
                    <p className="text-gray-500 md:ml-5">$ 150</p>
                  </div>
                </div>
              </div>
              <div className="mt-10 flex w-full md:px-15 items-start mb-10">
                <input
                  type="checkbox"
                  id="confirm"
                  className="text-blue-600 focus:ring-blue-500 mt-1.5"
                />
                <label htmlFor="confirm" className="ml-2 text-gray-600">
                  I confirm that all the information provided is accurate and
                  truthful to the best of my knowledge.
                </label>
              </div>
              <div className="flex justify-between w-full p-5">
                <button
                  className="px-6 py-2.5 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:border-blue-500 hover:text-blue-600 transition-all duration-300"
                  onClick={prevStep}
                >
                  Back
                </button>
                <button
                  type="submit"
                  onClick={nextStep}
                  className="px-5 bg-blue-600 text-white py-3 rounded-lg transition-all duration-300 shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50"
                >
                  Submit
                </button>
              </div>
            </>
          )}
          {step === 6 && (
            <>
              <p className="font-semibold mt-5">Your profile is ready!</p>
              <p className="text-gray-600 text-sm">
                Thank you for applying to become a tutor at Top Tutors Global!
              </p>
              <p className="text-gray-600 text-sm text-center">
                Your application has been successfuly submitted and is currently
                under review by our verification team
              </p>
              <p className="text-gray-600 text-sm text-center">
                Your will be notified once your profile has been approved.
              </p>
              <div className="mt-6 w-full flex flex-col items-center py-4">
                {/* Congratulations heading */}
                <div className="flex items-center gap-2 mb-8">
                  <span className="text-xl text-gray-400 font-semibold">
                    Congratulations
                  </span>
                  <SealCheckIcon size={24} className="text-gray-400" />
                </div>

                {/* Steps timeline — grid keeps all icons in one centered column */}
                <div className="flex flex-col items-center">
                  {/* Step 1: Final review (pending) */}
                  <div className="grid grid-cols-[120px_28px_120px] items-center gap-x-3">
                    <span className="text-gray-400 text-sm text-right">
                      Final review
                    </span>
                    <div className="w-7 h-7 border-2 border-gray-300 rounded-md flex items-center justify-center bg-white">
                      <div className="w-3 h-3 bg-gray-300 rounded-sm"></div>
                    </div>
                    <div />
                  </div>

                  {/* Connector (gray — final review pending) */}
                  <div className="grid grid-cols-[120px_28px_120px]">
                    <div />
                    <div className="flex justify-center">
                      <div className="w-0.5 h-10 bg-gray-300"></div>
                    </div>
                    <div />
                  </div>

                  {/* Step 2: Filled information & Submitted (completed) */}
                  <div className="grid grid-cols-[120px_28px_120px] items-center gap-x-3">
                    <div />
                    <div className="w-7 h-7 border-2 border-green-400 rounded-md flex items-center justify-center bg-white">
                      <span className="text-green-500 text-xs font-bold leading-none">
                        ✓
                      </span>
                    </div>
                    <span className="text-gray-600 text-sm leading-snug">
                      Filled information
                      <br />& Submitted
                    </span>
                  </div>

                  {/* Connector (green — registered completed) */}
                  <div className="grid grid-cols-[120px_28px_120px]">
                    <div />
                    <div className="flex justify-center">
                      <div className="w-0.5 h-10 bg-green-400"></div>
                    </div>
                    <div />
                  </div>

                  {/* Step 3: Registered to Top Tutors Global (completed) */}
                  <div className="grid grid-cols-[120px_28px_120px] items-center gap-x-3">
                    <span className="text-gray-600 text-sm text-right leading-snug">
                      Registered to
                      <br />
                      Top Tutors Global
                    </span>
                    <div className="w-7 h-7 border-2 border-green-400 rounded-md flex items-center justify-center bg-white">
                      <span className="text-green-500 text-xs font-bold leading-none">
                        ✓
                      </span>
                    </div>
                    <div />
                  </div>
                </div>
              </div>
              <div className="flex justify-center w-full p-5">
                <button
                  onClick={() => {
                    router.push("/auth/TutorDashboard");
                  }}
                  type="submit"
                  className="px-5 bg-blue-600 text-white py-3 rounded-lg transition-all duration-300 shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50"
                >
                  Go home
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
