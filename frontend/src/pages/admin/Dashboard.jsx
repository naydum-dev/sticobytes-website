// frontend/src/pages/admin/Dashboard.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const Dashboard = () => {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    drafts: 0,
    totalViews: 0,
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/blog/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const allPosts = response.data.data?.posts || response.data.posts || [];
      setPosts(allPosts);

      // Calculate stats
      setStats({
        total: allPosts.length,
        published: allPosts.filter((p) => p.status === "published").length,
        drafts: allPosts.filter((p) => p.status === "draft").length,
        totalViews: allPosts.reduce((sum, p) => sum + (p.views || 0), 0),
      });
    } catch (err) {
      setError("Failed to load posts");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/blog/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(posts.filter((p) => p.id !== id));
      setDeleteId(null);
      fetchPosts();
    } catch (err) {
      setError("Failed to delete post");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Not published";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navbar */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: "#009ad9" }}
              >
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="font-bold text-gray-900">Sticobytes Admin</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                👋 Welcome, {user?.username}
              </span>
              <a
                href="/"
                target="_blank"
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                View Site
              </a>
              <button
                onClick={handleLogout}
                className="text-sm text-red-500 hover:text-red-700 font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            {
              label: "Total Posts",
              value: stats.total,
              icon: "📝",
              color: "#009ad9",
            },
            {
              label: "Published",
              value: stats.published,
              icon: "✅",
              color: "#10b981",
            },
            {
              label: "Drafts",
              value: stats.drafts,
              icon: "📋",
              color: "#f59e0b",
            },
            {
              label: "Total Views",
              value: stats.totalViews,
              icon: "👁️",
              color: "#8b5cf6",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-xl p-5 shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{stat.icon}</span>
                <span
                  className="text-2xl font-bold"
                  style={{ color: stat.color }}
                >
                  {stat.value}
                </span>
              </div>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Posts Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900">All Blog Posts</h2>
            <button
              onClick={() => navigate("/admin/posts/create")}
              className="px-4 py-2 rounded-lg text-white text-sm font-medium transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#009ad9" }}
            >
              + New Post
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="mx-6 mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Loading */}
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div
                className="w-8 h-8 border-4 border-t-transparent rounded-full animate-spin"
                style={{
                  borderColor: "#009ad9",
                  borderTopColor: "transparent",
                }}
              ></div>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-4xl mb-4">📝</p>
              <p className="text-gray-500 mb-4">No posts yet</p>
              <button
                onClick={() => navigate("/admin/posts/create")}
                className="px-4 py-2 rounded-lg text-white text-sm font-medium"
                style={{ backgroundColor: "#009ad9" }}
              >
                Create Your First Post
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Views
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {posts.map((post) => (
                    <tr
                      key={post.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {post.featured_image ? (
                            <img
                              src={post.featured_image}
                              alt=""
                              className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                              <span className="text-gray-400 text-xs">📷</span>
                            </div>
                          )}
                          <div>
                            <p className="font-medium text-gray-900 line-clamp-1 max-w-xs">
                              {post.title}
                            </p>
                            <p className="text-xs text-gray-400">{post.slug}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600">
                          {post.category_name || "—"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                            post.status === "published"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {post.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {post.views || 0}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {formatDate(post.published_at || post.created_at)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() =>
                              navigate(`/admin/posts/edit/${post.id}`)
                            }
                            className="text-sm font-medium hover:opacity-70"
                            style={{ color: "#009ad9" }}
                          >
                            Edit
                          </button>
                          <a
                            href={`/blog/${post.slug}`}
                            target="_blank"
                            className="text-sm font-medium text-gray-500 hover:text-gray-700"
                          >
                            View
                          </a>
                          <button
                            onClick={() => setDeleteId(post.id)}
                            className="text-sm font-medium text-red-500 hover:text-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-xl">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Delete Post?
            </h3>
            <p className="text-gray-600 mb-6">
              This action cannot be undone. The post will be permanently
              deleted.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
