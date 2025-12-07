# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

EPRN (Entreprise Pontoise de Régulation des Nuisibles) is a Jekyll-based static website for a pest control company in Charente-Maritime, France. The site is deployed on GitHub Pages and integrates Sveltia CMS for content management.

## Architecture

### Jekyll Static Site Generator

This site uses Jekyll to generate static pages from templates and markdown content. Jekyll configuration is in `_config.yml`.

**Key Configuration:**
- Base URL: `/eprn`
- Site URL: `https://thedoublejo.github.io`
- Markdown renderer: kramdown
- Plugins: `jekyll-seo-tag`, `jekyll-sitemap`
- Default layout: `default` for all pages

### Directory Structure

```
eprn/
├── _config.yml              # Jekyll configuration
├── _layouts/                # Page templates
│   ├── default.html         # Main layout with header/footer
│   └── post.html            # Blog post layout
├── _includes/               # Reusable components
│   ├── header.html          # Site header with navigation
│   └── footer.html          # Site footer
├── _posts/                  # Blog posts (markdown)
│   └── YYYY-MM-DD-slug.md   # Posts follow Jekyll naming convention
├── admin/                   # Decap CMS admin interface
│   ├── config.yml           # CMS configuration
│   └── index.html           # CMS entry point
├── images/                  # Image assets
│   └── uploads/             # CMS-uploaded images
├── index.html               # Homepage (uses Liquid templating)
├── actualites.html          # Blog listing page
├── contact.html             # Contact page
├── Service pages            # Static service description pages
│   ├── desinfection.html
│   ├── desinsectisation.html
│   ├── deratisation.html
│   └── traitement-tir.html
├── Legal pages              # Legal and info pages
│   ├── mentions-legales.html
│   ├── politique-confidentialite.html
│   ├── qui-sommes-nous.html
│   └── faq.html
├── styles.css               # Global stylesheet
└── script.js                # Global JavaScript
```

### Templating System

