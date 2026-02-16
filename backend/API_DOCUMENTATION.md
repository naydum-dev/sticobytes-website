# Sticobytes Blog API Documentation

## Base URL

```
http://localhost:5000/api
```

---

## Blog Endpoints

### 1. Get All Blog Posts

**GET** `/blog`

**Query Parameters:**

- `page` (optional, default: 1) - Page number
- `limit` (optional, default: 9) - Posts per page
- `category` (optional) - Filter by category slug

**Example:**

```
GET /blog?page=1&limit=9&category=web-development
```

**Response:**

```json
{
  "success": true,
  "count": 2,
  "total": 2,
  "page": 1,
  "totalPages": 1,
  "data": [...]
}
```

---

### 2. Get Single Blog Post

**GET** `/blog/:slug`

**Example:**

```
GET /blog/getting-started-with-react-in-2026
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Getting Started with React in 2026",
    "slug": "getting-started-with-react-in-2026",
    "content": "...",
    "excerpt": "...",
    "featured_image": "https://...",
    "category_name": "Web Development",
    "category_slug": "web-development",
    "tags": [...],
    "views": 5,
    "reading_time": 3,
    "created_at": "...",
    "published_at": "..."
  }
}
```

**Note:** This endpoint automatically increments the view count.

---

### 3. Create Blog Post

**POST** `/blog`

**Body (JSON):**

```json
{
  "title": "Your Blog Title",
  "content": "Full blog content here...",
  "excerpt": "Short description...",
  "featured_image": "https://cloudinary.com/...",
  "category_id": 1,
  "tags": ["React", "JavaScript"],
  "status": "published",
  "meta_title": "SEO Title",
  "meta_description": "SEO Description"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Blog post created successfully",
  "data": {...}
}
```

**Notes:**

- Slug is auto-generated from title
- Reading time is auto-calculated
- Tags are created if they don't exist
- Status options: "draft" or "published"

---

### 4. Update Blog Post

**PUT** `/blog/:id`

**Body (JSON):**

```json
{
  "title": "Updated Title",
  "content": "Updated content...",
  "status": "published"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Blog post updated successfully",
  "data": {...}
}
```

**Notes:**

- Only include fields you want to update
- Slug is regenerated if title changes
- published_at is set when status changes to "published"

---

### 5. Delete Blog Post

**DELETE** `/blog/:id`

**Example:**

```
DELETE /blog/1
```

**Response:**

```json
{
  "success": true,
  "message": "Blog post deleted successfully",
  "data": {...}
}
```

---

### 6. Get All Categories

**GET** `/blog/categories`

**Response:**

```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "id": 1,
      "name": "Web Development",
      "slug": "web-development",
      "description": "..."
    },
    ...
  ]
}
```

---

## Upload Endpoints

### 7. Upload Image

**POST** `/upload`

**Body (form-data):**

- Key: `image`
- Type: File
- Value: Select image file (JPG, PNG, etc.)

**Response:**

```json
{
  "success": true,
  "message": "Image uploaded successfully",
  "data": {
    "url": "https://res.cloudinary.com/...",
    "public_id": "sticobytes/blog/...",
    "width": 1200,
    "height": 630,
    "format": "jpg",
    "size": 145230
  }
}
```

**Notes:**

- Max file size: 5MB
- Auto-optimized (max 1200x630)
- Stored in Cloudinary folder: sticobytes/blog/

---

### 8. Delete Image

**DELETE** `/upload/:publicId`

**Example:**

```
DELETE /upload/sticobytes%2Fblog%2Fabc123
```

**Response:**

```json
{
  "success": true,
  "message": "Image deleted successfully"
}
```

**Note:** public_id must be URL encoded

---

## Database Schema

### blog_posts Table

```sql
- id (SERIAL PRIMARY KEY)
- title (VARCHAR 255, NOT NULL)
- slug (VARCHAR 300, NOT NULL, UNIQUE)
- content (TEXT, NOT NULL)
- excerpt (TEXT)
- featured_image (VARCHAR 500)
- author_id (INTEGER)
- category_id (INTEGER, FK → categories)
- status (VARCHAR 20, DEFAULT 'draft')
- views (INTEGER, DEFAULT 0)
- reading_time (INTEGER)
- meta_title (VARCHAR 60)
- meta_description (VARCHAR 160)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
- published_at (TIMESTAMP)
```

### categories Table

```sql
- id (SERIAL PRIMARY KEY)
- name (VARCHAR 100, NOT NULL, UNIQUE)
- slug (VARCHAR 120, NOT NULL, UNIQUE)
- description (TEXT)
- created_at (TIMESTAMP)
```

### tags Table

```sql
- id (SERIAL PRIMARY KEY)
- name (VARCHAR 50, NOT NULL, UNIQUE)
- slug (VARCHAR 60, NOT NULL, UNIQUE)
- created_at (TIMESTAMP)
```

### post_tags Table (Junction)

```sql
- post_id (INTEGER, FK → blog_posts)
- tag_id (INTEGER, FK → tags)
- created_at (TIMESTAMP)
- PRIMARY KEY (post_id, tag_id)
```

---

## Features

✅ Pagination support
✅ Category filtering
✅ Auto slug generation
✅ Auto reading time calculation
✅ View counter (auto-increment)
✅ Tag management (auto-create)
✅ SEO meta tags
✅ Draft/Published status
✅ Image upload to Cloudinary
✅ Image optimization (1200x630 max)
✅ Relations (categories, tags)

---

## Coming Soon

🔄 Authentication & Authorization
🔄 Admin-only routes protection
🔄 Search functionality
🔄 Featured posts filter
🔄 Related posts
🔄 Comment system

---

**Last Updated:** Day 11 - February 17, 2026
