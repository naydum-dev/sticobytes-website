import React from "react";
import Card from "../common/Card";
import Badge from "../common/Badge";

const Testimonials = () => {
  // Mock testimonial data (later from API)
  const testimonials = [
    {
      id: 1,
      name: "Chidi Okafor",
      role: "CEO",
      company: "TechStart Nigeria",
      image: null, // Will show initials
      rating: 5,
      text: "Sticobytes transformed our online presence completely. Their web development team delivered a stunning, fast website that increased our conversions by 200%. Highly recommended!",
    },
    {
      id: 2,
      name: "Amaka Johnson",
      role: "Marketing Director",
      company: "GreenLeaf Foods",
      image: null,
      rating: 5,
      text: "The branding package from Sticobytes was exceptional. They captured our brand essence perfectly and created a visual identity that resonates with our customers.",
    },
    {
      id: 3,
      name: "Emeka Nwosu",
      role: "Founder",
      company: "Digital Hub PH",
      image: null,
      rating: 5,
      text: "I enrolled in their React training program and it was life-changing. The instructors are knowledgeable, patient, and the curriculum is very practical. Now I'm building real-world applications!",
    },
    {
      id: 4,
      name: "Sarah Williams",
      role: "Business Owner",
      company: "Elegance Boutique",
      image: null,
      rating: 5,
      text: "From graphics design to setting up our online store, Sticobytes handled everything professionally. Our sales have tripled since launching the new website!",
    },
    {
      id: 5,
      name: "David Eze",
      role: "Entrepreneur",
      company: "FitLife Gym",
      image: null,
      rating: 5,
      text: "Outstanding service! They helped us with everything from branding to digital marketing. The team is creative, responsive, and delivers on time. Worth every naira!",
    },
    {
      id: 6,
      name: "Grace Adeyemi",
      role: "Restaurant Owner",
      company: "Mama's Kitchen",
      image: null,
      rating: 5,
      text: "Sticobytes created our website and set up our online ordering system. The support has been amazing, and our customers love how easy it is to order online now.",
    },
  ];

  // Function to get initials from name
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Function to render stars
  const renderStars = (rating) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, index) => (
          <svg
            key={index}
            className={`w-5 h-5 ${
              index < rating ? "text-yellow-400" : "text-gray-300"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" size="lg" rounded="full" className="mb-4">
            Testimonials
          </Badge>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy-500 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our satisfied clients
            have to say about working with Sticobytes.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} hover className="h-full flex flex-col">
              {/* Quote Icon */}
              <div className="mb-4">
                <svg
                  className="w-10 h-10 text-primary-200"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 mb-6 flex-grow italic">
                "{testimonial.text}"
              </p>

              {/* Rating */}
              <div className="mb-4">{renderStars(testimonial.rating)}</div>

              {/* Client Info */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                {/* Avatar/Initials */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-navy-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                  {getInitials(testimonial.name)}
                </div>

                {/* Name & Company */}
                <div>
                  <h4 className="font-heading font-semibold text-navy-500">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Ready to join our satisfied clients?
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 text-primary-500 font-semibold hover:gap-3 transition-all duration-200"
          >
            Get Started Today
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
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
