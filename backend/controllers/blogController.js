import pool from "../config/database.js";

// Helper function to generate slug from title
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

// Helper function to calculate reading time (average 200 words per minute)
const calculateReadingTime = (content) => {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  return readingTime;
};

// @desc    Get all published blog posts with pagination
// @route   GET /api/blog
// @access  Public
export const getAllPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;
    const offset = (page - 1) * limit;
    const category = req.query.category;

    let query = `
      SELECT 
        bp.id, bp.title, bp.slug, bp.excerpt, bp.featured_image,
        bp.status, bp.views, bp.reading_time, bp.created_at, bp.published_at,
        c.name as category_name, c.slug as category_slug,
        COALESCE(
          json_agg(
            DISTINCT jsonb_build_object('id', t.id, 'name', t.name, 'slug', t.slug)
          ) FILTER (WHERE t.id IS NOT NULL), '[]'
        ) as tags
      FROM blog_posts bp
      LEFT JOIN categories c ON bp.category_id = c.id
      LEFT JOIN post_tags pt ON bp.id = pt.post_id
      LEFT JOIN tags t ON pt.tag_id = t.id
      WHERE bp.status = 'published'
    `;

    const queryParams = [];

    if (category) {
      query += ` AND c.slug = $${queryParams.length + 1}`;
      queryParams.push(category);
    }

    query += `
      GROUP BY bp.id, c.name, c.slug
      ORDER BY bp.published_at DESC
      LIMIT $${queryParams.length + 1} OFFSET $${queryParams.length + 2}
    `;

    queryParams.push(limit, offset);

    const result = await pool.query(query, queryParams);

    // Get total count for pagination
    let countQuery = `
      SELECT COUNT(DISTINCT bp.id) as total
      FROM blog_posts bp
      LEFT JOIN categories c ON bp.category_id = c.id
      WHERE bp.status = 'published'
    `;

    const countParams = [];
    if (category) {
      countQuery += ` AND c.slug = $1`;
      countParams.push(category);
    }

    const countResult = await pool.query(countQuery, countParams);
    const total = parseInt(countResult.rows[0].total);
    const totalPages = Math.ceil(total / limit);

    res.status(200).json({
      success: true,
      count: result.rows.length,
      total,
      page,
      totalPages,
      data: result.rows,
    });
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch blog posts",
      error: error.message,
    });
  }
};

// @desc    Get single blog post by slug
// @route   GET /api/blog/:slug
// @access  Public
export const getPostBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const query = `
      SELECT 
        bp.id, bp.title, bp.slug, bp.content, bp.excerpt, bp.featured_image,
        bp.status, bp.views, bp.reading_time, bp.meta_title, bp.meta_description,
        bp.created_at, bp.published_at, bp.updated_at,
        c.name as category_name, c.slug as category_slug,
        COALESCE(
          json_agg(
            DISTINCT jsonb_build_object('id', t.id, 'name', t.name, 'slug', t.slug)
          ) FILTER (WHERE t.id IS NOT NULL), '[]'
        ) as tags
      FROM blog_posts bp
      LEFT JOIN categories c ON bp.category_id = c.id
      LEFT JOIN post_tags pt ON bp.id = pt.post_id
      LEFT JOIN tags t ON pt.tag_id = t.id
      WHERE bp.slug = $1 AND bp.status = 'published'
      GROUP BY bp.id, c.name, c.slug
    `;

    const result = await pool.query(query, [slug]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Blog post not found",
      });
    }

    // Increment view count
    await pool.query(
      "UPDATE blog_posts SET views = views + 1 WHERE slug = $1",
      [slug],
    );

    res.status(200).json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error fetching blog post:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch blog post",
      error: error.message,
    });
  }
};

// @desc    Create new blog post
// @route   POST /api/blog
// @access  Private (Admin only - will protect later)
export const createPost = async (req, res) => {
  try {
    const {
      title,
      content,
      excerpt,
      featured_image,
      category_id,
      tags,
      status,
      meta_title,
      meta_description,
    } = req.body;

    // Generate slug from title
    const slug = generateSlug(title);

    // Calculate reading time
    const reading_time = calculateReadingTime(content);

    // Check if slug already exists
    const slugCheck = await pool.query(
      "SELECT id FROM blog_posts WHERE slug = $1",
      [slug],
    );

    if (slugCheck.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message:
          "A post with this title already exists. Please use a different title.",
      });
    }

    // Insert blog post
    const published_at = status === "published" ? new Date() : null;

    const postResult = await pool.query(
      `INSERT INTO blog_posts (
        title, slug, content, excerpt, featured_image, category_id,
        status, views, reading_time, meta_title, meta_description,
        published_at, created_at, updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      RETURNING *`,
      [
        title,
        slug,
        content,
        excerpt,
        featured_image,
        category_id,
        status || "draft",
        0,
        reading_time,
        meta_title || title,
        meta_description || excerpt,
        published_at,
      ],
    );

    const postId = postResult.rows[0].id;

    // Insert tags if provided
    if (tags && tags.length > 0) {
      for (const tagName of tags) {
        // Check if tag exists, if not create it
        const tagSlug = generateSlug(tagName);

        let tagResult = await pool.query(
          "SELECT id FROM tags WHERE slug = $1",
          [tagSlug],
        );

        let tagId;
        if (tagResult.rows.length === 0) {
          // Create new tag
          const newTag = await pool.query(
            "INSERT INTO tags (name, slug) VALUES ($1, $2) RETURNING id",
            [tagName, tagSlug],
          );
          tagId = newTag.rows[0].id;
        } else {
          tagId = tagResult.rows[0].id;
        }

        // Link tag to post
        await pool.query(
          "INSERT INTO post_tags (post_id, tag_id) VALUES ($1, $2)",
          [postId, tagId],
        );
      }
    }

    res.status(201).json({
      success: true,
      message: "Blog post created successfully",
      data: postResult.rows[0],
    });
  } catch (error) {
    console.error("Error creating blog post:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create blog post",
      error: error.message,
    });
  }
};

