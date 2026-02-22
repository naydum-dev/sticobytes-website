import React from "react";
import { Helmet } from "react-helmet-async";
import Hero from "../components/sections/Hero";
import LatestBlogs from "../components/sections/LatestBlogs";
import Newsletter from "../components/sections/Newsletter";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import Badge from "../components/common/Badge";
import { FaRocket } from "react-icons/fa";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>
          Sticobytes | Digital Agency & Gadget Store in Umuahia, Nigeria
        </title>
        <meta
          name="description"
          content="Sticobytes is a digital agency in Umuahia, Abia State, Nigeria offering web development, graphics design, business branding, digital literacy training, and gadget sales."
        />
        <meta
          name="keywords"
          content="digital agency Nigeria, web development Umuahia, graphics design Abia State, business branding Nigeria, React training, SQL training, digital literacy, gadgets Nigeria, buy gadgets Umuahia"
        />
        <link rel="canonical" href="https://sticobytes.com" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Sticobytes | Digital Agency & Gadget Store in Umuahia, Nigeria"
        />
        <meta
          property="og:description"
          content="Sticobytes is a digital agency in Umuahia, Abia State, Nigeria offering web development, graphics design, business branding, digital literacy training, and gadget sales."
        />
        <meta property="og:url" content="https://sticobytes.com" />
        <meta property="og:site_name" content="Sticobytes" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Sticobytes | Digital Agency & Gadget Store in Umuahia, Nigeria"
        />
        <meta
          name="twitter:description"
          content="Sticobytes is a digital agency in Umuahia, Abia State, Nigeria offering web development, graphics design, business branding, digital literacy training, and gadget sales."
        />
      </Helmet>

      {/* Hero Section */}
      <Hero />

      {/* Services Preview Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <Badge variant="primary" size="lg" rounded="full" className="mb-4">
              Our Services
            </Badge>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy-500 mb-4">
              What We Offer
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive digital solutions tailored to your business needs
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Web Development */}
            <Card hover className="text-center">
              <div className="py-8">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-primary-500"
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
                <h3 className="text-xl font-heading font-semibold text-navy-500 mb-2">
                  Web Development
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Modern, responsive websites built with cutting-edge
                  technologies
                </p>
                <Badge variant="primary" size="sm" rounded="full">
                  React, Node.js
                </Badge>
              </div>
            </Card>

            {/* Graphics Design */}
            <Card hover className="text-center">
              <div className="py-8">
                <div className="w-16 h-16 bg-light-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-navy-500"
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
                <h3 className="text-xl font-heading font-semibold text-navy-500 mb-2">
                  Graphics Design
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Creative designs that capture your brand's essence
                </p>
                <Badge variant="info" size="sm" rounded="full">
                  Branding, Logos
                </Badge>
              </div>
            </Card>

            {/* Business Branding */}
            <Card hover className="text-center">
              <div className="py-8">
                <div className="w-16 h-16 bg-navy-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-navy-500"
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
                <h3 className="text-xl font-heading font-semibold text-navy-500 mb-2">
                  Business Branding
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Build a strong, memorable brand identity
                </p>
                <Badge variant="secondary" size="sm" rounded="full">
                  Strategy
                </Badge>
              </div>
            </Card>

            {/* Training */}
            <Card hover className="text-center">
              <div className="py-8">
                <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-success"
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
                <h3 className="text-xl font-heading font-semibold text-navy-500 mb-2">
                  Digital Training
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Learn web development, React, SQL, and more
                </p>
                <Badge variant="success" size="sm" rounded="full">
                  Mentorship
                </Badge>
              </div>
            </Card>
          </div>

          {/* CTA Button */}
          <div className="text-center mt-12">
            <Button
              variant="primary"
              size="lg"
              onClick={() => (window.location.href = "/services")}
            >
              View All Services
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-4 bg-light-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Content */}
            <div>
              <Badge
                variant="secondary"
                size="lg"
                rounded="full"
                className="mb-4"
              >
                Why Sticobytes?
              </Badge>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy-500 mb-6">
                Your Partner in Digital Success
              </h2>
              <p className="text-gray-600 mb-6">
                At Sticobytes, we don't just build websites and designs – we
                create digital experiences that drive results. With years of
                expertise and a passion for innovation, we're committed to
                helping your business thrive.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <svg
                      className="w-5 h-5 text-primary-500"
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
                  <div>
                    <h4 className="font-heading font-semibold text-navy-500 mb-1">
                      Expert Team
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Skilled professionals with years of industry experience
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <svg
                      className="w-5 h-5 text-primary-500"
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
                  <div>
                    <h4 className="font-heading font-semibold text-navy-500 mb-1">
                      Quality Guaranteed
                    </h4>
                    <p className="text-gray-600 text-sm">
                      We deliver nothing but the best, every single time
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <svg
                      className="w-5 h-5 text-primary-500"
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
                  <div>
                    <h4 className="font-heading font-semibold text-navy-500 mb-1">
                      Affordable Pricing
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Premium quality at prices that fit your budget
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => (window.location.href = "/about")}
                >
                  Learn More About Us
                </Button>
              </div>
            </div>

            {/* Right - Image Placeholder */}
            <Card variant="gradient" className="p-12">
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  <FaRocket className="text-6xl text-white" />
                </div>
                <h3 className="text-2xl font-heading font-bold mb-4">
                  Ready to Get Started?
                </h3>
                <p className="text-white/90 mb-6">
                  Let's turn your vision into reality. Contact us today!
                </p>
                <Button
                  variant="light"
                  size="lg"
                  fullWidth
                  onClick={() => (window.location.href = "/contact")}
                >
                  Contact Us Now
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Latest Blogs Section */}
      <LatestBlogs />

      {/* Newsletter Section */}
      <Newsletter />
    </div>
  );
};

export default Home;
