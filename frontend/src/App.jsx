// frontend/src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import ProtectedRoute from "./components/common/ProtectedRoute";

// Public pages
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Gadgets from "./pages/Gadgets";
import Team from "./pages/Team";
import Contact from "./pages/Contact";

// Admin pages
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import CreatePost from "./pages/admin/CreatePost";
import EditPost from "./pages/admin/EditPost";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes with Layout (Navbar + Footer) */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:slug" element={<BlogPost />} />
          <Route path="gadgets" element={<Gadgets />} />
          <Route path="team" element={<Team />} />
          <Route path="contact" element={<Contact />} />
        </Route>

        {/* Admin Login - Public */}
        <Route path="/admin/login" element={<Login />} />

        {/* Admin Routes - Protected */}

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/posts/create"
          element={
            <ProtectedRoute>
              <CreatePost />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/posts/edit/:id"
          element={
            <ProtectedRoute>
              <EditPost />
            </ProtectedRoute>
          }
        />

        {/* 404 Not Found */}
        <Route
          path="*"
          element={
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-800">404</h1>
                <p className="text-xl text-gray-600 mt-4">Page not found</p>
                <a
                  href="/"
                  className="text-blue-600 hover:underline mt-4 inline-block"
                >
                  Go back home
                </a>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
