import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { registerForCourse } from "../services/courseApi.js";

const courses = [
  {
    id: 1,
    name: "Digital Literacy Course",
    description:
      "Perfect for complete beginners. Master essential computer and internet skills in just 4 weekends.",
    duration: "4 Weeks (Weekends Only)",
    hours: "16 Hours",
    price: 30000,
    earlyBird: 25000,
    level: "Beginner",
    color: "from-blue-500 to-blue-700",
    modules: [
      "Computer & Internet Basics",
      "Email & Communication",
      "Google Workspace",
      "Social Media for Business",
      "Online Safety & Security",
      "Digital Skills for Earning",
    ],
  },
  {
    id: 2,
    name: "Email Development Course",
    description:
      "Learn to build professional email templates from scratch. From HTML basics to responsive design, dark mode and real world portfolio projects.",
    duration: "8 Weeks (Weekends Only)",
    hours: "32 Hours",
    price: 50000,
    earlyBird: 40000,
    level: "Beginner",
    color: "from-green-500 to-green-700",
    modules: [
      "HTML & CSS Fundamentals for Email",
      "Building Professional Email Templates",
      "Responsive Design for Mobile Devices",
      "Newsletters & Promotional Campaigns",
      "Professional Email Tools & Frameworks",
      "Testing & Debugging Email Clients",
      "Accessibility & Dark Mode",
      "Portfolio Building with Real Projects",
    ],
  },
  {
    id: 3,
    name: "Frontend Web Development",
    description:
      "Learn to build beautiful, responsive websites using HTML, CSS, JavaScript, React and Tailwind CSS.",
    duration: "8 Weeks (Weekends Only)",
    hours: "32 Hours",
    price: 80000,
    earlyBird: 65000,
    level: "Intermediate",
    color: "from-purple-500 to-purple-700",
    modules: [
      "HTML & CSS Fundamentals",
      "JavaScript Essentials",
      "Responsive Design",
      "React.js",
      "Tailwind CSS",
      "Real World Projects",
    ],
  },
  {
    id: 4,
    name: "Backend Web Development",
    description:
      "Learn to build powerful APIs and server-side applications using Node.js, Express and PostgreSQL.",
    duration: "8 Weeks (Weekends Only)",
    hours: "32 Hours",
    price: 80000,
    earlyBird: 65000,
    level: "Intermediate",
    color: "from-orange-500 to-orange-700",
    modules: [
      "Node.js Fundamentals",
      "Express.js & APIs",
      "PostgreSQL & Databases",
      "Authentication & Security",
      "File Uploads & Storage",
      "Real World Projects",
    ],
  },
  {
    id: 5,
    name: "Full Stack Web Development",
    description:
      "The complete package. Master both frontend and backend development and become a Full Stack Developer.",
    duration: "16 Weeks (Weekends Only)",
    hours: "64 Hours",
    price: 150000,
    earlyBird: 120000,
    level: "Comprehensive",
    color: "from-primary-500 to-navy-700",
    modules: [
      "HTML, CSS & JavaScript",
      "React.js & Tailwind CSS",
      "Node.js & Express.js",
      "PostgreSQL & Databases",
      "Authentication & Security",
      "Full Stack Projects",
    ],
  },
];

const formatPrice = (price) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(price);