// @desc    Update blog post
// @route   PUT /api/blog/:id
// @access  Private (Admin only - will protect later)
export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      content,
      excerpt,
      featured_image,
      category_id,
      tags,
      status,
      meta_title,
      meta_description,
    } = req.body;

    // Check if post exists
    const postCheck = await pool.query(
      "SELECT * FROM blog_posts WHERE id = $1",
      [id],
    );

    if (postCheck.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Blog post not found",
      });
    }

    const currentPost = postCheck.rows[0];
    const slug = title ? generateSlug(title) : currentPost.slug;
    const reading_time = content
      ? calculateReadingTime(content)
      : currentPost.reading_time;

    // Check if new slug conflicts with another post
    if (title && slug !== currentPost.slug) {
      const slugCheck = await pool.query(
        "SELECT id FROM blog_posts WHERE slug = $1 AND id != $2",
        [slug, id],
      );

      if (slugCheck.rows.length > 0) {
        return res.status(400).json({
          success: false,
          message:
            "A post with this title already exists. Please use a different title.",
        });
      }
    }

    // Update published_at if status changed to published
    let published_at = currentPost.published_at;
    if (status === "published" && currentPost.status !== "published") {
      published_at = new Date();
    }

    // Update blog post
    const updateResult = await pool.query(
      `UPDATE blog_posts SET
        title = $1, slug = $2, content = $3, excerpt = $4,
        featured_image = $5, category_id = $6, status = $7,
        reading_time = $8, meta_title = $9, meta_description = $10,
        published_at = $11, updated_at = CURRENT_TIMESTAMP
      WHERE id = $12
      RETURNING *`,
      [
        title || currentPost.title,
        slug,
        content || currentPost.content,
        excerpt || currentPost.excerpt,
        featured_image || currentPost.featured_image,
        category_id || currentPost.category_id,
        status || currentPost.status,
        reading_time,
        meta_title || currentPost.meta_title,
        meta_description || currentPost.meta_description,
        published_at,
        id,
      ],
    );

    // Update tags if provided
    if (tags) {
      // Remove existing tags
      await pool.query("DELETE FROM post_tags WHERE post_id = $1", [id]);

      // Add new tags
      if (tags.length > 0) {
        for (const tagName of tags) {
          const tagSlug = generateSlug(tagName);

          let tagResult = await pool.query(
            "SELECT id FROM tags WHERE slug = $1",
            [tagSlug],
          );

          let tagId;
          if (tagResult.rows.length === 0) {
            const newTag = await pool.query(
              "INSERT INTO tags (name, slug) VALUES ($1, $2) RETURNING id",
              [tagName, tagSlug],
            );
            tagId = newTag.rows[0].id;
          } else {
            tagId = tagResult.rows[0].id;
          }

          await pool.query(
            "INSERT INTO post_tags (post_id, tag_id) VALUES ($1, $2)",
            [id, tagId],
          );
        }
      }
    }

    res.status(200).json({
      success: true,
      message: "Blog post updated successfully",
      data: updateResult.rows[0],
    });
  } catch (error) {
    console.error("Error updating blog post:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update blog post",
      error: error.message,
    });
  }
};

// @desc    Delete blog post
// @route   DELETE /api/blog/:id
// @access  Private (Admin only - will protect later)
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM blog_posts WHERE id = $1 RETURNING *",
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Blog post not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Blog post deleted successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error deleting blog post:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete blog post",
      error: error.message,
    });
  }
};

// @desc    Get all categories
// @route   GET /api/blog/categories
// @access  Public
export const getAllCategories = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM categories ORDER BY name ASC",
    );

    res.status(200).json({
      success: true,
      count: result.rows.length,
      data: result.rows,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch categories",
      error: error.message,
    });
  }
};
