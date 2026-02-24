import Image from "next/image";
import logo from "../../../public/images/logo/main-logo.webp";
import { GoogleLogoIcon } from "@phosphor-icons/react";
import {
  EnvelopeIcon,
  LockIcon,
  ArrowRightIcon,
  ExclamationMarkIcon,
} from "@phosphor-icons/react";
import { useState, useEffect, useRef } from "react";

export default function Login() {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [isForgetPassword, setIsForgetPassword] = useState<boolean>(false);
  const [isOtpScreen, setIsOtpScreen] = useState<boolean>(false);
  const [isNewPasswordScreen, setIsNewPasswordScreen] =
    useState<boolean>(false);
  const [email, setemail] = useState<string>("");
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
  const [emailTouched, setEmailTouched] = useState<boolean>(false);
  const [otpCountdown, setOtpCountdown] = useState<number>(0);
  const otpTimerRef = useRef<number | null>(null);

  useEffect(() => {
    // start timer when otpCountdown is set (>0)
    if (otpCountdown > 0 && otpTimerRef.current === null) {
      otpTimerRef.current = window.setInterval(() => {
        setOtpCountdown((prev) => {
          if (prev <= 1) {
            if (otpTimerRef.current !== null) {
              clearInterval(otpTimerRef.current);
              otpTimerRef.current = null;
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000) as unknown as number;
    }

    // cleanup on unmount
    return () => {
      if (otpTimerRef.current !== null) {
        clearInterval(otpTimerRef.current);
        otpTimerRef.current = null;
      }
    };
  }, [otpCountdown]);

  function validateEmail(value: string) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(value);
  }

  function clearEmailState() {
    setemail("");
    setIsEmailValid(true);
    setEmailTouched(false);
  }

  function handleResend() {
    // todo: trigger resend logic (API call) here if needed
    setOtpCountdown(60);
  }

  function goToForgetPassword() {
    setIsLogin(false);
    setIsForgetPassword(true);
    setIsOtpScreen(false);
    clearEmailState();
  }

  function goToLogin() {
    setIsLogin(true);
    setIsForgetPassword(false);
    setIsOtpScreen(false);
    clearEmailState();
  }

  function goToOtpScreen() {
    setIsLogin(false);
    setIsForgetPassword(false);
    setIsOtpScreen(true);
    clearEmailState();
    setOtpCountdown(60);
  }

  function goToNewPassword() {
    setIsLogin(false);
    setIsForgetPassword(false);
    setIsOtpScreen(false);
    setIsNewPasswordScreen(true);
  }

  return (
    <div className="flex md:h-screen">
      <div className="w-1/2 bg-cover bg-center bg-no-repeat bg-[url('/images/login/student.webp')] hidden md:block"></div>
      <div className="w-full md:w-1/2 pt-25 p-5 align-middle flex items-center justify-center  bg-[#EEF4FF]">
        <div className="flex flex-col items-center justify-center w-full">
          <Image src={logo} alt="Main Logo" height={100} width={100} />
          {/* Login screen content */}
          {isLogin && (
            <>
              <p className="font-semibold mt-5">Welcome back</p>
              <p className="text-gray-600 text-sm">
                Lets get into the work again
              </p>
              <div className="flex items-center border rounded-lg border-gray-400 py-1 px-10 font-semibold mt-10 cursor-pointer hover:scale-105 transition duration-300">
                <GoogleLogoIcon size={20} weight={"bold"} />
                <span className="ml-5">Continue with google</span>
              </div>
              <div className="mt-2 w-full md:px-15">
                <div className="pt-5">
                  <label htmlFor="name">
                    Email<span className="text-red-600">*</span>
                  </label>
                  <div className="relative mb-4">
                    <EnvelopeIcon
                      size={20}
                      className={`absolute left-3 top-7 -translate-y-1/2 text-gray-400 ${emailTouched && !isEmailValid ? "text-red-500" : "text-gray-300"}`}
                    />
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => {
                        const v = e.target.value;
                        setemail(v);
                        setEmailTouched(true);
                        const valid = validateEmail(v);
                        setIsEmailValid(valid);
                      }}
                      className={`w-full border ${emailTouched && !isEmailValid ? "border-red-500 text-red-500" : "border-gray-300"} rounded-md pl-10 p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      placeholder="Enter your email"
                    />
                    {emailTouched && !isEmailValid && (
                      <p className="text-red-600 text-sm">
                        <div className="rounded-full border border-red-500 inline-flex items-center justify-center mr-1">
                          <ExclamationMarkIcon size={10} className="inline" />
                        </div>
                        Invalid email, Please enter correct email
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <label htmlFor="password">
                    Password<span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <LockIcon
                      size={20}
                      className="absolute left-3 top-7 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="password"
                      id="password"
                      className="w-full border border-gray-300 rounded-md pl-10 p-3 mt-1 mb-4 
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your password"
                    />
                  </div>
                </div>
                <div className="flex justify-between mb-8 text-gray-500 text-sm">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="remember"
                      className="mr-2 checked:bg-blue-800"
                    />
                    <label htmlFor="remember">Remember me</label>
                  </div>
                  <span
                    onClick={goToForgetPassword}
                    className="hover:underline"
                  >
                    Forgot password?
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center w-full">
                  <button
                    type="submit"
                    className="px-5 bg-blue-600 text-white py-3 rounded-lg transition-all duration-300 shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 hover:scale-105"
                  >
                    Login
                  </button>
                </div>
                <div className="mt-5 text-center font-semibold">
                  <span className="text-gray-500">
                    Don&apos;t have an account?{" "}
                  </span>
                  <a href="/signup" className="text-blue-600 hover:underline">
                    Sign up
                  </a>
                </div>
              </div>
            </>
          )}
          {/* Fogot password screen content */}
          {isForgetPassword && (
            <>
              <p className="font-semibold mt-5">Enter your email</p>
              <p className="text-gray-600 text-sm">
                before we start, lets verify your email
              </p>
              <div className="mt-2 w-full md:px-15">
                <div className="pt-5">
                  <label htmlFor="name">
                    Email<span className="text-red-600">*</span>
                  </label>
                  <div className="relative mb-4">
                    <EnvelopeIcon
                      size={20}
                      className={`absolute left-3 top-7 -translate-y-1/2 text-gray-400 ${emailTouched && !isEmailValid ? "text-red-500" : "text-gray-300"}`}
                    />
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => {
                        const v = e.target.value;
                        setemail(v);
                        setEmailTouched(true);
                        const valid = validateEmail(v);
                        setIsEmailValid(valid);
                      }}
                      className={`w-full border ${emailTouched && !isEmailValid ? "border-red-500 text-red-500" : "border-gray-300"} rounded-md pl-10 p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      placeholder="Enter your email"
                    />
                    {emailTouched && !isEmailValid && (
                      <p className="text-red-600 text-sm">
                        <div className="rounded-full border border-red-500 inline-flex items-center justify-center mr-1">
                          <ExclamationMarkIcon size={10} className="inline" />
                        </div>
                        Invalid email, Please enter correct email
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center w-full">
                  <button
                    disabled={!isEmailValid || email === ""}
                    type="button"
                    onClick={() => goToOtpScreen()}
                    className={`flex items-center px-5 bg-blue-600 text-white py-3 rounded-lg  ${!isEmailValid || email === "" ? "opacity-50 cursor-not-allowed hover:shadow-none hover:scale-100" : "transition-all duration-300 shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 hover:scale-105"}`}
                  >
                    Verify
                    <ArrowRightIcon size={20} className="ml-2 text-white" />
                  </button>
                </div>
                <div className="mt-5 text-center font-semibold">
                  <span className="text-gray-500">Remember password? </span>
                  <span
                    onClick={goToLogin}
                    className="text-blue-600 hover:underline"
                  >
                    Sign in
                  </span>
                </div>
              </div>
            </>
          )}
          {/* OTP screen content */}
          {isOtpScreen && (
            <>
              <p className="font-semibold mt-5">Verify email</p>
              <p className="text-gray-600 text-sm">
                We sent you an email with a 4-digit code to your inbox
              </p>
              <p className="text-gray-600 text-sm">
                Please check your email and enter it here
              </p>
              <div className="mt-2 w-full md:px-15">
                <div className="pt-5 flex flex-col items-center">
                  <div className="relative mb-4">
                    <div className="flex space-x-2">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <input
                          key={i}
                          type="text"
                          maxLength={1}
                          className={`w-12 h-12 border border-gray-300 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  {otpCountdown > 0 ? (
                    <div className="text-sm">
                      <span className="text-gray-500">
                        Request a new code after{" "}
                      </span>
                      <span className="text-blue-600 font-mono">
                        {`${Math.floor(otpCountdown / 60)
                          .toString()
                          .padStart(2, "0")}:${(otpCountdown % 60)
                          .toString()
                          .padStart(2, "0")}`}
                      </span>
                    </div>
                  ) : (
                    <div className="text-sm">
                      <span className="text-gray-500">
                        Didn&apos;t receive the code?{" "}
                      </span>
                      <button
                        type="button"
                        onClick={handleResend}
                        className="text-blue-600 hover:underline font-semibold"
                      >
                        Resend
                      </button>
                    </div>
                  )}

                  <div className="flex flex-col items-center justify-center w-full mt-10 mb-5">
                    <button
                      type="button"
                      onClick={() => goToNewPassword()}
                      className="flex items-center px-5 bg-blue-600 text-white py-3 rounded-lg transition-all duration-300 shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 hover:scale-105"
                    >
                      Submit
                    </button>
                  </div>

                  <div className="text-sm mt-2">
                    <span className="text-gray-500 font-semibold">
                      Remember password?{" "}
                    </span>
                    <span
                      onClick={goToLogin}
                      className="text-blue-600 hover:underline font-semibold"
                    >
                      Sign in
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}
          {/* New password  screen content */}
          {isNewPasswordScreen && (
            <>
              <p className="font-semibold mt-5">New password</p>
              <p className="text-gray-600 text-sm">
                Create a strong new password to secure your account
              </p>
              <div className="mt-10 w-full md:px-15">
                <div>
                  <label htmlFor="password">
                    New Password<span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <LockIcon
                      size={20}
                      className="absolute left-3 top-7 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="password"
                      id="password"
                      className="w-full border border-gray-300 rounded-md pl-10 p-3 mt-1 mb-4 
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter new password"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="password">
                    Confirm Password<span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <LockIcon
                      size={20}
                      className="absolute left-3 top-7 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="password"
                      id="password"
                      className="w-full border border-gray-300 rounded-md pl-10 p-3 mt-1 mb-4 
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Confirm new password"
                    />
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center w-full">
                  <button
                    type="submit"
                    className="px-5 bg-blue-600 text-white py-3 rounded-lg transition-all duration-300 shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 hover:scale-105"
                  >
                    Reset password
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
