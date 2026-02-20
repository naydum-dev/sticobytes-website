import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>About Us | Sticobytes Digital Agency Umuahia, Nigeria</title>
        <meta
          name="description"
          content="Founded in Umuahia, Abia State, Sticobytes is on a mission to make quality technology services and digital skills accessible to everyone in the community."
        />
        <meta
          name="keywords"
          content="about Sticobytes, digital agency Umuahia, tech company Abia State, web development Nigeria, community digital training, gadgets Umuahia"
        />
        <link rel="canonical" href="https://sticobytes.com/about" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="About Us | Sticobytes Digital Agency Umuahia, Nigeria"
        />
        <meta
          property="og:description"
          content="Founded in Umuahia, Abia State, Sticobytes is on a mission to make quality technology services and digital skills accessible to everyone in the community."
        />
        <meta property="og:url" content="https://sticobytes.com/about" />
        <meta property="og:site_name" content="Sticobytes" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="About Us | Sticobytes Digital Agency Umuahia, Nigeria"
        />
        <meta
          name="twitter:description"
          content="Founded in Umuahia, Abia State, Sticobytes is on a mission to make quality technology services and digital skills accessible to everyone in the community."
        />
      </Helmet>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-navy-600 via-navy-500 to-primary-600 text-white py-24 overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-primary-400 opacity-10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-light-300 opacity-10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 bg-white/10 border border-white/20 rounded-full text-sm font-medium text-white/90 mb-6">
            Our Story
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6 leading-tight">
            Bringing Digital Excellence to the Heart of the Community
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Founded in Umuahia, Sticobytes is on a mission to make quality
            technology services and digital skills accessible to everyone —
            starting right where we are.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left - Story Card */}
            <div className="bg-gradient-to-br from-navy-600 to-primary-600 rounded-3xl p-10 text-white">
              <div className="text-6xl mb-6">🌱</div>
              <h2 className="text-3xl font-bold font-heading mb-4">
                Born From a Bold Question
              </h2>
              <p className="text-white/90 text-lg leading-relaxed">
                Why should world-class digital services only exist in big
                cities?
              </p>
              <div className="mt-8 pt-8 border-t border-white/20 grid grid-cols-2 gap-6">
                <div>
                  <p className="text-3xl font-bold text-primary-300">2023</p>
                  <p className="text-white/70 text-sm mt-1">Year Founded</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary-300">Umuahia</p>
                  <p className="text-white/70 text-sm mt-1">
                    Abia State, Nigeria
                  </p>
                </div>
              </div>
            </div>

            {/* Right - Story Text */}
            <div>
              <span className="inline-block px-4 py-1.5 bg-primary-100 text-primary-600 rounded-full text-sm font-medium mb-4">
                Our Story
              </span>
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-navy-600 mb-6">
                Rooted Locally, Thinking Globally
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Sticobytes was born in 2023 from a simple but powerful question:
                why should world-class digital services only exist in big
                cities? We started in Ezenobizi Umuopara, a community in
                Umuahia, with a vision to bridge the gap between technology and
                the people who need it most.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                We are certified tech professionals who chose to plant our roots
                locally and grow something meaningful — not just a business, but
                a movement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-light-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-primary-100 text-primary-600 rounded-full text-sm font-medium mb-4">
              Our Mission
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-navy-600 mb-6">
              What Drives Us Every Day
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              To deliver quality digital services and products at the community
              level, and to equip the next generation with the digital skills
              they need to thrive in a technology-driven world.
            </p>
          </div>

          {/* Mission Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-primary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold font-heading text-navy-600 mb-3">
                Community First
              </h3>
              <p className="text-gray-600">
                We serve our local community before anyone else, bringing
                technology closer to those who need it most.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
              <div className="w-16 h-16 bg-navy-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-navy-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold font-heading text-navy-600 mb-3">
                Quality Excellence
              </h3>
              <p className="text-gray-600">
                We deliver world-class digital services regardless of geography,
                proving excellence has no address.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold font-heading text-navy-600 mb-3">
                Next Generation
              </h3>
              <p className="text-gray-600">
                We invest in children and young people, training the innovators
                and problem-solvers of tomorrow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-primary-100 text-primary-600 rounded-full text-sm font-medium mb-4">
              What We Do
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-navy-600 mb-4">
              Two Pillars, One Vision
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Sticobytes operates across two core areas to serve our community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Pillar 1 - Digital Services */}
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-3xl p-10 border border-primary-200">
              <div className="w-14 h-14 bg-primary-600 rounded-2xl flex items-center justify-center mb-6">
                <svg
                  className="w-7 h-7 text-white"
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
              <h3 className="text-2xl font-bold font-heading text-navy-600 mb-4">
                Professional Digital Services
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                We offer end-to-end digital solutions built to the highest
                standard.
              </p>
              <ul className="space-y-3">
                {[
                  "Web Design & Development",
                  "Graphics Design",
                  "Business Branding",
                  "JavaScript & React Training",
                  "AI & Digital Literacy Training",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-gray-700"
                  >
                    <div className="w-5 h-5 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-3 h-3 text-white"
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
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Pillar 2 - Gadgets */}
            <div className="bg-gradient-to-br from-navy-50 to-navy-100 rounded-3xl p-10 border border-navy-200">
              <div className="w-14 h-14 bg-navy-600 rounded-2xl flex items-center justify-center mb-6">
                <svg
                  className="w-7 h-7 text-white"
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
              <h3 className="text-2xl font-bold font-heading text-navy-600 mb-4">
                Quality Gadget Sales
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                We make reliable technology accessible to people in our
                community by selling quality gadgets at fair prices.
              </p>
              <ul className="space-y-3">
                {[
                  "Smartphones & Accessories",
                  "Laptops & Computers",
                  "Networking Equipment",
                  "Quality Assured Products",
                  "WhatsApp Order & Delivery",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-gray-700"
                  >
                    <div className="w-5 h-5 bg-navy-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-3 h-3 text-white"
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
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* The Bigger Picture Section */}
      <section className="py-20 bg-gradient-to-br from-navy-600 to-primary-600 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 bg-white/10 border border-white/20 rounded-full text-sm font-medium text-white/90 mb-6">
            The Bigger Picture
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">
            Investing in the Next Generation
          </h2>
          <p className="text-xl text-white/90 leading-relaxed mb-8">
            We know our community is still warming up to technology. That
            doesn't discourage us — it drives us. We are actively seeking
            sponsorships and partnerships to fund free digital training for
            children within our community, because we believe the best
            investment anyone can make is in the next generation.
          </p>
          <p className="text-lg text-white/80 leading-relaxed mb-12">
            Every child we train today is a problem-solver, innovator, and
            leader tomorrow.
          </p>

          {/* Why It Matters */}
          <div className="bg-white/10 border border-white/20 rounded-2xl p-8 backdrop-blur-sm">
            <h3 className="text-2xl font-bold font-heading mb-4">
              Why It Matters
            </h3>
            <p className="text-white/90 text-lg leading-relaxed">
              Technology is not a privilege. It is a tool — and every community
              deserves access to it. Sticobytes exists to make that happen, one
              training session, one website, one gadget at a time.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-navy-600 mb-4">
            Ready to Work With Us?
          </h2>
          <p className="text-lg text-gray-600 mb-10">
            Whether you need a website, a brand identity, digital training, or
            just want to buy a gadget — we are here for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/services"
              className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-colors duration-200"
            >
              View Our Services
            </Link>
            <Link
              to="/contact"
              className="px-8 py-4 border-2 border-navy-600 text-navy-600 hover:bg-navy-600 hover:text-white font-semibold rounded-xl transition-colors duration-200"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
