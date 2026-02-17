import { Link } from "react-router-dom";
import { formatDate, formatViews } from "../../services/blogApi";

const BlogCard = ({ post }) => {
  const {
    slug,
    title,
    excerpt,
    featured_image,
    category_name,
    published_at,
    reading_time,
    views,
  } = post;

  return (
    <article className="bg-white rounded-xl shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1 flex flex-col h-full overflow-hidden group">
      <Link
        to={`/blog/${slug}`}
        className="block overflow-hidden relative h-52 bg-gradient-to-br from-primary-100 to-primary-200 flex-shrink-0"
      >
        {featured_image ? (
          <img
            src={featured_image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg
              className="w-16 h-16 text-primary-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 12h6m-6-4h.01"
              />
            </svg>
          </div>
        )}
        {category_name && (
          <span className="absolute top-3 left-3 bg-primary-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
            {category_name}
          </span>
        )}
      </Link>

      <div className="flex flex-col flex-grow p-5">
        <Link to={`/blog/${slug}`}>
          <h3 className="font-heading font-bold text-navy-900 text-lg leading-snug mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors duration-200">
            {title}
          </h3>
        </Link>

        {excerpt && (
          <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-4 flex-grow">
            {excerpt}
          </p>
        )}

        <div className="flex items-center justify-between text-xs text-gray-400 mt-auto pt-4 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <svg
                className="w-3.5 h-3.5"
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
              {formatDate(published_at)}
            </span>
            {reading_time && (
              <span className="flex items-center gap-1">
                <svg
                  className="w-3.5 h-3.5"
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
                {reading_time} min read
              </span>
            )}
          </div>
          <span className="flex items-center gap-1">
            <svg
              className="w-3.5 h-3.5"
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
            {formatViews(views)}
          </span>
        </div>

        <Link
          to={`/blog/${slug}`}
          className="mt-4 inline-flex items-center gap-1 text-primary-600 hover:text-primary-700 font-semibold text-sm transition-colors duration-200 group/link"
        >
          Read More
          <svg
            className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </article>
  );
};

export default BlogCard;
