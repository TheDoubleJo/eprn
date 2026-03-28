# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

EPRN (Entreprise Pontoise de Régulation des Nuisibles) is a Jekyll-based static website for a pest control company in Charente-Maritime, France. Deployed on GitHub Pages with Sveltia CMS for content management. All content is in French.

## Development Commands

```bash
# Install dependencies (first time)
bundle install

# Serve locally with live reload → http://localhost:4000
bundle exec jekyll serve

# Build to _site/
bundle exec jekyll build
```

**Windows note**: Gemfile includes `tzinfo`, `tzinfo-data`, `wdm` — used automatically on Windows.

## Architecture

### Jekyll Configuration (`_config.yml`)
- `baseurl`: empty string (site at custom domain root `https://eprn.fr`)
- Plugins: `jekyll-seo-tag`, `jekyll-sitemap`
- Jekyll `~> 3.9` (GitHub Pages compatible — no custom plugins allowed)

### Collections

**Services (`_services/`)** — markdown files rendered via `_layouts/service.html`:
- Permalink: `/:name.html` (e.g., `desinfection.md` → `/desinfection.html`)
- Front matter: `title`, `description`, `keywords`, `image`, `service_type`, `heading` (optional), `show_faq_link`, `faq_url`, `faq_link_text`

**Posts (`_posts/`)** — standard Jekyll blog (news/updates):
- Naming: `YYYY-MM-DD-slug.md`
- Front matter: `layout: post`, `title`, `description`, `image`, `date`

**Data (`_data/interventions.yml`)** — intervention map data:
- Fields per entry: `city`, `lat`, `lng`, `type` (pigeons/ragondins/rongeurs), `count`

### Layouts and Includes

- `_layouts/default.html`: master template — contains all SEO meta tags, Open Graph, Twitter Cards, and Schema.org `LocalBusiness` structured data
- `_layouts/post.html` / `_layouts/service.html`: extend `default`, with `service.html` adding Schema.org `Service` markup
- `_includes/header.html`, `_includes/footer.html`: navigation and footer

### CMS

Sveltia CMS at `/admin/` (`admin/config.yml`) commits directly to `TheDoubleJo/eprn` on `main` via GitHub Personal Access Token. Collections: Actualités, Services, Carte des Interventions, FAQ pages.

## Key Conventions

### Path Handling

Use `{{ site.baseurl }}/path` in templates (baseurl is empty but keep the prefix for portability).

### Data Consistency

Contact details appear in **three places** — keep them synchronized:
- `_includes/footer.html`
- `contact.html`
- `_layouts/default.html` (Schema.org)

Current values: address `4 Moulin de Barate – 17800 PONS`, phone `06 06 40 07 79` / `+33606400779`, email `eprn@hotmail.fr`

### FAQ Pages

FAQ pages (`faq-*.html`) are standalone HTML files driven by Liquid. The CMS manages them as structured `question`/`answer` pair lists. Corresponding service pages link to them via `show_faq_link` front matter.

## Styling

All styles in `styles.css`. Design tokens:
- **Colors**: primary gradient `#667eea → #764ba2`, text `#1a1a2e`, accent gold `#ffd700`, secondary `#4a5568`
- **Fonts**: `Inter` (headings), `Jost` (body), base `1.2rem`, line-height `1.55`
- **Layout**: content max-width `1000px`, header/services `1280px`
- **Breakpoints**: `900px`, `768px`, `600px`, `480px`

## SEO

`_layouts/default.html` injects: description/keywords meta, canonical URL, Open Graph, Twitter Cards, Schema.org `LocalBusiness` (address, phone, email, geo, service area 100km, opening hours Mon–Fri 08:00–18:00).
