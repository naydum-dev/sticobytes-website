import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BlogCard from "../blog/BlogCard";
import Button from "../common/Button";
import Badge from "../common/Badge";
import { getAllPosts } from "../../services/blogApi.js";

const LatestBlogs = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestPosts = async () => {
      try {
        const response = await getAllPosts({ limit: 3, page: 1 });
        setBlogPosts(response.data || []);
      } catch (error) {
        console.error("Error fetching latest posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestPosts();
  }, []);

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

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-gray-100 rounded-2xl h-80 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {blogPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}

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
