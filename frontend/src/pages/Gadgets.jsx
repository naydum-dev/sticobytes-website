import { useState, useEffect } from "react";
import { GadgetCard } from "../components/gadgets/GadgetCard";
import { getAllGadgets } from "../services/gadgetApi";
import Badge from "../components/common/Badge";
import Button from "../components/common/Button";
const Gadgets = () => {
  const [gadgets, setGadgets] = useState([]);
  const [filteredGadgets, setFilteredGadgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch gadgets on component mount
  useEffect(() => {
    fetchGadgets();
  }, []);

  // Filter gadgets when category or search changes
  useEffect(() => {
    filterGadgets();
  }, [activeCategory, searchQuery, gadgets]);

  const fetchGadgets = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAllGadgets();
      setGadgets(response.data);
      setFilteredGadgets(response.data);
    } catch (err) {
      setError("Failed to load gadgets. Please try again later.");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const filterGadgets = () => {
    let filtered = [...gadgets];

    // Filter by category
    if (activeCategory !== "All") {
      filtered = filtered.filter(
        (gadget) => gadget.category === activeCategory,
      );
    }

    // Filter by search query
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter(
        (gadget) =>
          gadget.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          gadget.description.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    setFilteredGadgets(filtered);
  };

  // Get unique categories
  const categories = [
    "All",
    ...new Set(gadgets.map((gadget) => gadget.category)),
  ];

  // WhatsApp Icon
  const WhatsAppIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-navy-900 via-navy-800 to-primary-900 text-white py-20 overflow-hidden">
        {/* Animated Background Blobs */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-primary-500/30 rounded-full filter blur-3xl animate-blob" />
        <div className="absolute top-20 right-10 w-96 h-96 bg-navy-500/30 rounded-full filter blur-3xl animate-blob animation-delay-2s" />
        <div className="absolute bottom-10 left-1/2 w-80 h-80 bg-light-blue-500/20 rounded-full filter blur-3xl animate-blob animation-delay-4s" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="light" className="mb-4">
              Tech Products
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
              Quality{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-light-blue-400">
                Gadgets
              </span>{" "}
              for You
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8">
              Browse our collection of laptops, accessories, and tech products.
              Quality guaranteed, affordable prices.
            </p>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 w-full">
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

      {/* Search and Filter Section */}
      <section className="py-8 bg-white sticky top-0 z-30 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative max-w-xl mx-auto">
                <input
                  type="text"
                  placeholder="Search gadgets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <svg
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                    activeCategory === category
                      ? "bg-primary-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gadgets Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Loading State */}
            {loading && (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mb-4" />
                <p className="text-gray-600">Loading gadgets...</p>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="text-center py-20">
                <div className="text-red-600 mb-4">
                  <svg
                    className="w-16 h-16 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <p className="text-gray-600 mb-4">{error}</p>
                <Button variant="primary" onClick={fetchGadgets}>
                  Try Again
                </Button>
              </div>
            )}

            {/* Empty State */}
            {!loading && !error && filteredGadgets.length === 0 && (
              <div className="text-center py-20">
                <div className="text-gray-400 mb-4">
                  <svg
                    className="w-16 h-16 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  No gadgets found
                </h3>
                <p className="text-gray-500 mb-4">
                  Try adjusting your search or filters
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("All");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}

            {/* Gadgets Grid */}
            {!loading && !error && filteredGadgets.length > 0 && (
              <>
                <div className="mb-6 text-center">
                  <p className="text-gray-600">
                    Showing{" "}
                    <span className="font-semibold text-primary-600">
                      {filteredGadgets.length}
                    </span>{" "}
                    {filteredGadgets.length === 1 ? "gadget" : "gadgets"}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredGadgets.map((gadget) => (
                    <GadgetCard
                      key={gadget.id}
                      id={gadget.id}
                      name={gadget.name}
                      description={gadget.description}
                      price={gadget.price}
                      image={gadget.image}
                      category={gadget.category}
                      stock_status={gadget.stock_status}
                      whatsapp_message={gadget.whatsapp_message}
                      is_featured={gadget.is_featured}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-navy-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Chat with us on WhatsApp and we'll help you find the perfect gadget
            for your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="light"
              size="lg"
              icon={WhatsAppIcon}
              onClick={() =>
                window.open(
                  "https://wa.me/2348113393564?text=Hello!%20I%20need%20help%20finding%20a%20gadget.",
                  "_blank",
                )
              }
            >
              Chat on WhatsApp
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => (window.location.href = "/contact")}
              className="border-white text-white hover:bg-white hover:text-primary-600"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gadgets;