function Courses() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    course_name: "",
    full_name: "",
    email: "",
    phone: "",
    whatsapp_number: "",
    location: "",
    how_you_heard: "",
  });
  const [loading, setLoading] = useState(false);
  const [registration, setRegistration] = useState(null);
  const [error, setError] = useState(null);

  const handleEnroll = (course) => {
    setSelectedCourse(course);
    setFormData({ ...formData, course_name: course.name });
    setShowForm(true);
    setTimeout(() => {
      document
        .getElementById("registration-form")
        .scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await registerForCourse(formData);
      setRegistration(response.data);
      setShowForm(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  if (registration) {
    return (
      <div>
        <Helmet>
          <title>Registration Successful | Sticobytes</title>
        </Helmet>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16">
          <div className="max-w-lg w-full">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-10 h-10 text-green-500"
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
              </div>
              <h1 className="text-3xl font-bold text-navy-800 font-heading">
                Registration Successful!
              </h1>
              <p className="text-gray-500 mt-2">
                Welcome to Sticobytes, {registration.full_name.split(" ")[0]}!
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-6">
              <div className="bg-navy-800 px-6 py-4">
                <p className="text-xs text-white/60 uppercase tracking-widest mb-1">
                  Registration Number
                </p>
                <p className="text-2xl font-bold text-white font-heading">
                  {registration.registration_number}
                </p>
              </div>
              <div className="px-6 py-5 space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-50">
                  <span className="text-sm text-gray-500">Course</span>
                  <span className="text-sm font-semibold text-navy-800">
                    {registration.course_name}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-50">
                  <span className="text-sm text-gray-500">Student</span>
                  <span className="text-sm font-semibold text-navy-800">
                    {registration.full_name}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-50">
                  <span className="text-sm text-gray-500">Email</span>
                  <span className="text-sm font-semibold text-navy-800">
                    {registration.email}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-gray-500">
                    Payment Deadline
                  </span>
                  <span className="text-sm font-semibold text-red-500">
                    {new Date(registration.payment_deadline).toLocaleDateString(
                      "en-NG",
                      {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      },
                    )}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-6">
              <div className="bg-primary-600 px-6 py-4">
                <h2 className="text-lg font-bold text-white">
                  Payment Instructions
                </h2>
              </div>
              <div className="px-6 py-5">
                <p className="text-sm text-gray-600 mb-4">
                  To secure your spot, please make a bank transfer to the
                  details below:
                </p>
                <div className="bg-gray-50 rounded-xl p-4 space-y-3 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Bank</span>
                    <span className="text-sm font-bold text-navy-800">
                      Moniepoint MFB
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      Account Number
                    </span>
                    <span className="text-sm font-bold text-navy-800 tracking-widest">
                      8268900606
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Account Name</span>
                    <span className="text-sm font-bold text-navy-800">
                      Sticobytes Nig Ltd
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-navy-800">
                    Steps to complete registration:
                  </p>
                  <ol className="space-y-2">
                    {[
                      "Transfer the exact course fee to the account above",
                      `Use your registration number (${registration.registration_number}) as transfer description`,
                      "Take a screenshot of your payment receipt",
                      "Send the receipt to our WhatsApp to confirm your spot",
                    ].map((step, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-sm text-gray-600"
                      >
                        <span className="w-5 h-5 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                          {index + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
              <p className="text-sm text-amber-800">
                <strong>Important:</strong> Your spot is only secured after
                payment confirmation. Please pay before the deadline to avoid
                losing your spot.
              </p>
            </div>

            <a
              href={`https://wa.me/2348113393564?text=${encodeURIComponent(
                `Hi! I just registered for the ${registration.course_name}. My registration number is ${registration.registration_number}. I will be sending my payment receipt shortly.`,
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-4 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-colors"
            >
              Send Payment Receipt on WhatsApp
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>Courses | Sticobytes</title>
        <meta
          name="description"
          content="Learn digital skills with Sticobytes. Courses in Digital Literacy, Email Development, Frontend, Backend and Full Stack Web Development."
        />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <div className="bg-navy-900 text-white py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-block bg-primary-500/20 border border-primary-400/30 text-primary-300 text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
              Sticobytes Training Institute
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold font-heading mb-4">
              Learn Digital Skills That
              <span className="text-primary-400"> Pay</span>
            </h1>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              From complete beginner to full stack developer — our courses are
              designed for Nigerians who want to thrive in the digital economy.
            </p>
            <div className="flex flex-wrap gap-4 justify-center mt-8">
              <div className="flex items-center gap-2 text-sm text-white/70">
                <span className="text-green-400">✓</span> Taught by Certified
                Professionals
              </div>
              <div className="flex items-center gap-2 text-sm text-white/70">
                <span className="text-green-400">✓</span> Certificate of
                Completion
              </div>
              <div className="flex items-center gap-2 text-sm text-white/70">
                <span className="text-green-400">✓</span> Physical & Live Online
              </div>
              <div className="flex items-center gap-2 text-sm text-white/70">
                <span className="text-green-400">✓</span> Max 10 Students per
                Cohort
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-navy-800 font-heading text-center mb-12">
            Our Courses
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col"
              >
                <div
                  className={`bg-gradient-to-r ${course.color} p-6 text-white`}
                >
                  <span className="text-xs font-semibold uppercase tracking-widest bg-white/20 px-2 py-1 rounded-full">
                    {course.level}
                  </span>
                  <h3 className="text-xl font-bold font-heading mt-3">
                    {course.name}
                  </h3>
                  <p className="text-white/80 text-sm mt-1">
                    {course.duration} · {course.hours}
                  </p>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <p className="text-gray-600 text-sm mb-4">
                    {course.description}
                  </p>
                  <div className="mb-6 flex-1">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                      What you will learn
                    </p>
                    <ul className="space-y-1">
                      {course.modules.map((module, index) => (
                        <li
                          key={index}
                          className="flex items-center gap-2 text-sm text-gray-600"
                        >
                          <span className="text-primary-500">✓</span>
                          {module}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="border-t border-gray-100 pt-4 mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold text-navy-800">
                          {formatPrice(course.price)}
                        </p>
                        <p className="text-xs text-gray-400">Standard Fee</p>
                      </div>
                      <div className="text-right">
                        <span className="bg-amber-100 text-amber-700 text-xs font-semibold px-2 py-1 rounded-full block mb-1">
                          Early Bird
                        </span>
                        <p className="text-lg font-bold text-amber-600">
                          {formatPrice(course.earlyBird)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleEnroll(course)}
                    className="w-full py-3 bg-navy-800 text-white font-semibold rounded-xl hover:bg-primary-600 transition-colors"
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {showForm && selectedCourse && (
          <div
            id="registration-form"
            className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pb-16"
          >
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-navy-800 px-8 py-6">
                <h2 className="text-2xl font-bold text-white font-heading">
                  Register for {selectedCourse.name}
                </h2>
                <p className="text-white/70 text-sm mt-1">
                  Fill in your details below to secure your spot
                </p>
              </div>
              <div className="px-8 py-6">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-6 text-sm">
                    {error}
                  </div>
                )}
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Course
                    </label>
                    <input
                      type="text"
                      value={selectedCourse.name}
                      readOnly
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email address"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      WhatsApp Number{" "}
                      <span className="text-gray-400 font-normal">
                        (if different from phone)
                      </span>
                    </label>
                    <input
                      type="tel"
                      name="whatsapp_number"
                      value={formData.whatsapp_number}
                      onChange={handleChange}
                      placeholder="Enter your WhatsApp number"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Preferred Learning Mode{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                      required
                    >
                      <option value="">Select learning mode</option>
                      <option value="Physical">Physical (Umuahia)</option>
                      <option value="Online">Live Online (Zoom)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      How did you hear about us?
                    </label>
                    <select
                      name="how_you_heard"
                      value={formData.how_you_heard}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                    >
                      <option value="">Select an option</option>
                      <option value="Facebook">Facebook</option>
                      <option value="WhatsApp">WhatsApp</option>
                      <option value="Twitter">Twitter</option>
                      <option value="Friend or Family">Friend or Family</option>
                      <option value="Google">Google Search</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full py-4 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading
                      ? "Submitting Registration..."
                      : "Complete Registration"}
                  </button>
                  <p className="text-xs text-gray-400 text-center">
                    By registering you agree to our terms. Your spot is secured
                    after payment confirmation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Courses;
