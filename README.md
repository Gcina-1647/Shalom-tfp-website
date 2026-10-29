# Shalom TopUp Funeral Policy Website

## Overview

The Shalom TopUp Funeral Policy website is an informational platform designed to present funeral cover products, benefits, policy rules, and contact details. It targets rural communities and financially disadvantaged families, offering affordable funeral policies with clear, accessible information.

---

## Project Evolution

### Initial Project

- **Navigation**: Included links but incorrectly referenced `.html` files as stylesheets.
- **Header**: Featured logo, title, slogan, and search bar.
- **Main Content**: Sections for About, Services, Enquiry, and Contact with placeholder content.
- **Footer**: Basic contact info, email, and office hours.
- **CSS Styling**:
  - Dark header (`rgb(20,20,20)`).
  - Lime green text for navigation and slogans.
  - Box sections with light green backgrounds (`rgba(0,255,0,0.212)`) and subtle shadows.
  - Footer styled with black background and lime text.
  - Buttons styled lime with gray borders.
  - Search bar styled with rounded corners and bright green background.

### Updated Version

- **Navigation**: Corrected to link only to `css/style.css` and properly reference HTML pages (`about.html`, `products.html`, `enquiry.html`, `contact.html`).
- **Header**: Simplified, with logo and mission statement.
- **Main Content**:
  - Introduction updated with real policy rules (waiting periods, entry age, claims process).
  - Boxes for About, Products, Policy Rules, and Contact now preview brochure content.
- **Footer**:
  - Split into left (branding/info) and right (social links).
  - Added Google Maps embeds for Mthatha and Cape Town offices.
  - Updated copyright.
- **CSS Styling**:
  - Mobile-first responsive design.
  - Navbar: green background (`#018749`), white text, hover effect to light green.
  - Header: dark green (`#0f4d0f`), centered text, responsive logo sizing.
  - Boxes: emerald green (`#29ab87`), rounded corners, shadows, hover/focus lift effect.
  - Footer: green background, flex layout, social links with hover transitions.
  - Maps section: responsive grid layout for office embeds.
  - External pages (About, Products, Enquiry, Contact) styled with consistent headers, footers, and form elements.

---

## Project Structure

project-root/
│── index.html # Home page
│── about.html # About page
│── products.html # Products page (premium tables)
│── enquiry.html # Enquiry page (membership rules)
│── contact.html # Contact page (addresses, maps)
│── css/
│ ├── style.css # Shared base styles (updated version)
│── images/ # Logo and supporting images
│── README.md # Documentation

---

## Color Scheme

### Initial Project Palette

- **Header Background**: `rgb(20,20,20)` (dark gray/black).
- **Text & Buttons**: `lime`.
- **Box Backgrounds**: `rgba(0,255,0,0.212)` (soft green).
- **Box Shadows**: `rgba(0,128,0,0.411)`.
- **Footer Background**: `black`, lime text.

### Updated Version Palette

- **Body Background**: `#ccffcc` (soft pastel green).
- **Navbar**: `#018749` (green), white text, hover `lightgreen`.
- **Header**: `#0f4d0f` (dark green), white text.
- **Boxes**: `#29ab87` (emerald green), hover `#33c295`.
- **Buttons**: `#008000` (green), hover `#0f4d0f`.
- **Footer**: `#018749` (green), white text, hover `lightgreen`.

---

## Content Integration (from brochure)

### Policy Highlights

- **Waiting Periods**:
  - 6 months for new entrants
  - None for accidental death (if premium paid)
  - 12 months for suicide
- **Entry Age**: 18–84 years
- **Premiums**: Payable monthly in advance
- **Claims**: Processed via Shalom or SAS assistance

### Products

- Cover options: Single, Single + Children, Family, Extended Member, Member + 5/9/13
- Premiums vary by age and cover amount (R25–R800)
- Benefits include body collection, coffin, funeral programs, tent decoration, audio setup, grave site services, obituary options

### Enquiry

- Membership valid after 6 months
- Policy lapses if unpaid for 3 months
- Family cover includes parents + up to 6 children under 21
- Member + children cover includes member + up to 6 children under 21

### Contact

- **Mthatha Office**: Sigubudwini / Upper Ncise – Ngcengane Location, Mthatha, 5100
- **Cape Town Office**: Shop 05 Sobukwe, Dunoon 7741 (next to N7)
- **Phone/WhatsApp**: 068 741 3033 / 081 073 8145 / 073 925 6401
- **Office Hours**: 08h00–17h00, Monday–Friday

---

## Features

- Responsive design (mobile-first with grid/flex layouts).
- Interactive navigation with hover effects.
- Focus/hover effects on content boxes.
- Embedded Google Maps for office locations.
- Separate CSS files for page-specific customization.
- Accessibility improvements (semantic HTML, `aria-labels`).

---

## Next Steps

- Populate `products.html` with full premium tables for easy comparison.
- Add enquiry form with validation.
- Enhance footer with social media icons.
- Implement CSS variables for global theming.

---

## Contact

- **Phone/WhatsApp**: [068 741 3033](tel:0687413033), [081 073 8145](tel:0810738145), [073 925 6401](tel:0739256401)
- **Email**: Shalom.tfp@gmail.com
- **Office Hours**: 08h00–17h00, Monday–Friday

---

## Responsiveness on difference screen sizes

- Desktop
  ![alt text](<src/images/Screen size (Desktop).png>)

- Tablet
  ![alt text](<src/images/Screen size (Tablet 1).png>)
  ![alt text](<src/images/Screen size (Tablet 2).png>)

- Mobile
  ![alt text](<src/images/Screen size (Mobile 1).png>)
  ![alt text](<src/images/Screen size (Mobile 2).png>)
  ![alt text](<src/images/Screen size (Mobile 3).png>)
