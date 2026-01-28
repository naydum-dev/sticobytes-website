import pool, { query } from "../config/database.js";
import bcrypt from "bcryptjs";

const seedData = async () => {
  try {
    console.log("🌱 Starting database seed...");

    // 1. Create admin user
    const hashedPassword = await bcrypt.hash("admin123", 10);
    const userResult = await query(
      `
      INSERT INTO users (username, email, password_hash, role)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (email) DO NOTHING
      RETURNING id, username, email;
    `,
      ["admin", "admin@sticobytes.com", hashedPassword, "admin"],
    );

    if (userResult.rows.length > 0) {
      console.log("✅ Admin user created:", userResult.rows[0].email);
    } else {
      console.log("ℹ️  Admin user already exists");
    }

    // 2. Create categories
    const categories = [
      {
        name: "Web Development",
        slug: "web-development",
        description:
          "Articles about web development, frameworks, and best practices",
      },
      {
        name: "Design",
        slug: "design",
        description: "UI/UX design, graphics, and visual content",
      },
      {
        name: "Business",
        slug: "business",
        description: "Business strategies, branding, and digital marketing",
      },
      {
        name: "Tutorial",
        slug: "tutorial",
        description: "Step-by-step guides and how-to articles",
      },
      {
        name: "Technology",
        slug: "technology",
        description: "Latest tech news and trends",
      },
    ];

    for (const cat of categories) {
      await query(
        `
        INSERT INTO categories (name, slug, description)
        VALUES ($1, $2, $3)
        ON CONFLICT (slug) DO NOTHING;
      `,
        [cat.name, cat.slug, cat.description],
      );
    }
    console.log("✅ Categories created");

    // 3. Create tags
    const tags = [
      { name: "React", slug: "react" },
      { name: "Tailwind CSS", slug: "tailwind-css" },
      { name: "Node.js", slug: "nodejs" },
      { name: "PostgreSQL", slug: "postgresql" },
      { name: "SEO", slug: "seo" },
      { name: "Beginners", slug: "beginners" },
      { name: "Advanced", slug: "advanced" },
      { name: "UI/UX", slug: "ui-ux" },
    ];

    for (const tag of tags) {
      await query(
        `
        INSERT INTO tags (name, slug)
        VALUES ($1, $2)
        ON CONFLICT (slug) DO NOTHING;
      `,
        [tag.name, tag.slug],
      );
    }
    console.log("✅ Tags created");

    // 4. Create services
    const services = [
      {
        title: "Web Development",
        description:
          "Custom website development using modern technologies like React, Node.js, and Tailwind CSS.",
        icon: "code",
        category: "development",
        featured: true,
      },
      {
        title: "Graphics Design",
        description:
          "Professional logo design, branding materials, and visual content creation.",
        icon: "palette",
        category: "design",
        featured: true,
      },
      {
        title: "Business Branding",
        description:
          "Complete branding solutions to establish your unique business identity.",
        icon: "briefcase",
        category: "branding",
        featured: true,
      },
      {
        title: "Web Development Mentorship",
        description: "One-on-one mentorship for aspiring web developers.",
        icon: "user-check",
        category: "education",
        featured: false,
      },
      {
        title: "Digital Literacy Training",
        description:
          "Basic to advanced digital skills training for individuals and businesses.",
        icon: "monitor",
        category: "education",
        featured: false,
      },
      {
        title: "React & Tailwind Training",
        description: "Comprehensive training in modern frontend development.",
        icon: "layers",
        category: "education",
        featured: false,
      },
    ];

    for (const service of services) {
      await query(
        `
        INSERT INTO services (title, description, icon, category, featured)
        VALUES ($1, $2, $3, $4, $5);
      `,
        [
          service.title,
          service.description,
          service.icon,
          service.category,
          service.featured,
        ],
      );
    }
    console.log("✅ Services created");

    // 5. Create team members
    const teamMembers = [
      {
        name: "Lead Developer",
        role: "Founder & Web Developer",
        bio: "Full-stack developer with expertise in React, Node.js, and modern web technologies.",
        email: "dev@sticobytes.com",
        phone: "+234 811 339 3564",
        social_links: JSON.stringify({
          twitter: "https://twitter.com/sticobytes",
          linkedin: "https://linkedin.com/company/sticobytes",
          github: "https://github.com/sticobytes",
        }),
        display_order: 1,
      },
      {
        name: "Business Manager",
        role: "Co-Founder & Business Manager",
        bio: "Certified business manager focused on operations, client relationships, and business growth.",
        email: "business@sticobytes.com",
        phone: "+234 811 339 3564",
        social_links: JSON.stringify({
          twitter: "https://twitter.com/sticobytes",
          linkedin: "https://linkedin.com/company/sticobytes",
        }),
        display_order: 2,
      },
    ];

    for (const member of teamMembers) {
      await query(
        `
        INSERT INTO team_members (name, role, bio, email, phone, social_links, display_order)
        VALUES ($1, $2, $3, $4, $5, $6, $7);
      `,
        [
          member.name,
          member.role,
          member.bio,
          member.email,
          member.phone,
          member.social_links,
          member.display_order,
        ],
      );
    }
    console.log("✅ Team members created");

    // 6. Create sample blog post
    const userCheck = await query("SELECT id FROM users WHERE email = $1", [
      "admin@sticobytes.com",
    ]);
    const authorId = userCheck.rows[0].id;

    const categoryCheck = await query(
      "SELECT id FROM categories WHERE slug = $1",
      ["web-development"],
    );
    const categoryId = categoryCheck.rows[0].id;

    const blogPost = await query(
      `
      INSERT INTO blog_posts (
        title, slug, content, excerpt, author_id, category_id, 
        status, reading_time, meta_title, meta_description, published_at
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, CURRENT_TIMESTAMP)
      RETURNING id;
    `,
      [
        "Getting Started with React and Tailwind CSS",
        "getting-started-with-react-and-tailwind-css",
        "<h2>Introduction</h2><p>React and Tailwind CSS are a powerful combination for modern web development. This guide will help you get started.</p><h2>Why Use React?</h2><p>React is a popular JavaScript library for building user interfaces with reusable components.</p><h2>Why Tailwind CSS?</h2><p>Tailwind CSS is a utility-first CSS framework that speeds up development.</p>",
        "Learn how to set up a React project with Tailwind CSS in this comprehensive guide for beginners.",
        authorId,
        categoryId,
        "published",
        5,
        "Getting Started with React and Tailwind CSS",
        "A comprehensive guide to setting up React with Tailwind CSS for modern web development.",
      ],
    );

    const blogPostId = blogPost.rows[0].id;

    // Add tags to blog post
    const reactTag = await query("SELECT id FROM tags WHERE slug = $1", [
      "react",
    ]);
    const tailwindTag = await query("SELECT id FROM tags WHERE slug = $1", [
      "tailwind-css",
    ]);
    const beginnersTag = await query("SELECT id FROM tags WHERE slug = $1", [
      "beginners",
    ]);

    await query(
      `
      INSERT INTO blog_post_tags (blog_post_id, tag_id)
      VALUES ($1, $2), ($1, $3), ($1, $4);
    `,
      [
        blogPostId,
        reactTag.rows[0].id,
        tailwindTag.rows[0].id,
        beginnersTag.rows[0].id,
      ],
    );

    console.log("✅ Sample blog post created");

    console.log("\n🎉 Database seeded successfully!\n");
    console.log("📝 Admin Login Credentials:");
    console.log("   Email: admin@sticobytes.com");
    console.log("   Password: admin123\n");

    await pool.end();
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    await pool.end();
    process.exit(1);
  }
};

seedData();
