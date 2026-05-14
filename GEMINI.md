# GEMINI.md - EPRN Project Instructions

This file provides foundational guidance for the EPRN (Entreprise Pontoise de Régulation des Nuisibles) project, a Jekyll-based static website for a pest control company in Charente-Maritime, France.

## Project Overview

- **Purpose:** Professional website for pest control services (deratization, disinfection, disinsectization, and treatment by shooting).
- **Architecture:** Jekyll static site deployed on GitHub Pages.
- **Content Management:** Managed via Sveltia CMS at `/admin/`.
- **Language:** French (all content and SEO).
- **Domain:** [https://eprn.fr](https://eprn.fr)

## Building and Running

### Prerequisites
- Ruby (v3.2 recommended)
- Bundler (`gem install bundler`)

### Development Commands
```bash
# Install dependencies
bundle install

# Local development server with live reload
# Accessible at http://localhost:4000
bundle exec jekyll serve --livereload

# Build the site
bundle exec jekyll build

# Serve with drafts visible
bundle exec jekyll serve --drafts
```

## Project Structure

- `_config.yml`: Core Jekyll configuration, collections, and plugins.
- `_services/`: Markdown files for individual service pages (e.g., `deratisation.md`).
- `_posts/`: Blog posts/news updates.
- `_data/interventions.yml`: Data for the intervention map.
- `_layouts/`: Page templates (`default.html`, `service.html`, `post.html`).
- `_includes/`: Reusable components (`header.html`, `footer.html`).
- `styles.css`: Main stylesheet containing all design tokens.
- `script.js`: Client-side interactions.
- `admin/`: CMS configuration (`config.yml`).

## Development Conventions

### Content & Collections
- **Services:** Every service file in `_services/` is rendered via `_layouts/service.html` and has a permalink at `/:name.html`.
- **Posts:** Follow standard Jekyll naming: `YYYY-MM-DD-slug.md`.
- **FAQ:** FAQ pages are standalone HTML files (`faq-*.html`) but are managed as structured data in the CMS.

### Pathing & Links
- Always use `{{ site.baseurl }}/path` for internal links to ensure portability.

### Critical Data Synchronization
Contact details are hardcoded in three locations and MUST be kept in sync:
1. `_includes/footer.html`
2. `contact.html` (if exists, check for standalone contact pages)
3. `_layouts/default.html` (Schema.org `LocalBusiness` JSON-LD)

**Current Contact Info:**
- **Address:** 4 Moulin de Barate – 17800 PONS
- **Phone:** 06 06 40 07 79 / +33606400779
- **Email:** eprn@hotmail.fr

### Styling & SEO
- **Styles:** Use `styles.css`. Adhere to established design tokens (Gradients: `#667eea` to `#764ba2`, Text: `#1a1a2e`, Accent: `#ffd700`).
- **SEO:** Handled via `jekyll-seo-tag` and custom meta/JSON-LD in `_layouts/default.html`. Service pages include specific `Service` schema.

## CMS Configuration
The site uses Sveltia CMS. Configuration is in `admin/config.yml`. It commits directly to the `main` branch. See `GUIDE_CMS.md` for user-facing instructions on token management.