Pages use **Liquid templating** (Jekyll's template language):
- Variables: `{{ site.baseurl }}`, `{{ page.title }}`, `{{ content }}`
- Loops: `{% for post in site.posts %}`
- Includes: `{% include header.html %}`
- Front matter: YAML metadata at the top of files between `---` delimiters

### Sveltia CMS Integration

The site includes a modern, lightweight content management system accessible at `/admin/`:
- **CMS**: Sveltia CMS (modern successor to Netlify/Decap CMS)
- **Backend**: GitHub (commits directly to the repository)
- **Authentication**: GitHub Personal Access Token (no OAuth server needed)
- **Content type**: Blog posts in `_posts/` folder
- **Media storage**: `images/uploads/`
- **Configuration**: `admin/config.yml`

**Why Sveltia CMS:**
- Drop-in replacement for Decap CMS (same configuration file)
- 5x faster (300 KB vs 1.5 MB)
- Better UI/UX with modern interface
- No need for Netlify services or OAuth server
- Active maintenance (bugs fixed within 24h typically)

**CMS fields for blog posts:**
- Title, description, image, date, body (markdown)
- Slug format: `YYYY-MM-DD-slug`

**User Guide:** See `GUIDE_CMS.md` for detailed instructions on how to create a GitHub token and use the CMS (designed for non-technical users).

## Development Commands

### Local Development

```bash
# Install Jekyll and dependencies (first time only)
gem install bundler jekyll

# Create a Gemfile if needed
bundle init
bundle add jekyll
bundle add jekyll-seo-tag
bundle add jekyll-sitemap

# Serve the site locally with live reload
bundle exec jekyll serve

# Access at http://localhost:4000/eprn
```

### Building

```bash
# Build the site (outputs to _site/ directory)
bundle exec jekyll build

# GitHub Pages builds automatically on push to main branch
```

### Testing Locally Without Jekyll

For quick HTML/CSS/JS testing without Jekyll build:

```bash
# Python 3
python -m http.server 8000

# Note: Liquid tags won't render, and paths may break
```

## Styling and Design

### Color Scheme
- Primary gradient: Purple/blue (`#667eea` to `#764ba2`)
- Text: Dark gray (`#1a1a2e`)
- Background: White/light gray (`#ffffff`, `#f9f9f9`)
- Accent: Gold (`#ffd700`)
- Secondary text: `#4a5568`

### Typography
- Headings: `Inter` font family (Google Fonts)
- Body text: `Jost` font family (Google Fonts)
- Base font size: `1.2rem`
- Line height: `1.55`

### Layout Patterns
- Container max-width: `1000px` (content), `1280px` (header/services)
- Services grid: 4 columns desktop → 2 columns tablet → 1 column mobile
- Footer grid: 30% / 45% / 20% on desktop, stacks on mobile
- Responsive breakpoints: `900px`, `768px`, `600px`, `480px`

### CSS Organization

`styles.css` contains all styles. Key sections:
- Header and navigation
- Hero section
- Services grid and cards (used for both services and blog posts)
- Service detail pages
- Contact page
- Footer
- Responsive media queries

## SEO and Metadata

The site includes comprehensive SEO optimization in `_layouts/default.html`:
- **Meta tags**: Description, keywords, canonical URL
- **Open Graph**: Facebook/social sharing metadata
- **Twitter Cards**: Twitter-specific metadata
- **Schema.org**: LocalBusiness structured data with:
  - Business name, address, phone, email
  - Geographic coordinates and service area (100km radius)
  - Opening hours (Mon-Fri 08:00-18:00)
  - Service types

## Working with This Codebase

### Adding a Blog Post

**Via Sveltia CMS (recommended for non-technical users):**
1. Navigate to `/admin/` (https://thedoublejo.github.io/eprn/admin/)
2. Authenticate with GitHub Personal Access Token (first time only)
3. Click "Actualités" → "New Actualités"
4. Fill in title, description, image, date, and content
5. Click "Publish" → "Publish now" (commits to GitHub)
6. GitHub Pages rebuilds the site automatically (~1-2 minutes)

**Note:** See `GUIDE_CMS.md` for detailed step-by-step instructions with screenshots for creating the GitHub token.

**Manually:**
1. Create a file in `_posts/` with format: `YYYY-MM-DD-title-slug.md`
2. Add YAML front matter:
```yaml
---
layout: post
title: "Your Title"
description: "Brief description"
image: "/images/your-image.jpg"
date: YYYY-MM-DD HH:MM:SS +0100
---
```
3. Write content in markdown below the front matter
4. Commit and push

### Modifying Page Templates

**Layouts** (`_layouts/`):
- `default.html`: Main template for all pages
- `post.html`: Template for blog posts (extends default)

**Includes** (`_includes/`):
- `header.html`: Site header and navigation
- `footer.html`: Site footer with contact info and links

### Editing Service Pages

Service pages (desinfection.html, etc.) are static HTML files with:
- YAML front matter for title and description
- HTML content in the body
- Links to images in `images/` directory
- Use `{{ site.baseurl }}` for all internal links and assets

### Path Handling

**Critical**: Always use `{{ site.baseurl }}` for internal links and assets:
- Correct: `{{ site.baseurl }}/images/logo.png`
- Correct: `{{ site.baseurl }}/contact.html`
- Wrong: `/images/logo.png` (breaks on GitHub Pages)

### Data Consistency

Contact information appears in multiple locations and must stay synchronized:
- `_includes/footer.html`
- `contact.html`
- `_layouts/default.html` (Schema.org structured data)

**Current contact details:**
- Address: 4 Moulin de Barate – 17800 PONS
- Phone: 06 06 40 07 79 (or +33606400779 in Schema.org)
- Email: eprn@hotmail.fr

## Deployment

### GitHub Pages

The site deploys automatically via GitHub Pages:
1. Push to `main` branch
2. GitHub Pages builds with Jekyll
3. Site is published at `https://thedoublejo.github.io/eprn`

**Settings:**
- Source: Deploy from branch `main`, folder `/root`
- Jekyll builds automatically (no manual build step needed)
- Build time: ~1-2 minutes

### Sveltia CMS Setup

The CMS is already configured and ready to use. For new users:
1. User creates a GitHub Personal Access Token (see `GUIDE_CMS.md`)
2. Token needs `Contents: Read and write` permission on the `TheDoubleJo/eprn` repository
3. User authenticates once in the CMS at `/admin/`
4. Browser saves the token locally for future sessions

**No server or OAuth configuration needed** - Sveltia CMS authenticates directly with GitHub using the token.

## Important Notes

- **Language**: All content is in French
- **Character encoding**: UTF-8
- **Branch**: `main` (not master)
- **Jekyll version**: Compatible with GitHub Pages (currently Jekyll 3.9+)
- **No custom plugins**: Only GitHub Pages-approved plugins are used
- **Liquid syntax**: Used throughout HTML files for templating
