# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

EPRN (Entreprise Pontoise de Régulation des Nuisibles) is a static website for a pest control company, reproduced from the original WordPress site at eprn.fr for deployment on GitHub Pages. The site is entirely static HTML/CSS/JavaScript with no build process or dependencies.

## Architecture

This is a **pure static website** with no frameworks, build tools, or package managers.

### Multi-Version Structure

The site offers **two visual versions** accessible via different URLs:

```
eprn/
├── index.html (version selector landing page)
├── v1/ (classic version - original design)
│   ├── index.html
│   ├── styles.css
│   ├── script.js
│   └── ... (all page HTML files)
├── v2/ (modern version - contemporary design)
│   ├── index.html
│   ├── styles.css
│   ├── script.js
│   └── ... (all page HTML files)
└── images/ (shared between both versions)
```

**Version 1 (Classic)**: Original design with neutral colors, traditional layout
- URL: `/v1/index.html`
- Colors: Black/gray (#111111, #636363) on white/light gray (#ffffff, #f9f9f9)
- Style: Professional and understated

**Version 2 (Modern)**: Contemporary design with gradients and animations
- URL: `/v2/index.html`
- Colors: Purple/blue gradients (#667eea, #764ba2) with modern accents
- Style: Dynamic with smooth animations, rounded corners, and shadow effects

**Root index.html**: Elegant landing page allowing users to choose between v1 and v2

### Common Elements

- **HTML Pages**: Individual HTML files for each page (index, service pages, legal pages, contact)
- **Styling**: Each version has its own `styles.css` file with distinct visual styles but identical layout structure
- **JavaScript**: Each version has `script.js` for vanilla JavaScript interactions (identical functionality)
- **Assets**: Images stored in shared `images/` directory at root level (accessed via `images/` from version folders)
- **Fonts**: Google Fonts (Inter and Jost) loaded via CDN

### Page Structure

All pages share a consistent structure:
- **Header**: Logo (links to index.html), site title, and navigation
- **Main Content**: Page-specific content
- **Footer**: Three-column layout with company name, contact info, and legal/informational links

### Key Pages

- `index.html` - Homepage with hero section and 4 service cards
- Service pages: `desinfection.html`, `desinsectisation.html`, `deratisation.html`, `traitement-tir.html`
- `contact.html` - Contact information page
- Legal pages: `mentions-legales.html`, `politique-confidentialite.html`, `qui-sommes-nous.html`, `faq.html`

## Development

### Running Locally

Since this is a static site, simply open any HTML file in a browser. For a proper local server:

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Then navigate to `http://localhost:8000`

### Deployment

The site is designed for GitHub Pages deployment:

1. Enable GitHub Pages in repository settings
2. Select "Deploy from a branch"
3. Choose branch `main` and folder `/root`

No build step is required.

## Styling Conventions

### Color Schemes

**Version 1 (Classic)**
- Primary text: `#111111`
- Background: `#f9f9f9`
- White sections: `#ffffff`
- Accent/hover: `#636363`

**Version 2 (Modern)**
- Primary text: `#1a1a2e`
- Background: Linear gradient `#f5f7fa` to `#e9ecef`
- White sections: `#ffffff`
- Primary gradient: `#667eea` to `#764ba2` (purple/blue)
- Secondary text: `#4a5568`
- Accent: `#ffd700` (gold)

### Typography
- Headings: `Inter` font family
- Body text: `Jost` font family
- Base font size: `1.2rem`
- Line height: `1.55`

### Layout Patterns
- Container max-width: `1000px` (content), `1280px` (header/services)
- Services grid: 4 columns desktop → 2 columns tablet → 1 column mobile
- Footer grid: 30% / 45% / 20% on desktop, stacks on mobile
- Responsive breakpoints: 900px, 768px, 600px, 480px

## JavaScript Functionality

The `script.js` file provides:
- Smooth scrolling for anchor links
- Service card hover interactions
- Scroll-based animations using Intersection Observer
- Image error handling
- Lazy loading support for images with `data-src` attribute

## Working with This Codebase

### Working with Multiple Versions

When making content changes that should appear in both versions:
1. Update the HTML file in **both** `v1/` and `v2/` directories
2. Keep HTML structure identical between versions - only CSS differs
3. Image paths use `images/` since files are in subdirectories

When updating styles:
1. **v1 changes**: Edit `v1/styles.css` (classic design)
2. **v2 changes**: Edit `v2/styles.css` (modern design)
3. Maintain the same CSS class names and HTML structure across both versions

### Adding New Pages

1. Copy an existing HTML file as a template from the appropriate version folder
2. Update the `<title>` tag
3. Modify the page header and main content
4. Ensure header navigation links back appropriately (usually to index.html)
5. Footer is consistent across all pages - copy as-is
6. **Important**: If adding to one version, add to the other version as well to maintain parity

### Modifying Services

Service cards appear on the homepage in a 4-column grid. Each card:
- Links to a dedicated service page
- Has an image in `images/` directory
- Shows image hover effect (scale + card lift)
- Requires both card and dedicated page to be updated

### Editing Styles

All styles are in `styles.css`. Key sections:
- Header and navigation (lines 28-106)
- Hero section (lines 108-127)
- Services grid and cards (lines 138-231)
- Service detail pages (lines 345-395)
- Contact page (lines 407-545)
- Footer (lines 547-617)
- Responsive media queries throughout

### Images

Place all images in the `images/` directory. Current images:
- `logo.png` - Header logo
- `logo-footer.png` - Footer logo (if used)
- `centre.png` - Coverage area map
- Service images: `desinfection.jpg`, `Desinfection2.jpg`, `desinsectisation.jpg`, `deratisation.jpg`, `traitement-tir.jpg`

## Important Notes

- **No build process**: Changes to HTML/CSS/JS are immediately reflected
- **No dependencies**: No package.json, no npm/yarn required
- **Git workflow**: Standard git commands for version control
- **Character encoding**: All files use UTF-8 encoding
- **Language**: All content is in French
- **Accessibility**: Uses semantic HTML5 elements

## Data Consistency

Contact information appears in two places and must be kept synchronized:
- Footer of every page (footer-column-2)
- contact.html page content

Current contact details:
- Address: 4 Moulin de Barate – 17800 PONS
- Phone: 06 06 40 07 79
- Email: eprn@hotmail.fr
