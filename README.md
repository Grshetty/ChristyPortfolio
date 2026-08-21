# Christina Bhoir — HR Portfolio (Dark Editorial + AI Assistant)

A premium, dark-themed, editorial-style HR portfolio built with **HTML5, CSS3, Bootstrap 5, and vanilla JavaScript**, featuring a built-in **AI Portfolio Assistant**. All content is sourced strictly from Christina Bhoir's resume.

Visual direction is inspired by a reference portfolio's dark, numbered-section, editorial layout — reinterpreted here as an original HR-focused design (green accent, HR-specific config panel, recruitment-flavored copy and structure).

## 🚀 How to Run

No build step, no installs required.

1. Unzip the `hr-portfolio` folder.
2. Open `index.html` in any browser.

Bootstrap, Bootstrap Icons, and Google Fonts load from CDN; everything else runs locally.

## 📁 Project Structure

```
hr-portfolio/
├── index.html                  → Main HTML document
├── style.css                   → CSS stylesheet (dark theme, animations, chat UI)
├── script.js                   → Navigation, scroll events, reveal animations
├── ai-assistant.js             → AI Assistant candidate knowledge base & logic
├── christy formal pic.JPG.jpeg → Profile photo
├── resume.pdf                  → Downloadable resume
└── README.md
```

## 🎨 Design System

| Token | Value |
|---|---|
| Background | `#080808` |
| Secondary Background | `#111111` |
| Card | `#151515` |
| Primary Text | `#F5F5F5` |
| Secondary Text | `#A1A1AA` |
| Accent Green | `#7CFF6B` |
| Border | `rgba(255,255,255,0.10)` |

Fonts: **Space Grotesk** (display/headings), **Inter** (body), **JetBrains Mono** (labels, section numbers, config panel).

## 📄 Sections

Numbered per the nav (`01–06`): About, Skills, Experience, Education, Certifications, Contact — plus unnumbered supporting sections (HR Initiatives, Professional Strengths, HR Philosophy) echoing the reference site's mix of numbered and unlabeled blocks.

> The resume didn't list a distinct "Achievements/Awards" section, so instead of inventing one, the real, resume-backed **HR Initiatives** section (Capstone dashboard, research paper, startup plan) is shown in its place.

## 🤖 AI Portfolio Assistant

- **Floating button** (bottom-right, pulsing) opens a dark chat panel titled *"Christina's AI Assistant"* with an **● Online** status.
- **Suggested questions** appear as quick-tap chips on open.
- **Demo Mode (default):** `js/ai-assistant.js` includes a `candidateData` object built entirely from the resume, plus a rule-based `getDemoResponse()` function — so the assistant works immediately with **no API key or backend**.
- **Live API Mode (optional):** Set `AI_CONFIG.endpoint` in `js/ai-assistant.js` to your own backend/serverless endpoint. The frontend will POST `{ system, context, question }` and expects `{ reply }` back.

### ⚠️ Security note

```js
const AI_CONFIG = {
  endpoint: "", // point this at YOUR backend, not an AI provider directly
  apiKey: ""    // never put a real provider key in frontend code
};
```

Never place a real OpenAI/Anthropic/etc. secret key in `index.html`, `script.js`, or `ai-assistant.js`. For production, the frontend should call a backend/serverless endpoint you control, which then calls the AI provider server-side:

```
Frontend → Backend / Serverless API → AI API
```

Until that backend exists, the assistant automatically falls back to Demo Mode — it will never invent information; unknown questions get:
*"I don't have that information in the candidate's profile."*

## ✉️ Connecting the Contact Form

The form validates and shows a success state client-side. To send real emails, open `js/script.js`, find the commented block inside the `submit` handler, and point it at [Formspree](https://formspree.io/) or [EmailJS](https://www.emailjs.com/).

## 📱 Responsive Behavior

Mobile-first with Bootstrap's grid and custom breakpoints. On mobile, the AI panel becomes near full-screen (`100% × 85vh`) with rounded top corners and a fixed input bar, per the design brief.

## ♿ Accessibility

- Semantic HTML5 (`header`, `nav`, `main`, `section`, `footer`)
- `aria-label` / `aria-hidden` on the AI panel and icon-only buttons
- Visible focus states on form and chat inputs
- `prefers-reduced-motion` respected throughout

## 🖼️ Adding a Profile Photo Later

Drop a photo into `assets/images/` (e.g. `profile.jpg`), then in `index.html` replace `.profile-initials` inside `.profile-frame-inner` with:

```html
<img src="assets/images/profile.jpg" alt="Christina Bhoir" class="w-100 h-100" style="object-fit:cover;">
```

---
© 2026 Christina Bhoir. All Rights Reserved.
