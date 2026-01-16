# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

EPRN (Entreprise Pontoise de Régulation des Nuisibles) is a Jekyll-based static website for a pest control company in Charente-Maritime, France. The site is deployed on GitHub Pages and integrates Sveltia CMS for content management.

## Architecture

### Jekyll Static Site Generator

This site uses Jekyll to generate static pages from templates and markdown content. Jekyll configuration is in `_config.yml`.

**Key Configuration:**
- Base URL: `` (empty string - site is at custom domain root)
- Site URL: `https://eprn.fr`
- Markdown renderer: kramdown
- Plugins: `jekyll-seo-tag`, `jekyll-sitemap`
- Default layout: `default` for all pages
- Jekyll version: `~> 3.9` (specified in Gemfile)

### Directory Structure

```
eprn/
├── _config.yml              # Jekyll configuration
├── Gemfile                  # Ruby gem dependencies
├── _layouts/                # Page templates
│   ├── default.html         # Main layout with header/footer
│   ├── post.html            # Blog post layout
│   └── service.html         # Service detail page layout
├── _includes/               # Reusable components
│   ├── header.html          # Site header with navigation
│   └── footer.html          # Site footer
├── _services/               # Service pages (markdown collection)
│   ├── desinfection.md
│   ├── desinsectisation.md
│   ├── deratisation.md
│   └── traitement-tir.md
├── _posts/                  # Blog posts (markdown)
│   └── YYYY-MM-DD-slug.md   # Posts follow Jekyll naming convention
├── _data/                   # Data files
│   └── interventions.yml    # Map intervention data
├── admin/                   # Sveltia CMS admin interface
│   ├── config.yml           # CMS configuration
│   └── index.html           # CMS entry point
├── images/                  # Image assets
│   └── uploads/             # CMS-uploaded images
├── index.html               # Homepage (uses Liquid templating)
├── actualites.html          # Blog listing page
├── contact.html             # Contact page
├── carte-interventions.html # Interactive intervention map
├── FAQ pages                # Service-specific FAQ pages
│   ├── faq-desinfection.html
│   ├── faq-desinsectisation.html
│   ├── faq-deratisation.html
│   └── faq-traitement-tir.html
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
- Loops: `{% for post in site.posts %}`, `{% for service in site.services %}`
- Includes: `{% include header.html %}`
- Front matter: YAML metadata at the top of files between `---` delimiters

### Jekyll Collections

The site uses Jekyll collections for structured content:

**Services Collection (`_services/`):**
- Configured in `_config.yml` with `output: true`
- Permalink: `/:name.html` (e.g., desinfection.md → /desinfection.html)
- Layout: `service` (specified in defaults)
- Each service has: title, description, keywords (for SEO), image, service_type, optional heading, markdown body
- Services can link to their own FAQ pages via front matter: `show_faq_link`, `faq_url`, `faq_link_text`

**Posts Collection (`_posts/`):**
- Standard Jekyll blog posts for news/updates
- Layout: `post`
- Front matter includes: title, description, image, date

**Data Files (`_data/`):**
- `interventions.yml`: Geographic data for the intervention map (carte-interventions.html)
- Format: city, lat/lng coordinates, intervention type (pigeons/ragondins/rongeurs), count

### Sveltia CMS Integration

The site includes a modern, lightweight content management system accessible at `/admin/`:
- **CMS**: Sveltia CMS (modern successor to Netlify/Decap CMS)
- **Backend**: GitHub (commits directly to `TheDoubleJo/eprn` repository on `main` branch)
- **Authentication**: GitHub Personal Access Token (no OAuth server needed)
- **Content types**: Blog posts (`_posts/`), Services (`_services/`), Intervention map data (`_data/interventions.yml`), FAQ pages
- **Media storage**: `images/uploads/`
- **Configuration**: `admin/config.yml`

**Why Sveltia CMS:**
- Drop-in replacement for Decap CMS (same configuration file)
- 5x faster (300 KB vs 1.5 MB)
- Better UI/UX with modern interface
- No need for Netlify services or OAuth server
- Active maintenance (bugs fixed within 24h typically)

**CMS Collections:**
1. **Actualités (Blog posts)**: Title, description, image, date, body (markdown). Slug format: `YYYY-MM-DD-slug`. Creates files in `_posts/`
2. **Services**: Edit existing service pages (create disabled). Fields: title, description, keywords, image, service_type, heading, body, FAQ link settings
3. **Carte des Interventions**: Manage intervention map data. Fields: city, lat/lng, type (pigeons/ragondins/rongeurs), count
4. **FAQ**: Edit FAQ pages for each service type (dératisation, désinfection, désinsectisation, traitement par tir). Each FAQ has a list of question/answer pairs

**User Guide:** See `GUIDE_CMS.md` for detailed instructions on how to create a GitHub token and use the CMS (designed for non-technical users).

## Development Commands

### Local Development

```bash
# Install dependencies (first time only)
# The Gemfile already exists with all required gems
bundle install

# Serve the site locally with live reload
bundle exec jekyll serve

# Access at http://localhost:4000
# Note: baseurl is empty, so site runs at root, not /eprn
```

**Windows-specific notes:**
- The Gemfile includes Windows-specific gems (`tzinfo`, `tzinfo-data`, `wdm`)
- These are automatically used on Windows platforms

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
1. Navigate to `/admin/` (https://eprn.fr/admin/)
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
- `default.html`: Main template for all pages (includes SEO metadata, Schema.org structured data)
- `post.html`: Template for blog posts (extends default)
- `service.html`: Template for service detail pages (extends default, includes Schema.org Service markup)

**Includes** (`_includes/`):
- `header.html`: Site header and navigation
- `footer.html`: Site footer with contact info and links

### Editing Service Pages

Service pages are now **markdown files** in the `_services/` collection:
- Located in `_services/` directory (e.g., `desinfection.md`, `deratisation.md`)
- YAML front matter includes: title, description, keywords, image, service_type, optional heading, FAQ link settings
- Content written in markdown
- Rendered using `_layouts/service.html` template
- Can be edited via Sveltia CMS under "Services" collection
- Permalink structure: `/:name.html` (e.g., desinfection.md → /desinfection.html)

### Managing the Intervention Map

The site includes an interactive map showing past interventions (`carte-interventions.html`):
- Data stored in `_data/interventions.yml`
- Each entry has: city, lat/lng coordinates, type (pigeons/ragondins/rongeurs), count
- Editable via Sveltia CMS under "Carte des Interventions"
- Map uses Leaflet.js for rendering
- Different marker icons/colors for different intervention types

### Path Handling

**Important**: `site.baseurl` is **empty** for this site (custom domain at root):
- In templates: Use `{{ site.baseurl }}/path` or just `/path` (both work since baseurl is empty)
- The site is deployed at `https://eprn.fr` (not a subdirectory)
- For portability, continue using `{{ site.baseurl }}` prefix in templates in case baseurl changes
- Examples: `{{ site.baseurl }}/images/logo.png`, `{{ site.baseurl }}/contact.html`

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
3. Site is published at `https://eprn.fr` (custom domain)

**Settings:**
- Repository: `TheDoubleJo/eprn`
- Source: Deploy from branch `main`, folder `/root`
- Custom domain: `eprn.fr`
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
