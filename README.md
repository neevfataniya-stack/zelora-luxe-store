# Zelora Jewels — Luxury Editorial E-Commerce Storefront
**Project Name**: `zelora-luxe-store`  
**Branding**: Zelora Jewels (Haute Joaillerie)

Zelora Jewels is a production-grade, editorial luxury jewellery e-commerce storefront crafted for fine jewellery connoisseurs. It unites contemporary aesthetic minimalism with Indian artisanal goldsmithing heritage.

---

## 1. Brand Palette & Typography

- **Ivory Canvas**: `#F5F0E8` (Dominant canvas 60%)
- **Champagne Gold**: `#C5A46D` (Refined metallic detailing 30%)
- **Deep Burgundy**: `#641E32` (Primary high-intent action CTAs 10%)
- **Charcoal**: `#292522` (High-contrast typography)
- **Display Typography**: *Playfair Display* (Editorial serifs)
- **Body Prose**: *Inter* (Clean tabular numerals and high-legibility sans-serif)

---

## 2. Page Architecture (10 Preserved Pages)

| Page # | Page Name | Route Path | Description |
|---|---|---|---|
| **1** | Home | `/#/` | Fashion editorial hero, 5 category tiles with counts, curator's selection, brand ethos, and private client gazette. |
| **2** | Shop All Products | `/#/shop` | Complete 40-piece catalogue with live search, category tabs, price sorting, and Load More pagination. |
| **3** | Categories | `/#/categories` | Editorial showcase across 5 distinct jewellery disciplines with item counters and direct filtered links. |
| **4** | Product Details | `/#/product/:slug` | Contiguous purchase panel, multi-angle gallery, finish/size selectors, care instructions, and related designs. |
| **5** | Shopping Cart | `/#/cart` | Persistent cart (`localStorage`), quantity steppers, free shipping threshold indicator (₹5,000), and breakdown. |
| **6** | Checkout | `/#/checkout` | 2-column customer form with full address validation, tamper-proof seal note, and demo payment method simulator. |
| **7** | Order Confirmation | `/#/confirmation` | Itemized order receipt with `#ZELORA-IND-XXXXX` reference, delivery estimates, and navigation guards. |
| **8** | About & Contact | `/#/about-contact` | Atelier philosophy, validated concierge message form, coordinates, and 5-question FAQ accordion. |
| **9** | Shipping & Returns | `/#/shipping-returns` | Policy page detailing insured courier transit, 7-day inspection window, size exchanges, and damage protocols. |
| **10** | Privacy Policy & Terms | `/#/privacy-terms` | Tabbed legal governance covering data protection (DPDP Act 2023), cookie/pixel disclosure, and terms of sale. |

---

## 3. Product Catalogue Verification (Exactly 40 Unique Pieces)

- **Earrings (10)**: Aurora Pearl Drops, Celestial Starlight Huggies, Kundan Heritage Chandbali, Solitaire Geometric Studs, Florence Filigree Tassel Drops, Emerald Dewdrop Chandeliers, Solis Sculptural Wave, Polki Lotus Bloom Jhumkas, Art Deco Linear Baguette Drops, Ruby Silhouette Halo Studs.
- **Necklaces (8)**: Celestial Solitaire Pendant, Baroque Pearl Statement Collar, Heritage Hasli Collar, Serpentine Liquid Chain, Emerald Cut Solitaire Choker, Meenakari Peacock Medallion, Lumina Layered Double Coin, Astral Pavé Tennis Collar.
- **Bangles & Bracelets (8)**: Royal Filigree Heritage Bangles (Pair), Infinity Pavé Tennis Bracelet, Sculpted Architectural Cuff, Polki Emerald Open Kada, Delicate Pearl Station Bracelet, Geometric Stacked Bangle Trio, Ruby Crystal Hinged Bangle, Chunky Anchor Chain Bracelet.
- **Rings (7)**: Solis Emerald-Cut Cocktail Ring, Aurora Eternity Micro-Pavé Band, Dome Ribbed Croissant Ring, Kundan Peacock Crest Ring, Duet Toi et Moi Gemstone Ring, Solitary Baroque Pearl Ring, Minimalist Tri-Stack Ring Trio.
- **Jewellery Sets (7)**: Padmavati Kundan Bridal Suite, Celestial Solitaire Duet Set, Baroque Pearl Harmony Trio, Royal Emerald Cocktail Gala Suite, Solis Modern Sculptural Wave Set, Polki Heritage Necklace & Kada Set, Astral Pavé Tennis Suite.

