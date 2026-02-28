# Sticobytes Digital Agency Website

A modern, full-stack web application for **Sticobytes Digital Agency** — a community-based digital agency in Umuahia, Abia State, Nigeria offering web development, graphics design, business branding, digital literacy training, and gadget sales.

🌐 **Live Site:** [sticobytes.com](https://sticobytes.com)

---

## 🚀 Tech Stack

### Frontend
- React 19 with Vite
- Tailwind CSS (custom brand colors)
- React Router DOM v7
- Axios (API calls)
- React Helmet Async (SEO)
- TipTap (Blog Editor)
- React Icons

### Backend
- Node.js + Express.js (ES Modules)
- PostgreSQL Database
- JWT Authentication
- Cloudinary (Image Storage)
- Helmet.js (Security Headers)
- express-rate-limit (Rate Limiting)
- express-validator (Input Validation)
- Morgan (Logging)

### Deployment
- **Frontend:** Vercel
- **Backend + Database:** Railway

---

## 📁 Project Structure

```
sticobytes-website/
├── frontend/                   # React frontend application
│   ├── public/
│   │   ├── robots.txt          # SEO crawler rules
│   │   ├── sitemap.xml         # Points to dynamic sitemap
│   │   └── favicon.ico         # Brand favicon
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/         # Navbar, Footer, Layout
│   │   │   ├── blog/           # BlogCard
│   │   │   ├── team/           # TeamMemberCard
│   │   │   ├── gadgets/        # GadgetCard
│   │   │   ├── common/         # Button, Card, Input, Badge
│   │   │   └── sections/       # Hero, LatestBlogs, Newsletter
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Services.jsx
│   │   │   ├── Blog.jsx
│   │   │   ├── BlogPost.jsx
│   │   │   ├── Gadgets.jsx
│   │   │   ├── Team.jsx
│   │   │   ├── Contact.jsx
│   │   │   └── admin/          # Login, Dashboard, CreatePost, EditPost
│   │   ├── services/           # API utility functions
│   │   ├── context/            # AuthContext
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── vercel.json             # React Router fix for Vercel
│   ├── .npmrc                  # legacy-peer-deps=true
│   └── index.html              # JSON-LD structured data
│
├── backend/                    # Express.js backend API
│   ├── config/
│   │   ├── database.js         # PostgreSQL pool with SSL
│   │   └── cloudinary.js       # Cloudinary configuration
│   ├── controllers/            # Route handlers
│   ├── middleware/             # Auth, error handling
│   ├── models/                 # User model
│   ├── routes/                 # API routes + sitemap
│   ├── utils/                  # Helper functions
│   └── server.js               # Express app entry point
│
├── .gitignore
└── README.md
```

---

## ✅ Features

### Pages
- **Home** — Hero, Services Preview, Why Choose Us, Latest Blogs, Newsletter
- **About** — Company story, Mission, Vision, Two Pillars, Community focus
- **Services** — All 8 services with WhatsApp inquiry integration
- **Blog** — Listing with search, category filter, pagination
- **Blog Post** — Full post with social sharing, related posts, newsletter signup
- **Gadgets** — Product listings with WhatsApp purchase integration
- **Team** — Team member profiles with social links
- **Contact** — Form with WhatsApp delivery, contact info
- **Admin Dashboard** — Blog management with TipTap WYSIWYG editor

### Blog System
- TipTap WYSIWYG editor
- Categories and tags
- Draft/publish workflow
- Featured images via Cloudinary
- Reading time calculation
- View counter
- Social sharing (Facebook, Twitter, LinkedIn, WhatsApp, Copy Link)
- Related posts
- Dynamic SEO per post (Open Graph + Twitter Cards)

### Newsletter System
- Email subscription with validation
- Duplicate prevention
- Re-subscribe support
- Admin subscribers view
- Newsletter section on every blog post page

### SEO
- React Helmet Async on all pages
- Dynamic meta tags per blog post
- Open Graph and Twitter Card tags
- JSON-LD structured data (Organization + WebSite)
- robots.txt
- Dynamic sitemap (auto-updates with new blog posts)
- Google Search Console verified and submitted
- Local SEO (Umuahia, Abia State, Nigeria)
- Canonical URLs

### Security
- Helmet.js security headers
- Rate limiting (100 requests per 15 minutes)
- CORS configured for all domains
- JWT authentication on protected routes
- Input validation with express-validator
- Bcrypt password hashing
- Environment variables protected

### WhatsApp Integration
- Service inquiry buttons
- Gadget purchase buttons
- Contact form via WhatsApp
- Blog post sidebar CTA
- Business number: +234 811 339 3564

---

## 🗄️ Database Schema

| Table | Description |
|-------|-------------|
| users | Admin authentication |
| blog_posts | Blog content with SEO fields |
| categories | Blog post categories |
| tags | Blog post tags |
| post_tags | Many-to-many post-tag relationship |
| services | Agency services |
| gadgets | Product listings |
| team_members | Team profiles with JSONB social links |
| newsletter_subscribers | Email subscriptions |

---

## 🛠️ Local Development Setup

### Prerequisites
- Node.js (v18+)
- PostgreSQL (v14+)
- Git

### Frontend Setup
```bash
cd frontend
npm install --legacy-peer-deps
npm run dev
```
Runs on: http://localhost:5173

### Backend Setup
```bash
cd backend
npm install
npm run dev
```
Runs on: http://localhost:5000

---

## 🔐 Environment Variables

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

### Backend (.env)
```
PORT=5000
DATABASE_URL=postgresql://username:password@localhost:5432/sticobytes
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

---

## 📡 API Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | /api/auth/login | Admin login | Public |
| GET | /api/auth/me | Get current user | Protected |
| GET | /api/services | Get all services | Public |
| GET | /api/team | Get all team members | Public |
| GET | /api/gadgets | Get all gadgets | Public |
| GET | /api/blog | Get published posts | Public |
| GET | /api/blog/:slug | Get post by slug | Public |
| GET | /api/blog/categories | Get categories | Public |
| GET | /api/blog/all | Get all posts | Protected |
| POST | /api/blog | Create post | Protected |
| PUT | /api/blog/:id | Update post | Protected |
| DELETE | /api/blog/:id | Delete post | Protected |
| POST | /api/newsletter/subscribe | Subscribe | Public |
| GET | /api/newsletter/subscribers | Get subscribers | Protected |
| POST | /api/upload | Upload to Cloudinary | Protected |
| GET | /sitemap.xml | Dynamic sitemap | Public |

---

## 🌍 About Sticobytes

Sticobytes is a community-based digital agency founded in 2023 in Ezenobizi Umuopara, Umuahia, Abia State, Nigeria. We bridge the gap between technology and community by providing world-class digital services and training to small businesses, schools, students, and entrepreneurs.

**Services:** Web Development, Graphics Design, Business Branding, Digital Literacy, Basic Computer Training, React & Tailwind Training, SQL & Database Training, Web Development Mentorship

---

## 👨‍💻 Developer

**Chinedum Chijioke Obia**
Co-Founder & Full Stack Developer
- GitHub: [@naydum-dev](https://github.com/naydum-dev)
- Certiport Certified (HTML/CSS)
- Level 3 Frontend Certification — Nigeria Computer Professionals

---

## 📄 License

Proprietary — All rights reserved © 2026 Sticobytes Digital Agency
