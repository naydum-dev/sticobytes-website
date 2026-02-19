import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  getPostBySlug,
  getRelatedPosts,
  formatDate,
  formatViews,
} from "../services/blogApi.js";

// Social share icons as simple SVG components
const FacebookIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
  </svg>
);

const TwitterIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.528 5.847L.057 23.5l5.797-1.522A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.894a9.893 9.893 0 01-5.031-1.378l-.361-.214-3.741.982.999-3.648-.235-.374A9.861 9.861 0 012.106 12C2.106 6.58 6.58 2.106 12 2.106S21.894 6.58 21.894 12 17.42 21.894 12 21.894z" />
  </svg>
);

const CopyIcon = () => (
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
      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
    />
  </svg>
);

// Reusable BlogCard for related posts section
const RelatedPostCard = ({ post }) => (
  <Link to={`/blog/${post.slug}`} className="group block">
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
      <div className="h-44 bg-gradient-to-br from-primary-100 to-primary-200 overflow-hidden">
        {post.featured_image ? (
          <img
            src={post.featured_image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-primary-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
      </div>
      <div className="p-4">
        {post.category_name && (
          <span className="text-xs font-semibold text-primary-600 uppercase tracking-wide">
            {post.category_name}
          </span>
        )}
        <h3 className="mt-1 font-semibold text-navy-800 line-clamp-2 group-hover:text-primary-600 transition-colors">
          {post.title}
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          {post.reading_time} min read ·{" "}
          {formatDate(post.published_at || post.created_at)}
        </p>
      </div>
    </div>
  </Link>
);

function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  // Current page URL for sharing
  const pageUrl = window.location.href;

  // Fetch post on slug change
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getPostBySlug(slug);
        setPost(data.data);
      } catch (err) {
        if (err.response?.status === 404) {
          setError("Post not found");
        } else {
          setError("Failed to load post. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  // Fetch related posts once we have post data
  useEffect(() => {
    const fetchRelated = async () => {
      if (!post) return;
      try {
        const related = await getRelatedPosts(post.category_slug, slug);
        setRelatedPosts(related);
      } catch (err) {
        // Related posts failing shouldn't break the page
        setRelatedPosts([]);
      }
    };
    fetchRelated();
  }, [post, slug]);

  // Social share handlers
  const shareOnFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`,
      "_blank",
    );
  };

  const shareOnTwitter = () => {
    const text = `${post?.title} via @Sticobytes`;
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(pageUrl)}`,
      "_blank",
    );
  };

  const shareOnLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`,
      "_blank",
    );
  };

  const shareOnWhatsApp = () => {
    const text = `Check out this article: ${post?.title} ${pageUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(pageUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  // --- LOADING STATE ---
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Loading article...</p>
        </div>
      </div>
    );
  }

  // --- ERROR STATE ---
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
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
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-navy-800 mb-2">{error}</h2>
          <p className="text-gray-500 mb-6">
            {error === "Post not found"
              ? "This article doesn't exist or may have been removed."
              : "Something went wrong loading this article."}
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => navigate(-1)}
              className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Go Back
            </button>
            <Link
              to="/blog"
              className="px-5 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Browse Blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // --- MAIN RENDER ---
  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>{post.meta_title || post.title} | Sticobytes</title>
        <meta
          name="description"
          content={post.meta_description || post.excerpt}
        />
        {post.tags?.length > 0 && (
          <meta
            name="keywords"
            content={post.tags.map((t) => t.name).join(", ")}
          />
        )}

        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.meta_title || post.title} />
        <meta
          property="og:description"
          content={post.meta_description || post.excerpt}
        />
        <meta property="og:url" content={pageUrl} />
        {post.featured_image && (
          <meta property="og:image" content={post.featured_image} />
        )}
        <meta property="article:published_time" content={post.published_at} />
        {post.category_name && (
          <meta property="article:section" content={post.category_name} />
        )}

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.meta_title || post.title} />
        <meta
          name="twitter:description"
          content={post.meta_description || post.excerpt}
        />
        {post.featured_image && (
          <meta name="twitter:image" content={post.featured_image} />
        )}
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* ── HERO / FEATURED IMAGE ── */}
        <div className="relative bg-navy-900 text-white">
          {post.featured_image ? (
            <div className="absolute inset-0">
              <img
                src={post.featured_image}
                alt={post.title}
                className="w-full h-full object-cover opacity-30"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/70 to-navy-900/40" />
            </div>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800 to-primary-900">
              <div className="absolute top-20 left-10 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl" />
              <div className="absolute bottom-10 right-10 w-48 h-48 bg-primary-400/10 rounded-full blur-2xl" />
            </div>
          )}

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-white/60 mb-6">
              <Link to="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link to="/blog" className="hover:text-white transition-colors">
                Blog
              </Link>
              <span>/</span>
              <span className="text-white/40 truncate max-w-xs">
                {post.title}
              </span>
            </nav>

            {/* Category badge */}
            {post.category_name && (
              <Link
                to={`/blog`}
                className="inline-block bg-primary-500/20 border border-primary-400/30 text-primary-300 text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4 hover:bg-primary-500/30 transition-colors"
              >
                {post.category_name}
              </Link>
            )}

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading leading-tight mb-6">
              {post.title}
            </h1>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-white/70">
              <span className="flex items-center gap-1.5">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {formatDate(post.published_at || post.created_at)}
              </span>
              <span className="flex items-center gap-1.5">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {post.reading_time} min read
              </span>
              <span className="flex items-center gap-1.5">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                {formatViews(post.views)} views
              </span>
            </div>
          </div>
        </div>

        {/* ── MAIN CONTENT AREA ── */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-10">
            {/* ── LEFT: Article content ── */}
            <div>
              {/* Excerpt / intro */}
              {post.excerpt && (
                <p className="text-lg text-gray-600 leading-relaxed border-l-4 border-primary-500 pl-4 mb-8 italic">
                  {post.excerpt}
                </p>
              )}

              {/* Blog content rendered from HTML */}
              <div
                className="prose-content"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Tags */}
              {post.tags?.length > 0 && (
                <div className="mt-10 pt-6 border-t border-gray-200">
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                    Tagged with
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag.id}
                        className="px-3 py-1 bg-primary-50 text-primary-700 text-sm rounded-full border border-primary-100 font-medium"
                      >
                        #{tag.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Social sharing */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                  Share this article
                </p>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={shareOnFacebook}
                    className="flex items-center gap-2 px-4 py-2 bg-[#1877F2] text-white rounded-lg text-sm font-medium hover:bg-[#166FE5] transition-colors"
                  >
                    <FacebookIcon /> Facebook
                  </button>
                  <button
                    onClick={shareOnTwitter}
                    className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
                  >
                    <TwitterIcon /> Twitter / X
                  </button>
                  <button
                    onClick={shareOnLinkedIn}
                    className="flex items-center gap-2 px-4 py-2 bg-[#0A66C2] text-white rounded-lg text-sm font-medium hover:bg-[#0959AB] transition-colors"
                  >
                    <LinkedInIcon /> LinkedIn
                  </button>
                  <button
                    onClick={shareOnWhatsApp}
                    className="flex items-center gap-2 px-4 py-2 bg-[#25D366] text-white rounded-lg text-sm font-medium hover:bg-[#20BD5A] transition-colors"
                  >
                    <WhatsAppIcon /> WhatsApp
                  </button>
                  <button
                    onClick={copyLink}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                  >
                    <CopyIcon />
                    {copied ? "Copied!" : "Copy Link"}
                  </button>
                </div>
              </div>

              {/* Back to blog */}
              <div className="mt-10">
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 text-primary-600 font-medium hover:text-primary-700 transition-colors group"
                >
                  <svg
                    className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  Back to Blog
                </Link>
              </div>
            </div>

            {/* ── RIGHT: Sidebar ── */}
            <aside className="mt-12 lg:mt-0">
              {/* About Sticobytes card */}
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
                <h3 className="font-bold text-navy-800 mb-2">
                  About Sticobytes
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We help businesses grow through web development, design, and
                  digital training. Based in Nigeria, serving globally.
                </p>
                <a
                  href={`https://wa.me/2348113393564?text=${encodeURIComponent("Hi! I read your blog and I'd like to know more about your services.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex items-center justify-center gap-2 w-full px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
                >
                  <WhatsAppIcon /> Chat with Us
                </a>
              </div>

              {/* Services CTA card */}
              <div className="bg-gradient-to-br from-navy-800 to-navy-900 rounded-xl p-6 text-white">
                <h3 className="font-bold mb-2">Need help with your project?</h3>
                <p className="text-sm text-white/70 leading-relaxed mb-4">
                  From web development to branding — we've got you covered.
                </p>
                <Link
                  to="/services"
                  className="block text-center px-4 py-2 bg-primary-500 text-white rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors"
                >
                  View Our Services
                </Link>
              </div>
            </aside>
          </div>

          {/* ── RELATED POSTS ── */}
          {relatedPosts.length > 0 && (
            <section className="mt-16 pt-10 border-t border-gray-200">
              <h2 className="text-2xl font-bold text-navy-800 font-heading mb-6">
                Related Articles
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.map((related) => (
                  <RelatedPostCard key={related.id} post={related} />
                ))}
              </div>
            </section>
          )}

          {/* ── CTA BANNER ── */}
          <section className="mt-16 bg-gradient-to-r from-primary-600 to-navy-800 rounded-2xl p-8 text-white text-center">
            <h2 className="text-2xl font-bold font-heading mb-2">
              Enjoyed this article?
            </h2>
            <p className="text-white/80 mb-6">
              We write about web development, design, and digital skills. Follow
              us for more.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                to="/blog"
                className="px-6 py-2.5 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Read More Articles
              </Link>
              <a
                href={`https://wa.me/2348113393564?text=${encodeURIComponent("Hi! I'd like to learn more about your services.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 bg-primary-500/20 border border-white/30 text-white font-semibold rounded-lg hover:bg-primary-500/30 transition-colors"
              >
                Contact Us
              </a>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default BlogPost;
