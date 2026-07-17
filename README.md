# Editkaro.in

A responsive website for **Editkaro.in**, a social media marketing and video editing agency — built with vanilla HTML, CSS, and JavaScript.

🔗 **Live site:**  http://127.0.0.1:5500/index.html#top

# Structure 
<p align="center">
  <img src="photos/pic.png" width="500">
</p>

# Outcomes

## Hover-Based Detection

<p align="center">
  <img src="photos/pic1.png" width="45%">
  <img src="photos/pic2.png" width="45%">
  <img src="photos/pic3.png" width="90%">
</p>

## After-Click Analysis

<p align="center">
  <img src="photos/pic4.png" width="45%">
  <img src="photos/pic5.png" width="45%">
</p>

## Features

- **Home** — Hero intro, scrolling category marquee, stats, and an email subscribe form
- **Portfolio** — Filterable video grid across 9 categories (Short-Form, Long-Form, Gaming, Football, eCommerce, Documentary, Color Grading, Anime, Ads) with a lightbox video preview
- **About** — Agency process/workflow, mission & vision, and team
- **Contact** — Full contact form (name, email, phone, category, message)
- Fully responsive (mobile, tablet, desktop)
- Subscribe and contact forms write directly to a Google Sheet via a Google Apps Script backend — no server required

## Tech Stack

- HTML5, CSS3 (custom properties, no framework)
- Vanilla JavaScript (no build step)
- Google Apps Script — serverless form backend
- Google Fonts (Anton, Work Sans, JetBrains Mono)

## Project Structure

```
├── index.html              # Markup for all sections
├── style.css                # All styling
├── script.js                 # Portfolio filtering, lightbox, forms, nav, scroll effects
├── google-apps-script.gs     # Backend script for Google Sheets (deploy via Apps Script)
└── README.md
```

## Setup

1. Clone the repo:
   ```bash
   git clone https://github.com/YOUR_USERNAME/editkaro-website.git
   ```
2. Open `index.html` in a browser — no build tools needed.

### Connecting the forms to Google Sheets
1. Create a Google Sheet.
2. Open **Extensions → Apps Script**, paste in `google-apps-script.gs`.
3. **Deploy → New deployment → Web app** (Execute as: Me, Access: Anyone).
4. Copy the deployment URL and paste it into `SCRIPT_URL` at the top of `script.js`.

 
 
