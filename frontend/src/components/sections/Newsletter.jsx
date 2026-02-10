import React, { useState } from "react";
import Button from "../common/Button";
import Input from "../common/Input";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      setStatus("error");
      setMessage("Please enter your email address");
      return;
    }

    if (!emailRegex.test(email)) {
      setStatus("error");
      setMessage("Please enter a valid email address");
      return;
    }

    // Simulate API call (later we'll connect to backend)
    setStatus("loading");

    setTimeout(() => {
      setStatus("success");
      setMessage(
        "Thank you for subscribing! Check your inbox for confirmation.",
      );
      setEmail("");

      // Reset success message after 5 seconds
      setTimeout(() => {
        setStatus("idle");
        setMessage("");
      }, 5000);
    }, 1500);
  };

  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500 via-navy-500 to-navy-600"></div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-light-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-light-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Content */}
      <div className="relative max-w-4xl mx-auto text-center">
        {/* Icon */}
        <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
          Stay in the Loop
        </h2>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Get the latest tutorials, tips, and updates delivered straight to your
          inbox. Join our community of learners and stay ahead!
        </p>

        {/* Newsletter Form */}
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <Input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                disabled={status === "loading" || status === "success"}
                className="w-full"
              />
            </div>
            <Button
              type="submit"
              variant="light"
              size="lg"
              disabled={status === "loading" || status === "success"}
              className="whitespace-nowrap"
            >
              {status === "loading" ? "Subscribing..." : "Subscribe"}
            </Button>
          </div>

          {/* Status Messages */}
          {status === "success" && (
            <div className="mt-4 p-4 bg-success/20 backdrop-blur-sm border border-success/30 rounded-lg text-white text-sm animate-fade-in">
              <div className="flex items-center justify-center gap-2">
                <svg
                  className="w-5 h-5 text-success"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{message}</span>
              </div>
            </div>
          )}

          {status === "error" && (
            <div className="mt-4 p-4 bg-error/20 backdrop-blur-sm border border-error/30 rounded-lg text-white text-sm animate-fade-in">
              <div className="flex items-center justify-center gap-2">
                <svg
                  className="w-5 h-5 text-error"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{message}</span>
              </div>
            </div>
          )}
        </form>

        {/* Privacy Note */}
        <p className="text-sm text-white/60 mt-6">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
};

export default Newsletter;
