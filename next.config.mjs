/** @type {import('next').NextConfig} */
const nextConfig = {
  // Emit a fully static site to `out/` so it can be served from GitHub Pages
  // (no Node server / API routes). Vercel serves the same static output.
  output: 'export',
  // GitHub Pages has no Image Optimization server; serve the original files.
  images: { unoptimized: true },
  // Stable directory-style URLs on static hosting (/travel/ -> /travel/index.html).
  trailingSlash: true,
};

export default nextConfig;
