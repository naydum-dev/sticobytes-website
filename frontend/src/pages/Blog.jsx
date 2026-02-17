import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import BlogCard from "../components/blog/BlogCard";
import { getAllPosts, getCategories } from "../services/blogApi";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const POSTS_PER_PAGE = 9;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategories();
        setCategories(res.data || []);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await getAllPosts({
          page: currentPage,
          limit: POSTS_PER_PAGE,
          category: activeCategory,
        });
        setPosts(res.data || []);
        setFilteredPosts(res.data || []);
        setTotalPages(res.totalPages || 1);
        setTotalPosts(res.total || 0);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
        setError("Failed to load blog posts. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [currentPage, activeCategory]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredPosts(posts);
      return;
    }
    const q = searchQuery.toLowerCase();
    setFilteredPosts(
      posts.filter(
        (post) =>
          post.title?.toLowerCase().includes(q) ||
          post.excerpt?.toLowerCase().includes(q) ||
          post.category_name?.toLowerCase().includes(q),
      ),
    );
  }, [searchQuery, posts]);

  const handleCategoryChange = (slug) => {
    setActiveCategory(slug);
    setCurrentPage(1);
    setSearchQuery("");
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleRetry = () => {
    setError(null);
    setCurrentPage(1);
    setActiveCategory("");
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <>
      <Helmet>
        <title>Blog | Sticobytes Digital Agency</title>
        <meta
          name="description"
          content="Explore tech articles, web development tutorials, design tips, and digital literacy insights from the Sticobytes team."
        />
        <meta property="og:title" content="Blog | Sticobytes Digital Agency" />
        <meta
          property="og:description"
          content="Explore tech articles, web development tutorials, design tips, and digital literacy insights."
        />
      </Helmet>

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-navy-900 via-navy-800 to-primary-900 text-white py-24 overflow-hidden">
        <div className="absolute top-0 left-0 w-72 h-72 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-lightBlue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />

        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block bg-white/10 border border-white/20 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm">
            Our Blog
          </span>
          <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight">
            Insights and{" "}
            <span className="bg-gradient-to-r from-primary-300 to-lightBlue-300 bg-clip-text text-transparent">
              Tutorials
            </span>
          </h1>
          <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Web development tips, design guides, and digital literacy content
            written by the Sticobytes team.
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 25C840 30 960 30 1080 25C1200 20 1320 10 1380 5L1440 0V60H0Z"
              fill="#F9FAFB"
            />
          </svg>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-gray-50 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          <div className="relative flex-grow max-w-sm">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
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
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 bg-white"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                x
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 flex-shrink-0">
            <button
              onClick={() => handleCategoryChange("")}
              className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                activeCategory === ""
                  ? "bg-primary-600 text-white shadow-sm"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-primary-400 hover:text-primary-600"
              }`}
            >
              All Posts
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.slug)}
                className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                  activeCategory === cat.slug
                    ? "bg-primary-600 text-white shadow-sm"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-primary-400 hover:text-primary-600"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          {!loading && !error && (
            <p className="text-sm text-gray-500 mb-6">
              {searchQuery
                ? `${filteredPosts.length} result${filteredPosts.length !== 1 ? "s" : ""} for "${searchQuery}"`
                : `Showing ${filteredPosts.length} of ${totalPosts} post${totalPosts !== 1 ? "s" : ""}`}
            </p>
          )}

          {loading && (
            <div className="flex flex-col items-center justify-center py-24 text-gray-400">
              <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mb-4" />
              <p className="text-sm">Loading posts...</p>
            </div>
          )}

          {error && !loading && (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-red-500"
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
              <button
                onClick={handleRetry}
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold text-sm"
              >
                Try Again
              </button>
            </div>
          )}

          {!loading && !error && filteredPosts.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-primary-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="font-heading font-bold text-navy-900 text-lg mb-2">
                No posts found
              </h3>
              <p className="text-gray-500 text-sm mb-4">
                {searchQuery
                  ? `No posts match "${searchQuery}"`
                  : "No posts in this category yet."}
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  handleCategoryChange("");
                }}
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold text-sm"
              >
                Clear Filters
              </button>
            </div>
          )}

          {!loading && !error && filteredPosts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}

          {!loading && !error && !searchQuery && totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-semibold text-gray-600 hover:border-primary-400 hover:text-primary-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 bg-white"
              >
                Prev
              </button>

              {getPageNumbers().map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-10 h-10 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    currentPage === page
                      ? "bg-primary-600 text-white shadow-sm"
                      : "bg-white border border-gray-200 text-gray-600 hover:border-primary-400 hover:text-primary-600"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-semibold text-gray-600 hover:border-primary-400 hover:text-primary-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 bg-white"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-primary-600 to-navy-700 py-16 text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
            Want to Learn More?
          </h2>
          <p className="text-white/80 mb-8 text-lg">
            We offer web development training, digital literacy courses, and
            mentorship programs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/2348113393564?text=Hello%21%20I%20saw%20your%20blog%20and%20I%27m%20interested%20in%20your%20training%20programs."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white text-primary-600 font-bold px-8 py-3 rounded-xl hover:bg-gray-50 transition-colors shadow-sm"
            >
              Chat on WhatsApp
            </a>
            <Link
              to="/services"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/50 text-white font-bold px-8 py-3 rounded-xl hover:bg-white/10 transition-colors"
            >
              View Our Services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;
