import express from "express";
import pool from "../config/database.js";

const router = express.Router();

router.get("/sitemap.xml", async (req, res) => {
  try {
    // Fetch all published blog posts
    const result = await pool.query(
      `SELECT slug, updated_at FROM blog_posts 
       WHERE status = 'published' 
       ORDER BY published_at DESC`,
    );

    const blogPosts = result.rows;

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://sticobytes.com</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://sticobytes.com/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://sticobytes.com/services</loc>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://sticobytes.com/blog</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://sticobytes.com/gadgets</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://sticobytes.com/team</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://sticobytes.com/contact</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  ${blogPosts
    .map(
      (post) => `
  <url>
    <loc>https://sticobytes.com/blog/${post.slug}</loc>
    <lastmod>${new Date(post.updated_at).toISOString().split("T")[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`,
    )
    .join("")}
</urlset>`;

    res.header("Content-Type", "application/xml");
    res.send(sitemap);
  } catch (error) {
    console.error("Sitemap error:", error);
    res.status(500).send("Error generating sitemap");
  }
});

export default router;
