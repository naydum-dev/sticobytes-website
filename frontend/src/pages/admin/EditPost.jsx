// frontend/src/pages/admin/EditPost.jsx
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL;

const ToolbarButton = ({ onClick, active, title, children }) => (
  <button
    type="button"
    onClick={onClick}
    title={title}
    className={`px-2 py-1 rounded text-sm font-medium transition-colors ${
      active ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100"
    }`}
  >
    {children}
  </button>
);

const EditPost = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    category_id: "",
    tags: "",
    meta_title: "",
    meta_description: "",
    status: "draft",
    featured_image: "",
  });

  const [postContent, setPostContent] = useState("");
  const [categories, setCategories] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({ openOnClick: false }),
      Placeholder.configure({
        placeholder: "Write your blog post content here...",
      }),
    ],
    content: "",
    editorProps: {
      attributes: {
        class: "prose max-w-none focus:outline-none min-h-64 px-4 py-3",
      },
    },
  });

  // Set editor content once BOTH editor and postContent are ready
  useEffect(() => {
    if (editor && postContent) {
      editor.commands.setContent(postContent);
    }
  }, [editor, postContent]);

  useEffect(() => {
    fetchCategories();
    fetchPost();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_URL}/blog/categories`);
      setCategories(response.data.data || []);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    }
  };

  const fetchPost = async () => {
    try {
      const response = await axios.get(`${API_URL}/blog/post/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const post = response.data.data;

      setFormData({
        title: post.title || "",
        excerpt: post.excerpt || "",
        category_id: post.category_id || "",
        tags: post.tags?.map((t) => t.name).join(", ") || "",
        meta_title: post.meta_title || "",
        meta_description: post.meta_description || "",
        status: post.status || "draft",
        featured_image: post.featured_image || "",
      });

      if (post.featured_image) setImagePreview(post.featured_image);

      // Set content separately so useEffect can sync it with editor
      setPostContent(post.content || "");
    } catch (err) {
      setError("Failed to load post");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be under 5MB");
      return;
    }
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const uploadImage = async () => {
    if (!imageFile) return formData.featured_image;
    setUploading(true);
    try {
      const data = new FormData();
      data.append("image", imageFile);
      const response = await axios.post(`${API_URL}/upload`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data.data?.url || response.data.url;
    } catch (err) {
      throw new Error("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (status) => {
    setError("");
    setSuccess("");

    const content = editor?.getHTML() || "";
    if (!formData.title.trim()) {
      setError("Title is required");
      return;
    }
    if (!content || content === "<p></p>") {
      setError("Content is required");
      return;
    }
    if (!formData.category_id) {
      setError("Please select a category");
      return;
    }

    setSaving(true);
    try {
      const imageUrl = await uploadImage();
      const tagsArray = formData.tags
        ? formData.tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        : [];

      await axios.put(
        `${API_URL}/blog/${id}`,
        {
          ...formData,
          status,
          content,
          featured_image: imageUrl,
          tags: tagsArray,
          category_id: parseInt(formData.category_id),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      setSuccess(
        status === "published" ? "🎉 Post published!" : "✅ Draft saved!",
      );
      setTimeout(() => navigate("/admin/dashboard"), 1500);
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Failed to save post",
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div
          className="w-8 h-8 border-4 border-t-transparent rounded-full animate-spin"
          style={{ borderColor: "#009ad9", borderTopColor: "transparent" }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/admin/dashboard")}
                className="text-gray-500 hover:text-gray-700"
              >
                ← Back
              </button>
              <span className="font-bold text-gray-900">Edit Post</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleSubmit("draft")}
                disabled={saving || uploading}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Draft"}
              </button>
              <button
                onClick={() => handleSubmit("published")}
                disabled={saving || uploading}
                className="px-4 py-2 rounded-lg text-white text-sm font-medium disabled:opacity-50"
                style={{ backgroundColor: "#009ad9" }}
              >
                {uploading
                  ? "Uploading..."
                  : saving
                    ? "Publishing..."
                    : "Publish"}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
            {success}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main - Left */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Post Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter your post title..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 text-lg"
              />
            </div>

            {/* Excerpt */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Excerpt{" "}
                <span className="text-gray-400 font-normal ml-1">
                  (Short summary)
                </span>
              </label>
              <textarea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                placeholder="Write a short summary..."
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 resize-none"
              />
            </div>

            {/* Editor */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <label className="block text-sm font-medium text-gray-700 p-6 pb-0">
                Content *
              </label>
              <div className="flex flex-wrap gap-1 p-4 border-b border-gray-100">
                <ToolbarButton
                  onClick={() => editor?.chain().focus().toggleBold().run()}
                  active={editor?.isActive("bold")}
                  title="Bold"
                >
                  <strong>B</strong>
                </ToolbarButton>
                <ToolbarButton
                  onClick={() => editor?.chain().focus().toggleItalic().run()}
                  active={editor?.isActive("italic")}
                  title="Italic"
                >
                  <em>I</em>
                </ToolbarButton>
                <ToolbarButton
                  onClick={() => editor?.chain().focus().toggleStrike().run()}
                  active={editor?.isActive("strike")}
                  title="Strike"
                >
                  <s>S</s>
                </ToolbarButton>
                <div className="w-px bg-gray-200 mx-1" />
                <ToolbarButton
                  onClick={() =>
                    editor?.chain().focus().toggleHeading({ level: 1 }).run()
                  }
                  active={editor?.isActive("heading", { level: 1 })}
                  title="H1"
                >
                  H1
                </ToolbarButton>
                <ToolbarButton
                  onClick={() =>
                    editor?.chain().focus().toggleHeading({ level: 2 }).run()
                  }
                  active={editor?.isActive("heading", { level: 2 })}
                  title="H2"
                >
                  H2
                </ToolbarButton>
                <ToolbarButton
                  onClick={() =>
                    editor?.chain().focus().toggleHeading({ level: 3 }).run()
                  }
                  active={editor?.isActive("heading", { level: 3 })}
                  title="H3"
                >
                  H3
                </ToolbarButton>
                <div className="w-px bg-gray-200 mx-1" />
                <ToolbarButton
                  onClick={() =>
                    editor?.chain().focus().toggleBulletList().run()
                  }
                  active={editor?.isActive("bulletList")}
                  title="Bullet List"
                >
                  • List
                </ToolbarButton>
                <ToolbarButton
                  onClick={() =>
                    editor?.chain().focus().toggleOrderedList().run()
                  }
                  active={editor?.isActive("orderedList")}
                  title="Numbered List"
                >
                  1. List
                </ToolbarButton>
                <ToolbarButton
                  onClick={() =>
                    editor?.chain().focus().toggleBlockquote().run()
                  }
                  active={editor?.isActive("blockquote")}
                  title="Blockquote"
                >
                  ❝
                </ToolbarButton>
                <ToolbarButton
                  onClick={() =>
                    editor?.chain().focus().toggleCodeBlock().run()
                  }
                  active={editor?.isActive("codeBlock")}
                  title="Code Block"
                >
                  {"</>"}
                </ToolbarButton>
                <div className="w-px bg-gray-200 mx-1" />
                <ToolbarButton
                  onClick={() => editor?.chain().focus().undo().run()}
                  title="Undo"
                >
                  ↩
                </ToolbarButton>
                <ToolbarButton
                  onClick={() => editor?.chain().focus().redo().run()}
                  title="Redo"
                >
                  ↪
                </ToolbarButton>
              </div>
              <EditorContent editor={editor} className="min-h-96 border-0" />
            </div>
          </div>

          {/* Sidebar - Right */}
          <div className="space-y-6">
            {/* Featured Image */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Featured Image
              </label>
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => {
                      setImagePreview("");
                      setImageFile(null);
                      setFormData({ ...formData, featured_image: "" });
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white w-6 h-6 rounded-full text-xs hover:bg-red-600"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 transition-colors">
                  <span className="text-3xl mb-2">📷</span>
                  <span className="text-sm text-gray-500">
                    Click to upload image
                  </span>
                  <span className="text-xs text-gray-400 mt-1">Max 5MB</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            {/* Category */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                name="category_id"
                value={formData.category_id}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Tags */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags{" "}
                <span className="text-gray-400 font-normal ml-1">
                  (comma separated)
                </span>
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="react, tailwind, webdev"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
              />
            </div>

            {/* Status */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Status
              </label>
              <span
                className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                  formData.status === "published"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {formData.status}
              </span>
            </div>

            {/* SEO */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <label className="block text-sm font-medium text-gray-700 mb-4">
                SEO Settings
              </label>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Meta Title
                  </label>
                  <input
                    type="text"
                    name="meta_title"
                    value={formData.meta_title}
                    onChange={handleChange}
                    placeholder="SEO title"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Meta Description
                  </label>
                  <textarea
                    name="meta_description"
                    value={formData.meta_description}
                    onChange={handleChange}
                    placeholder="SEO description"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none resize-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPost;
