\# Software Requirement Specification (SRS) \& Instructions

\*\*Project:\*\* Gym Supplement E-Commerce Website (Catalog Style)

\*\*Target Platform:\*\* Free Hosting (GitHub Pages / Vercel / Netlify)

\*\*Technical Skill Level:\*\* No-Code / Beginner (Requires Admin Panel to manage products without editing code)



\---



\## 1. Project Overview \& Architecture

The goal is to build a modern, fast, and responsive web application to showcase gym supplements. Since the user cannot edit code and prefers free hosting (like GitHub), the system must utilize a \*\*Headless CMS\*\* or a \*\*Free Backend Database\*\* that provides an automatic Admin Panel (GUI) for product management.



\### Recommended Tech Stack (100% Free Tier):

\*   \*\*Frontend:\*\* Next.js or React (Hosted on Vercel or Netlify - fully integrated with GitHub).

\*   \*\*Backend/Database \& Admin Panel:\*\* Supabase (PostgreSQL) + Admin GUI \*\*OR\*\* a Free Headless CMS (like Sanity.io / Strapi / Payload CMS).

\*   \*\*Storage (For Product Images):\*\* Cloudinary (Free Tier) or Supabase Storage.



\---



\## 2. Core Features \& Requirements



\### A. Customer-Facing Website (Frontend)

\*   \*\*Responsive Design:\*\* Must be 100% mobile-friendly (since most gym-goers browse via phone).

\*   \*\*Home Page:\*\*

&#x20;   \*   Hero section with high-quality banners (e.g., "Fuel Your Gains").

&#x20;   \*   Featured Products slider/grid.

&#x20;   \*   Shop by Category (Whey Protein, Creatine, Pre-Workout, Fat Burners, Vitamins).

&#x20;   \*   Customer Testimonials \& Before/After section.

\*   \*\*Product Catalog / Shop Page:\*\*

&#x20;   \*   Grid view of all products.

&#x20;   \*   Filters: By Category, Price Range, and Brand.

&#x20;   \*   Search Bar: Instant search by product name.

\*   \*\*Product Detail Page:\*\*

&#x20;   \*   High-resolution product images with zoom.

&#x20;   \*   Price, Discount Price (if any), Brand, and Availability Status (In Stock / Out of Stock).

&#x20;   \*   Detailed Description, Nutritional Information, and How to Use.

\*   \*\*Contact \& Ordering System (Since no payment gateway is requested yet):\*\*

&#x20;   \*   "Order via WhatsApp" button on each product page (auto-fills product name and link).

&#x20;   \*   Simple Shopping Cart that calculates the total and sends the final bill via WhatsApp or a simple contact form.



\### B. Admin Panel / Backend (No-Code Product Management)

The admin must be able to log in securely via a web browser to manage products without touching code.

\*   \*\*Product Management (CRUD):\*\*

&#x20;   \*   \*\*Add New Product:\*\* Fields for Name, Brand, Category, Original Price, Discount Price, Description, Nutritional Info, Stock Status, and Image Upload.

&#x20;   \*   \*\*Edit Product:\*\* Update prices, descriptions, or change stock status instantly.

&#x20;   \*   \*\*Delete Product:\*\* Remove discontinued items.

\*   \*\*Image Management:\*\* Automated upload to cloud storage (e.g., Cloudinary) via the admin panel.



\---



\## 3. Detailed Page Wise Requirements



\### 1. Navigation Bar (Header)

\*   Logo (Gym Supplement Shop Name)

\*   Links: Home, Shop, About Us, Contact Us

\*   Search Icon / Bar

\*   Cart Icon (showing number of items added)



\### 2. Product Card Component

\*   Product Image (with hover effect)

\*   Brand Name (Small text)

\*   Product Title (Bold)

\*   Price (Original Price strikethrough if discounted, Final Price highlighted)

\*   "View Details" Button \& "Order via WhatsApp" Quick Button



\### 3. Footer

\*   Quick links (Privacy Policy, Terms of Service)

\*   Social Media Handles (Instagram, Facebook, TikTok)

\*   Contact Info (Phone, Email, Shop Address)



\---



\## 4. Non-Functional \& Deployment Instructions



\*   \*\*Performance:\*\* Images must be optimized (WebP format) to ensure the site loads in under 2 seconds.

\*   \*\*SEO Optimization:\*\* Meta tags, titles, and descriptions must be dynamically generated per product to help rank on Google.

\*   \*\*Security:\*\* The Backend Admin Panel must be password protected (JWT or Firebase/Supabase Auth).

\*   \*\*Deployment Workflow:\*\*

&#x20;   1. Connect the code repository to \*\*GitHub\*\*.

&#x20;   2. Deploy the Frontend to \*\*Vercel\*\* (Vercel automatically pulls code from GitHub and hosts it for free).

&#x20;   3. Connect the Frontend to the \*\*Headless CMS / Database API\*\* using environment variables (`.env`).



\---



\## 5. Developer Prompt for AI Generation

\*If using an AI tool (like Cursor, v0, or ChatGPT) to generate the code, use the prompt below:\*



> "Act as an expert full-stack developer. Build a Gym Supplement e-commerce store using Next.js (Tailwind CSS) for the frontend and Sanity.io (or Supabase with a simple admin GUI) for the backend. The frontend must be hosted on Vercel for free, pulling code from GitHub. Include a fully responsive UI, a product filtering system, a shopping cart that exports orders directly to WhatsApp, and a secure backend panel where a non-technical user can add, edit, and delete products (including uploading images) without writing code. Provide clean, modular code and clear setup instructions."

