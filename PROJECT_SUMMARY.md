# JusticeAI v2.0: Executive Project Summary

**JusticeAI** is a comprehensive, production-ready legal toolkit designed to democratize access to Indian Law. It equips everyday citizens with powerful AI-driven consultation, localized document generation, and structured legal workflows, fundamentally serving as a "Digital Legal Co-pilot."

---

## 🚀 Core Platform Features

1. **AI Legal Co-pilot (Multi-Mode Chat)**
   - Powered by a completely private, localized **Gemma 4** model via Ollama.
   - Features dual modes: **"Legal Co-pilot"** (strategic and empathetic guidance) and **"Opposing Counsel Simulator"** (adversarial moot-court practice).
   - Grounded in factual law using a custom-built **RAG (Retrieval-Augmented Generation)** database to prevent AI hallucinations.

2. **Personal Dashboard**
   - A central legal command center with time-aware greetings and animated usage statistics.
   - Quick-action grid for instant access to all 10+ platform tools.
   - Recent case activity feed from persistent localStorage.
   - Daily legal tips to keep users informed.

3. **Case Tracker & Management Workflow**
   - An interactive, timeline-based tool that allows users to manage their legal journeys.
   - Users can create cases, monitor active status, and track historical milestones. All data is successfully managed and persisted in local storage.

4. **Intelligent Lawyer Directory**
   - A highly functional search interface to connect with legal professionals across India.
   - Features robust filtering by Specialization (Criminal, Family, Corporate), City, and Tier (Experience levels).

5. **Dynamic Document Generator**
   - Allows users to instantly generate localized, legally compliant templates (such as Affidavits, NDAs, and Demands).
   - Integrated with multi-step forms and live PDF-style preview capabilities.

6. **Legal Glossary (NEW in v2.0)**
   - A searchable dictionary of 35+ essential Indian legal terms (Affidavit to Zero FIR).
   - Alphabetical quick-jump navigation with category filtering (Constitutional, Criminal, Civil, Corporate, Procedural).
   - Each term includes legal references, definitions, and cross-linked related terms.

7. **Gamified Legal Education (Legal Quiz)**
   - A fully functional 12-question interactive quiz centered on the Indian Penal Code and the new criminal laws.
   - Uses Framer Motion for premium animations, tracks user score, provides detailed post-answer explanations, and awards a "Legal Grade" designation.

8. **Legal Cost Estimator**
   - A specialized multi-factor calculation engine that estimates potential legal fees based on case complexity, property values, and geographical scope.

9. **Limitation Period Calculator**
   - Calculates filing deadlines for various case types under the Limitation Act, 1963.

10. **Legal Aid Eligibility Checker**
    - Determines if a user qualifies for free legal aid under NALSA guidelines.

---

## 🧠 Machine Learning & Backend Architecture

The application has been heavily modernized to rely purely on offline, localized Machine Learning, ensuring absolute privacy for sensitive legal tasks.

* **Vector Memory / RAG Integration:** The platform operates a custom Node.js/Express backend (`server.js`) that automatically ingests official law PDFs (like the BNS and Constitution), slices the texts, and generates high-density vectors. When a user asks a question, it fetches exact legal precedents via Cosine-Similarity and feeds them into the conversation.
* **Unsloth Fine-Tuning Capability:** The project contains a native `cook.py` SFT pipeline. Utilizing Unsloth, it allows developers to fine-tune Llama 3 / Gemma directly on local GPU hardware via LoRA adapters, outputting customized `.gguf` weights ready for Ollama.

---

## 🛠 Technology Stack

* **Frontend Framework:** React 18 / Vite (with lazy-loaded routes via `React.lazy` + `Suspense` for optimal code-splitting)
* **Styling & UI:** Tailwind CSS, Framer Motion (for dynamic, premium micro-animations), Lucide React (for iconography)
* **Backend Layer:** Node.js, Express, LangChain (for RAG embedding routing), `pdf-parse`
* **Local AI Runtime:** Ollama (serving the local `gemma4` language model and `nomic-embed-text` embedding engine).
* **Data Management:** Hybrid architecture using dynamic state handling, `localStorage` for user schemas, and in-memory Vector arrays.

---

## 🎨 Design Philosophy
JusticeAI utilizes highly curated, harmonious color palettes, sophisticated dark modes, modern typography (Playfair Display / DM Sans / IBM Plex Mono), and subtle glassmorphism effects to convey **"Legal Gravitas"**—ensuring the application feels incredibly premium and trustworthy at first glance.

---

## 🆕 v2.0 Upgrade Changelog

- **Dashboard Page** — Personal legal command center with animated counters and quick actions
- **Legal Glossary** — Searchable dictionary of 35+ legal terms with alphabetical navigation
- **404 Not Found Page** — Premium error page with legal-themed messaging
- **Scroll-to-Top** — Floating button + auto-scroll on route change
- **Lazy Loading** — All 15 routes now code-split via React.lazy for faster initial load
- **How It Works Section** — 3-step visual flow on Landing Page
- **Enhanced SEO** — Open Graph tags, meta descriptions, Twitter Card, theme-color
- **Accessibility** — Focus-visible ring, ARIA labels on interactive elements
- **New CSS Utilities** — pulse-gold, float, shimmer animations + focus ring
- **Updated Navigation** — All new pages added to Header, MobileNav, Footer, and CommandPalette (⌘K)
