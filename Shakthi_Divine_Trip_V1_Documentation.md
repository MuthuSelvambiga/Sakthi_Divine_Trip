# Project Documentation — V1
## Shakthi Divine Trip — Website (Simple Version)

> **Note:** Built on the assumption this is a spiritual/pilgrimage tour business (temple circuits, devotional travel packages), based on the business name. Confirm with the client and adjust Section 1 if the actual services differ.

---

## 1. Project Overview

**Business:** Shakthi Divine Trip
**Type (assumed):** Pilgrimage / spiritual tour operator — temple circuits, devotional travel packages
**Goal of V1:** A simple, professional website that showcases tour packages and lets visitors send inquiries. No booking or payment system in V1.

---

## 2. Tech Stack

| Layer | Technology |
|---|---|
| Backend | .NET (Web API) |
| Frontend | React |
| Database | SQL Server / PostgreSQL (pick one — simplest to set up first) |
| Hosting (suggested for V1) | Any basic shared hosting or Azure/AWS free tier |

---

## 3. Sitemap (V1 — kept minimal)

1. **Home** — hero banner, intro, featured tours, call-to-action
2. **Tours** — list of all tour packages
3. **Tour Detail** — single tour: description, images, itinerary, price, "Enquire Now" button
4. **About** — story of the business / founder
5. **Contact** — enquiry form + phone/email/location

*(5 pages total — deliberately simple for V1)*

---

## 4. Features Included in V1

- Responsive design (mobile + desktop)
- Tour listing with images and short description
- Tour detail page per package
- **Enquiry form** — visitor fills name, tour interested in, message → generates a pre-filled WhatsApp message and opens WhatsApp for the visitor to send (via `wa.me` link, no API cost). Email as a secondary/backup channel — form also emails the same details to the business inbox.
- **Admin panel** — client-controlled. She logs in and can add/edit/remove tours, update prices, and upload images herself, without needing you to touch the code after handover.
- Contact page with location/map embed, plus a direct "Chat on WhatsApp" button in the header/footer

---

## 5. Explicitly Out of Scope for V1

- Online payments / booking system
- User login accounts for customers (only the client/admin gets a login — not public visitors)
- Multi-language support
- Reviews/testimonials system (can add in V2 if simple)
- **Automated WhatsApp Business API integration** (auto-sending enquiries to her number without visitor action) — V1 uses the simpler `wa.me` click-to-chat approach instead; the full API integration needs Meta Business approval and a paid provider, so it's a good V2 upgrade once the business is validated

---

## 6. Assumptions to Confirm With Client

- [ ] Exact nature of tours offered (confirm devotional/pilgrimage assumption)
- [ ] Number of packages to list at launch
- [x] Admin panel — confirmed: client-controlled (she manages tours herself)
- [x] Enquiry routing — confirmed: WhatsApp is top priority, email as backup
- [ ] Her WhatsApp business number to hard-code into the `wa.me` link
- [ ] Existing branding: logo, colors, photos available or need placeholders
- [ ] Domain/hosting — does she have these already

---

## 7. Simple Timeline (V1 only, no payment gateway)

| Stage | Duration |
|---|---|
| Requirements confirmed + wireframe approved | 1 week |
| Backend setup (tours, enquiry API, admin auth) | 2–3 weeks |
| Frontend build (public pages + admin panel UI) | 3–4 weeks |
| WhatsApp/email enquiry flow + testing | 1 week |
| Content upload + handover | 1 week |

**Total: ~9–10 weeks** for this V1 (admin panel adds some time back, since she needs a working login + tour management UI, not just static content).

---

## 8. Next Steps

1. Confirm the assumptions in Section 6 with the client
2. Finalize sitemap (Section 3) — add/remove pages if needed
3. Approve wireframe layout before development starts
