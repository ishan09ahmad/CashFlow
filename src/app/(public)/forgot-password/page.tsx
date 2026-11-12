"use client";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
// import { Link, useNavigate } from "react-router";
import { ArrowLeft, ArrowRight, Mail, ShieldCheck, Wallet } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ForgotPassword() {
  const [form, setForm] = useState({
    email: "",
  });

  const [formError, setFormError] = useState({
    email: "",
  });

  const [sendingOtp, setSendingOtp] = useState(false);

  const [isOtpSent, setIsOtpSent] = useState(false);

  const [countdown, setCountdown] = useState(60);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((form) => ({
      ...form,
      [name]: value,
    }));
    setFormError({
      email: "",
    });
  };

  const router = useRouter();

  const handleOtpSending = () => {
    if (!checkFormValidation()) {
      return;
    }
    setCountdown(60);
    setSendingOtp(true);
    setIsOtpSent(true);
  };

  const checkFormValidation = () => {
    const email = form.email.trim();
    const error = {
      email: "",
    };

    if (!email) {
      error.email = "Email is required.";
    } else if (!email.includes("@")) {
      error.email = "Email must contain an '@' symbol.";
    } else if (!/^[a-zA-Z0-9._%+-]+@/.test(email)) {
      error.email = "The username before the '@' contains invalid characters.";
    } else if (!/@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      error.email = "Please enter a valid email address.";
    }

    setFormError(error);
    return !error.email;
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (!isOtpSent) return;
    e.preventDefault();
    router.push("/reset-password");
  };

  useEffect(() => {
    if (!sendingOtp) {
      return;
    }
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setSendingOtp(false);
          return 60;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [sendingOtp]);

  return (
    <main className="min-h-[calc(100vh-72px)] bg-stone-50">
      <div className="mx-auto grid min-h-[calc(100vh-72px)] max-w-300 items-center gap-10 px-4 sm:px-8 py-12 md:grid-cols-2 ">
        <div className="w-full max-w-md mx-auto">
          <div className="rounded-3xl border border-stone-200 bg-white p-7 shadow-sm md:p-9">
            <h2 className="text-2xl font-bold text-stone-800">
              Forgot password?
            </h2>

            <p className="mt-2 text-sm leading-6 text-stone-500">
              Enter your email address and we'll send you an OTP to reset your
              password.
            </p>

            <form onSubmit={handleFormSubmit} className="mt-8">
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-stone-700"
              >
                Email address
              </label>

              <div>
                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
                  />

                  <input
                    id="email"
                    type="text"
                    name="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full rounded-xl border border-stone-200 bg-stone-50 py-3 pl-10 pr-4 text-sm text-stone-700 outline-none transition placeholder:text-stone-400 focus:border-red-300 focus:bg-white focus:ring-2 focus:ring-red-100"
                  />
                </div>
                {formError.email && (
                  <span className=" text-xs ml-3 font-semibold text-red-500">
                    {formError.email}
                  </span>
                )}
              </div>

              <button
                type="button"
                disabled={sendingOtp}
                onClick={handleOtpSending}
                className="mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 py-3.5 text-sm font-semibold text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {sendingOtp ? `Resend OTP in ${countdown}s` : "Send OTP"}
              </button>

              <button
                disabled={!isOtpSent}
                type="submit"
                className="mt-3 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-red-700 py-3.5 text-sm font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Continue
                <ArrowRight size={17} />
              </button>
            </form>

            <Link
              href="/login"
              className="mt-6 flex items-center justify-center gap-2 text-sm font-semibold text-stone-500 transition hover:text-red-700"
            >
              <ArrowLeft size={16} />
              Back to Login
            </Link>
          </div>
        </div>

        <div className="hidden md:block ">
          <div className="max-w-md">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-700">
              <Wallet size={26} />
            </div>

            <h1 className="text-4xl font-bold leading-tight text-stone-800">
              Get back to managing your{" "}
              <span className="text-red-700">expenses.</span>
            </h1>

            <p className="mt-5 leading-7 text-stone-500">
              Don't worry if you've forgotten your password. Enter your email
              and we'll help you get back into your account.
            </p>

            <div className="mt-8 flex items-center gap-3 text-sm font-medium text-stone-600">
              <ShieldCheck size={19} className="text-red-600" />
              Your account remains secure.
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
