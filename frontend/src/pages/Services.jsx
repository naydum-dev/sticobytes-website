import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { getAllServices, createWhatsAppLink } from "../services/serviceApi";

// Service Icons
const ServiceIcons = {
  Development: () => (
    <svg
      className="w-7 h-7"
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
  ),
  Design: () => (
    <svg
      className="w-7 h-7"
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
  ),
  Branding: () => (
    <svg
      className="w-7 h-7"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
      />
    </svg>
  ),
  Marketing: () => (
    <svg
      className="w-7 h-7"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
      />
    </svg>
  ),
};

const categoryColors = {
  Development: {
    bg: "bg-blue-50",
    text: "text-blue-600",
    border: "border-blue-100",
    icon: "bg-blue-100 text-blue-600",
    badge: "bg-blue-100 text-blue-700",
  },
  Design: {
    bg: "bg-purple-50",
    text: "text-purple-600",
    border: "border-purple-100",
    icon: "bg-purple-100 text-purple-600",
    badge: "bg-purple-100 text-purple-700",
  },
  Branding: {
    bg: "bg-amber-50",
    text: "text-amber-600",
    border: "border-amber-100",
    icon: "bg-amber-100 text-amber-600",
    badge: "bg-amber-100 text-amber-700",
  },
  Marketing: {
    bg: "bg-green-50",
    text: "text-green-600",
    border: "border-green-100",
    icon: "bg-green-100 text-green-600",
    badge: "bg-green-100 text-green-700",
  },
};

const WhatsAppIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const stats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "100%", label: "Client Satisfaction" },
  { value: "3+", label: "Years Experience" },
  { value: "24/7", label: "Support Available" },
];

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await getAllServices();
      setServices(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to load services. Please try again later.");
      console.error("Error loading services:", err);
    } finally {
      setLoading(false);
    }
  };

  const categories = ["All", ...new Set(services.map((s) => s.category))];

  const filteredServices =
    selectedCategory === "All"
      ? services
      : services.filter((s) => s.category === selectedCategory);

  const getColors = (category) =>
    categoryColors[category] || categoryColors.Development;

  const getIcon = (category) => {
    const Icon = ServiceIcons[category] || ServiceIcons.Development;
    return <Icon />;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Our Services | Sticobytes Digital Agency Umuahia, Nigeria</title>
        <meta
          name="description"
          content="Explore Sticobytes professional digital services including web development, graphics design, business branding, social media management and SEO optimization in Umuahia, Abia State, Nigeria."
        />
        <meta
          name="keywords"
          content="web development Nigeria, graphics design Umuahia, business branding Abia State, social media management Nigeria, SEO optimization Umuahia"
        />
        <link rel="canonical" href="https://sticobytes.com/services" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Our Services | Sticobytes Digital Agency"
        />
        <meta
          property="og:description"
          content="Professional digital services for businesses in Nigeria."
        />
        <meta property="og:url" content="https://sticobytes.com/services" />
      </Helmet>

      {/* HERO */}
      <section className="bg-navy-900 text-white py-20 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary-500/10"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-primary-500/5"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block bg-primary-500/20 border border-primary-400/30 text-primary-300 text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-6">
              What We Offer
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold font-heading mb-6 leading-tight">
              Professional Digital Services
              <span className="text-primary-400"> for Your Business</span>
            </h1>
            <p className="text-lg text-white/70 mb-10">
              From building your website to growing your brand online — we
              deliver results that move your business forward.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`https://wa.me/2348113393564?text=${encodeURIComponent("Hi Sticobytes! I would like to book a free consultation.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-colors"
              >
                <WhatsAppIcon />
                Book Free Consultation
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors"
              >
                Get a Quote
              </a>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-16 max-w-3xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold text-primary-400">
                  {stat.value}
                </p>
                <p className="text-sm text-white/50 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORY FILTER */}
      <section className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  selectedCategory === category
                    ? "bg-navy-800 text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading && (
            <div className="flex items-center justify-center py-20">
              <div className="w-10 h-10 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {error && (
            <div className="text-center py-12">
              <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-md mx-auto">
                <p className="text-red-600 mb-4">{error}</p>
                <button
                  onClick={fetchServices}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map((service) => {
                const colors = getColors(service.category);
                return (
                  <div
                    key={service.id}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col"
                  >
                    {/* Card Top Bar */}
                    <div
                      className={`h-1.5 w-full ${colors.text.replace("text", "bg")}`}
                    ></div>

                    <div className="p-7 flex flex-col flex-1">
                      {/* Icon + Category */}
                      <div className="flex items-center justify-between mb-5">
                        <div
                          className={`w-14 h-14 rounded-xl flex items-center justify-center ${colors.icon}`}
                        >
                          {getIcon(service.category)}
                        </div>
                        <span
                          className={`text-xs font-semibold px-3 py-1 rounded-full ${colors.badge}`}
                        >
                          {service.category}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-navy-800 font-heading mb-3">
                        {service.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-500 text-sm leading-relaxed mb-5">
                        {service.description}
                      </p>

                      {/* Features */}
                      {service.features && service.features.length > 0 && (
                        <div className="mb-6 flex-1">
                          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
                            What is Included
                          </p>
                          <ul className="space-y-2">
                            {service.features
                              .slice(0, 5)
                              .map((feature, index) => (
                                <li
                                  key={index}
                                  className="flex items-center gap-2 text-sm text-gray-600"
                                >
                                  <span
                                    className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 text-xs ${colors.icon}`}
                                  >
                                    ✓
                                  </span>
                                  {feature}
                                </li>
                              ))}
                            {service.features.length > 5 && (
                              <li
                                className={`text-xs font-semibold ml-6 ${colors.text}`}
                              >
                                +{service.features.length - 5} more included
                              </li>
                            )}
                          </ul>
                        </div>
                      )}

                      {/* Price + Duration */}
                      <div
                        className={`rounded-xl p-4 mb-5 ${colors.bg} border ${colors.border}`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                              Starting From
                            </p>
                            <p className={`text-lg font-bold ${colors.text}`}>
                              {service.price_range || "Contact for pricing"}
                            </p>
                          </div>
                          {service.duration && (
                            <div className="text-right">
                              <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                                Timeline
                              </p>
                              <p className="text-sm font-semibold text-gray-700">
                                {service.duration}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* CTA Buttons */}
                      <div className="flex gap-3">
                        <a
                          href={`https://wa.me/2348113393564?text=${encodeURIComponent(service.whatsapp_message || `Hi Sticobytes! I am interested in your ${service.title} service.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 py-3 bg-green-500 text-white text-sm font-semibold rounded-xl hover:bg-green-600 transition-colors"
                        >
                          <WhatsAppIcon />
                          WhatsApp
                        </a>
                        <a
                          href="/contact"
                          className="flex-1 flex items-center justify-center py-3 bg-navy-800 text-white text-sm font-semibold rounded-xl hover:bg-primary-600 transition-colors"
                        >
                          Get Quote
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* FREE CONSULTATION SECTION */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-navy-900 rounded-3xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left */}
              <div className="p-10 lg:p-14">
                <span className="inline-block bg-primary-500/20 text-primary-300 text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-6">
                  Free Offer
                </span>
                <h2 className="text-3xl font-bold text-white font-heading mb-4">
                  Book a Free
                  <span className="text-primary-400"> 30-Minute</span>{" "}
                  Consultation
                </h2>
                <p className="text-white/60 mb-8">
                  Not sure where to start? Let us talk about your business goals
                  and show you exactly how we can help — completely free, no
                  strings attached.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    "Discuss your project goals",
                    "Get expert advice and recommendations",
                    "Receive a custom price estimate",
                    "No commitment required",
                  ].map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-3 text-sm text-white/70"
                    >
                      <span className="w-5 h-5 rounded-full bg-primary-500/20 text-primary-400 flex items-center justify-center text-xs flex-shrink-0">
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href={`https://wa.me/2348113393564?text=${encodeURIComponent("Hi Sticobytes! I would like to book a free 30-minute consultation to discuss my project.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-colors"
                >
                  <WhatsAppIcon />
                  Book Free Consultation
                </a>
              </div>

              {/* Right */}
              <div className="bg-navy-800 p-10 lg:p-14 flex flex-col justify-center">
                <h3 className="text-xl font-bold text-white mb-6">
                  Why Choose Sticobytes?
                </h3>
                <div className="space-y-5">
                  {[
                    {
                      icon: "🏆",
                      title: "Certified Professionals",
                      desc: "Certiport Certified & Nigeria Computer Professionals Level 3",
                    },
                    {
                      icon: "📍",
                      title: "Based in Umuahia",
                      desc: "Local agency that understands the Nigerian market",
                    },
                    {
                      icon: "⚡",
                      title: "Fast Delivery",
                      desc: "We meet deadlines and deliver quality on time",
                    },
                    {
                      icon: "🤝",
                      title: "Ongoing Support",
                      desc: "We don't disappear after delivery — we stay with you",
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <span className="text-2xl">{item.icon}</span>
                      <div>
                        <p className="text-sm font-semibold text-white">
                          {item.title}
                        </p>
                        <p className="text-xs text-white/50 mt-0.5">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="bg-primary-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white font-heading mb-4">
            Ready to Take Your Business Digital?
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Join businesses in Umuahia and across Nigeria that trust Sticobytes
            to deliver outstanding digital results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`https://wa.me/2348113393564?text=${encodeURIComponent("Hi Sticobytes! I am ready to get started. I would like to discuss my project.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors"
            >
              <WhatsAppIcon />
              Chat on WhatsApp
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-primary-600 transition-colors"
            >
              Send us a Message
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
