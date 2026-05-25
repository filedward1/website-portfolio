# 💻 Fil Edward Buitizon's Developer Portfolio

A premium, interactive, and high-performance developer portfolio website designed to look and feel like an **Integrated Development Environment (IDE) / Code Editor (VS Code lookalike)**.

The site is built with **modern Vanilla JavaScript, HTML5, and custom CSS** (utilizing Tailwind CSS v4 styling rules), featuring fluid fade transitions, a light/dark theme switch, responsive navigation, custom cursors, and an interactive Git-branching history log.

---

## 🎨 Design & Aesthetic Highlights

- **IDE Look & Feel**: Mimics a code editor interface complete with window controls (macOS style close/minimize/expand dots), active file tabs (with corresponding filetype icons), git branch markers, sidebar options, and a terminal output mockup.
- **Vibrant & Tailored Palette**: Curated dark and light themes that mimic popular editor schemes (VS Code Default Dark and Light). Includes syntax-highlighted HTML layout for sections.
- **Interactive Git-Branch Selector**: Under the `history.log` tab, visitors can switch branches (`Experience`, `Achievements`, `Certifications`) dynamically, showing a custom git log timeline with commit hashes, commit messages, dates, authors, and connecting branch lines.
- **Smooth Animations**: Seamless page loading with fade transitions, glowing commit timeline nodes, and a custom mobile pointer ripple.
- **Custom Cursor Pack**: Embedded small-sized `Bibata Modern Ice` cursor assets that dynamically adapt to pointer elements (regular pointer, link hand, text I-beam, and resizers).
- **Responsive Layout**: Designed for mobile compatibility (collapsible side panel drawer, adjusted layout hierarchies, and stacked grid rows for timeline visualization).

---

## 🛠️ Tech Stack & Integration

- **Core**: Vanilla HTML5, ES Modern JavaScript
- **Styling**: Tailwind CSS v4, custom utility classes, CSS custom variables
- **Bundler & Build Tool**: Vite (configured for TypeScript & asset management)
- **Deployment**: Configured for **Vercel** (`vercel.json` included at root)
- **Third-Party APIs**: Integrates **EmailJS** for direct secure email routing with on-the-fly client validation.

---

## 📂 Project Structure

```
website-portfolio/
├── vercel.json                 # Vercel deployment routing configuration
├── package.json                # Root package configurations (build commands)
├── README.md                   # Repository Documentation (This file)
└── my-project/                 # Main portfolio project code
    ├── package.json            # Project dependencies & script hooks
    ├── vite.config.ts          # Vite build parameters with Vue & Tailwind plugins
    ├── index.html              # Main application index skeleton & tab layout
    ├── scripts.js              # SPA router, theme toggles, contact and branch controllers
    ├── style.css               # Code-syntax theme definitions, layouts, animations, cursors
    ├── public/                 # Static pages for dynamic injection
    │   ├── about.html          # About section with code presentation markup
    │   ├── projects.html       # Featured project showcase (NutriXtract, Auscura, Reeco, etc.)
    │   ├── history.html        # Experience timeline (Git log styled)
    │   ├── achievements.html   # Achievements timeline (Git log styled)
    │   ├── certifications.html # Courses & Certifications timeline (Git log styled)
    │   ├── contact.html        # Fully validated contact page form
    │   └── cursors/            # Bibata Modern Ice cursor asset packages
    └── src/
        └── assets/             # PDF documents, certificates, and logos
```

---

## 🎓 About the Portfolio Owner

The portfolio presents the profile of **Fil Edward F. Buitizon**, a Computer Science student at the **University of the East - Manila** (graduating June 2026).
Notable highlights showcased:

- **NutriXtract**: Led development of an AI-driven React Native + FastAPI + Supabase thesis project to extract and interpret nutritional facts with YOLO. Presented the paper at **IEEE AAIML 2026 in Tokyo, Japan** and got selected for **HCI International 2025 in Sweden**.
- **Auscura**: IoT bioacoustic poultry health monitor startup project (Top 20 Finalist in DisruptorX).
- **Reeco**: Circular economy swapping mobile platform (Blue Hacks 2026).
- **ClarfiAI**: LLM quiz generator, winning Grand Champion at Codesprint Hackafest 2025.
- **Professional Experience**: Internships and freelance marketing roles, demonstrating flexibility in development, event management, and graphic design.

---

## 🚀 Running Locally

Follow these steps to spin up the local development environment:

### Prerequisites

Make sure you have **Node.js** (v18+) and **npm** installed on your system.

### Steps

1. **Clone the repository**:

   ```bash
   git clone https://github.com/filedward1/website-portfolio.git
   cd website-portfolio
   ```

2. **Install dependencies**:
   Run the installation command at the workspace root (which will trigger a post-install to setup `my-project`):

   ```bash
   npm install
   ```

3. **Run the local dev server**:
   Navigate into `my-project` and run Vite:

   ```bash
   cd my-project
   npm run dev
   ```

4. **Build for production**:
   To compile and minify static assets:
   ```bash
   npm run build
   ```

---

## 🌐 Deployment

The site is configured to build and deploy automatically on **Vercel** using the root `vercel.json` and `package.json` specifications:

- **Build Command**: `cd my-project && npm run build`
- **Output Directory**: `my-project/dist` (Vite's default output)
- **Deployment URL**: [filedward.me](https://filedward.me); for vercel domain: [filedwardb.vercel.app](https://filedwardb.vercel.app/)
