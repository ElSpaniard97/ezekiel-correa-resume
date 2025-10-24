🧾 README.md — Ezekiel Correa Resume (Updated 2025-10-24)
📘 Overview

This repository hosts the interactive, secure, multi-tab portfolio resume for Ezekiel Correa.
The design merges a modern UI with responsive UX and professional presentation suitable for both desktop and mobile.

🌐 Live Preview

Host directly on GitHub Pages:

https://ElSpaniard97.github.io/ezekiel-correa-resume/

🧠 Features (Updated)
🔹 UX / Design

Fully redesigned multi-tab layout with smooth transitions

Electric blue accent theme with glowing animations

Hexagonal portrait with pulsating neon blue-cyan border

Font Awesome social bubbles (GitHub + LinkedIn icons only)

Clean portfolio-style navigation bar

Responsive design for mobile and tablet

Dark / Light mode toggle with local preference memory

🔹 Tools Tab Improvements

Now displays official brand-colored logos (via Simple Icons CDN
)

Automatic fallback to text labels if any logo fails to load

Subtle neon hover glow added to each tool card

Links to official tool sites (Jira, ServiceNow, Python, Cisco, etc.)

🔹 Security Enhancements

Added strict Content Security Policy (CSP) via <meta> tag:

Blocks unauthorized script injection

Allows only verified sources (GitHub, SimpleIcons, Font Awesome)

Forces HTTPS and disables embedded frames/forms

Replaced inline JavaScript (onclick) with secure event listeners

Sanitized all text insertions using .textContent (no HTML injection risk)

Ready for deployment on GitHub Pages, Netlify, or Vercel

💻 File Structure
ezekiel-correa-resume/
│
├── index.html          # Full HTML resume with all design + security updates
├── 2986ED64...jpeg     # Profile photo used in hexagonal glowing frame
└── README.md           # Documentation (this file)

🚀 Deployment Instructions

Push the latest changes to your GitHub repo:

git add .
git commit -m "Updated secure neon portfolio resume (Oct 24 2025)"
git push origin main


In your repository:

Go to Settings → Pages

Under Branch, select main → / (root)

Click Save

After 1–2 minutes, your portfolio will be live at:
https://ElSpaniard97.github.io/ezekiel-correa-resume/

🧰 Technologies Used

HTML5 / CSS3 / JavaScript (Vanilla)

Font Awesome (for social icons)

Simple Icons CDN (for tool logos)

GitHub Pages (for static hosting)

🔒 Security Headers (Optional for Netlify/Vercel)

If hosting elsewhere, add this to your netlify.toml or .htaccess:

[headers]
  for = "/*"
  [headers.values]
  X-Frame-Options = "DENY"
  X-Content-Type-Options = "nosniff"
  Referrer-Policy = "strict-origin-when-cross-origin"
  X-XSS-Protection = "1; mode=block"

🧑‍💻 Author

Ezekiel Correa
📍 Rockdale, TX
📧 saints.correa23@gmail.com

🔗 LinkedIn

💻 GitHub

🏁 Version

Last Updated: October 24, 2025
Version: v3.0 Secure Neon UX Edition
