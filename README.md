# Lysam Turbo & Diesel — Website

Production-ready multi-page HTML website for Lysam Turbo and Diesel Pvt Ltd, Harare, Zimbabwe.

## File structure

```
lysam/
├── index.html          # Homepage
├── services.html       # All services detail page
├── about.html          # About us, team, references
├── contact.html        # Contact + quote form (WhatsApp integration)
├── 404.html            # Custom error page
├── sitemap.xml         # SEO sitemap
├── robots.txt          # Search engine directives
├── css/
│   └── main.css        # Complete stylesheet (design tokens, all components)
├── js/
│   └── main.js         # Nav, mobile menu, reveal animations, form logic
└── images/             # Add your images here (see below)
```

## Images to add

Place these files in the `images/` folder before going live:

| File | Where used | Recommended size |
|------|-----------|-----------------|
| `logo.png` | Schema.org logo reference | 320×107px |
| `og-image.jpg` | Social sharing preview | 1200×630px |
| `hero-workshop.jpg` | Hero section (replace SVG placeholder) | 1200×900px |
| `favicon.ico` | Browser tab icon | 32×32px |
| `favicon-16.png` | Browser tab icon | 16×16px |
| `favicon-32.png` | Browser tab icon | 32×32px |
| `apple-touch-icon.png` | iOS home screen | 180×180px |

## Logo replacement

The logo is currently embedded as a base64 PNG from your uploaded file.
To replace with an external file for smaller page weight:
1. Place your logo file at `images/logo.png`
2. In all HTML files, replace the `<img src="data:image/png;base64,..."` with `<img src="images/logo.png"`

## Deployment (recommended: Netlify)

1. Drag the entire `lysam/` folder to [netlify.com/drop](https://app.netlify.com/drop)
2. Point your custom domain `lysamturbo.co.zw` to Netlify
3. SSL/HTTPS is automatic and free

## Update canonical URLs

Before going live, do a find+replace across all HTML files:
- Replace `https://lysamturbo.co.zw` with your actual domain

## WhatsApp number

All WhatsApp links use `+263773125505`. To change:
- Find `263773125505` across all HTML and JS files and replace

## SEO checklist

- ✅ Unique title + meta description on every page
- ✅ Canonical URLs on every page
- ✅ JSON-LD structured data (LocalBusiness, Service, AboutPage, ContactPage)
- ✅ Open Graph + Twitter Card meta tags
- ✅ Geo meta tags for local SEO
- ✅ Sitemap.xml
- ✅ Robots.txt
- ✅ One H1 per page, keyword-targeted
- ✅ Breadcrumb navigation on inner pages
- ✅ Internal links between all pages
- ✅ Alt text on all images
- ✅ All images have width/height attributes

## Accessibility

- ✅ Skip-to-content link
- ✅ ARIA labels on nav, buttons, forms, regions
- ✅ Focus-visible styles
- ✅ prefers-reduced-motion respected
- ✅ Form error messages use role="alert"
- ✅ Semantic HTML5 (header, nav, main, footer, article, section)
