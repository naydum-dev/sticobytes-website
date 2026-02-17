import { Link } from "react-router-dom";
import BlogCard from "../blog/BlogCard";
import Button from "../common/Button";
import Badge from "../common/Badge";

const LatestBlogs = () => {
  const blogPosts = [
    {
      id: 1,
      slug: "getting-started-with-react",
      title: "Getting Started with React: A Beginner's Guide",
      excerpt:
        "Learn the fundamentals of React and build your first component. This comprehensive guide covers everything from setup to deployment.",
      featured_image: null,
      category_name: "Web Development",
      published_at: "2026-02-01",
      reading_time: 8,
      views: 0,
    },
    {
      id: 2,
      slug: "mastering-tailwind-css",
      title: "Mastering Tailwind CSS: Tips and Tricks",
      excerpt:
        "Discover advanced Tailwind CSS techniques to speed up your development workflow and create beautiful, responsive designs.",
      featured_image: null,
      category_name: "Design",
      published_at: "2026-01-28",
      reading_time: 6,
      views: 0,
    },
    {
      id: 3,
      slug: "building-scalable-nodejs-apis",
      title: "Building Scalable Node.js APIs",
      excerpt:
        "A deep dive into creating robust and scalable REST APIs using Node.js, Express, and PostgreSQL for enterprise applications.",
      featured_image: null,
      category_name: "Backend",
      published_at: "2026-01-25",
      reading_time: 10,
      views: 0,
    },
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="primary" size="lg" rounded="full" className="mb-4">
            Our Blog
          </Badge>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy-500 mb-4">
            Latest Insights and Tutorials
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest trends, tips, and tutorials in web
            development, design, and digital marketing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        <div className="text-center">
          <Link to="/blog">
            <Button variant="primary" size="lg">
              View All Posts
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LatestBlogs;