---

## 4. Meta Ads Direct Landing Pages

The following dedicated landing URLs are active and directly accessible:
1. **Earrings Campaign**: `/#/products/elegant-earrings` (Aliased to *Aurora Pearl Drop Earrings*)
2. **Pendant Necklace Campaign**: `/#/products/pendant-necklace` (Aliased to *Celestial Solitaire Pendant Necklace*)
3. **Traditional Bangles Campaign**: `/#/products/traditional-bangles` (Aliased to *Royal Filigree Heritage Bangles*)

Also supports canonical paths: `/#/product/aurora-pearl-drop-earrings`, `/#/product/celestial-solitaire-pendant`, `/#/product/royal-filigree-heritage-bangles`.

---

## 5. Meta Pixel Tracking & Purchase Safety

Implemented in `src/utils/metaPixel.ts`:
- **ViewContent**: Fires when a customer visits any product detail or campaign landing page.
- **AddToCart**: Fires when a piece is added to the shopping bag with product ID, value, and currency.
- **InitiateCheckout**: Fires when the customer loads the checkout page with cart contents.
- **Purchase**: Only fires after an order is successfully generated. **Duplicate Purchase Prevention** is enforced using in-memory and order ID tracking to prevent accidental refresh/back-button duplicate purchase reporting.

*Note for Store Owner*: To link your live Facebook Business Pixel in production, supply your Pixel ID via environment variable `VITE_META_PIXEL_ID` or update `META_PIXEL_ID` in `src/utils/metaPixel.ts`.

---

## 6. Netlify Deployment & GitHub Sync Instructions

### Why Netlify Initially Showed "Page not found":
1. **GitHub Repository State**: The connected GitHub repository (`https://github.com/neevfataniya-stack/zelora-luxe-store`) only contained an initial template `README.md` and had not yet been populated with the application source files, components, and assets.
2. **Missing Netlify Build Configuration**: `netlify.toml` was missing at root to instruct Netlify to run `npm run build` and publish the `dist/` folder.
3. **SPA Path Routing**: Direct visits to paths like `/products/elegant-earrings` in a fresh browser tab need both Netlify rewrite rules (`/* /index.html 200`) and React hybrid routing (which is now implemented in `src/App.tsx`).

### Step-by-Step Instructions to Push and Deploy to Netlify:

#### Option A: Syncing via Git (Recommended)
From your terminal on your computer, initialize git and push to your repository:
```bash
git init
git remote add origin https://github.com/neevfataniya-stack/zelora-luxe-store.git
git branch -M main
git add .
git commit -m "feat: complete Zelora Jewels storefront with 10 pages, 40 products, and netlify.toml"
git push -u origin main --force
```

#### Option B: Automatic Netlify Build Trigger
Once pushed, Netlify will detect the commit and automatically read `netlify.toml`:
1. It runs `npm run build`.
2. It publishes `dist/`.
3. It applies `[[redirects]]` from `/*` to `/index.html` with HTTP 200 status.
4. Your site will immediately become live at `https://zelora-luxe-store.netlify.app/`.

#### Option C: Manual Drag-and-Drop Deploy (Instant Alternative)
1. Download or copy the generated `dist/` folder from this project.
2. Go to your Netlify dashboard at [app.netlify.com](https://app.netlify.com).
3. Open your site `zelora-luxe-store` > **Deploys**.
4. Drag and drop the `dist/` folder into the Netlify manual deploy dropzone.
5. Your site goes live instantly without waiting for Git CI!

