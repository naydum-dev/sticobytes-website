import React from "react";
import Button from "../common/Button";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-navy-500 via-navy-600 to-primary-500 text-white overflow-hidden">
      {/* Background Pattern/Decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-primary-300 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-light-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-primary-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Content Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="text-center lg:text-left animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-success rounded-full animate-pulse"></span>
              <span className="text-sm font-medium">
                Driving Progress Through Technology...
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight">
              Welcome to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-light-400">
                Sticobytes
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto lg:mx-0">
              Powering Abia's digital transformation. Your local hub for
              computer services, web development, graphics design, gadgets, and
              practical tech training.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                variant="light"
                size="lg"
                onClick={() => (window.location.href = "/services")}
              >
                Explore Services
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-navy-500"
                onClick={() => (window.location.href = "/contact")}
              >
                Get in Touch
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/20">
              <div>
                <div className="text-3xl md:text-4xl font-bold font-heading text-primary-300">
                  50+
                </div>
                <div className="text-sm md:text-base text-white/80 mt-1">
                  Projects Completed
                </div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold font-heading text-primary-300">
                  100+
                </div>
                <div className="text-sm md:text-base text-white/80 mt-1">
                  Happy Clients
                </div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold font-heading text-primary-300">
                  5+
                </div>
                <div className="text-sm md:text-base text-white/80 mt-1">
                  Years Experience
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Service Icons Grid */}
          <div className="relative animate-slide-up">
            {/* Service Cards Grid */}
            <div className="grid grid-cols-2 gap-4">
              {/* Web Development Card */}
              <div className="group bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-float">
                <div className="w-14 h-14 bg-primary-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-500 transition-colors duration-300">
                  <svg
                    className="w-8 h-8 text-primary-500 group-hover:text-white transition-colors duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                  </svg>
                </div>
                <h4 className="font-heading font-semibold text-navy-500 mb-1 text-sm">
                  Web Development
                </h4>
                <p className="text-xs text-gray-600">Modern websites</p>
              </div>

              {/* Graphics Design Card */}
              <div className="group bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-float-delayed">
                <div className="w-14 h-14 bg-light-200 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-500 transition-colors duration-300">
                  <svg
                    className="w-8 h-8 text-navy-500 group-hover:text-white transition-colors duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                    />
                  </svg>
                </div>
                <h4 className="font-heading font-semibold text-navy-500 mb-1 text-sm">
                  Graphics Design
                </h4>
                <p className="text-xs text-gray-600">Creative visuals</p>
              </div>

              {/* Business Branding Card */}
              <div className="group bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-float">
                <div className="w-14 h-14 bg-navy-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-500 transition-colors duration-300">
                  <svg
                    className="w-8 h-8 text-navy-500 group-hover:text-white transition-colors duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h4 className="font-heading font-semibold text-navy-500 mb-1 text-sm">
                  Business Branding
                </h4>
                <p className="text-xs text-gray-600">Strong identity</p>
              </div>

              {/* Gadget Sales Card */}
              <div className="group bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-float-delayed">
                <div className="w-14 h-14 bg-primary-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-500 transition-colors duration-300">
                  <svg
                    className="w-8 h-8 text-primary-500 group-hover:text-white transition-colors duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h4 className="font-heading font-semibold text-navy-500 mb-1 text-sm">
                  Gadget Sales
                </h4>
                <p className="text-xs text-gray-600">Latest devices</p>
              </div>

              {/* Mentorship & Training Card (Full Width) */}
              <div className="group bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 col-span-2 animate-float">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-light-200 rounded-lg flex items-center justify-center group-hover:bg-primary-500 transition-colors duration-300 flex-shrink-0">
                    <svg
                      className="w-8 h-8 text-navy-500 group-hover:text-white transition-colors duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-heading font-semibold text-navy-500 mb-1 text-sm">
                      Mentorship & Training
                    </h4>
                    <p className="text-xs text-gray-600">
                      Learn React, SQL, Web Development & more
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary-300 rounded-full opacity-20 blur-2xl"></div>
            <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-light-400 rounded-full opacity-20 blur-2xl"></div>
          </div>
        </div>
      </div>

      {/* Wave Divider at Bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="#F9FAFB"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
