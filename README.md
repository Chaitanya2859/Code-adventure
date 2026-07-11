<div align="center">

# 🎮 Code Adventure

### Level up your web dev skills — one quest at a time.

An interactive, gamified platform for learning HTML, CSS, and JavaScript — right in your browser.

🚀 **[Check out the Live App!](https://code-adventure-kohl.vercel.app/)**

[![Next.js](https://img.shields.io/badge/Next.js-14-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://neon.tech/)
[![Razorpay](https://img.shields.io/badge/Razorpay-Payments-02042B?style=for-the-badge&logo=razorpay&logoColor=white)](https://razorpay.com/)

</div>

---

## 📖 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [How the Sandbox Works](#-how-the-sandbox-works)
- [Getting Started](#️-getting-started)
- [Project Structure](#-project-structure)
- [License](#-license)

---

## 🕹️ About

**Code Adventure** turns learning to code into an actual adventure. No boring tutorials — just XP, streaks, badges, and a live in-browser sandbox where every line you write instantly comes to life. Think *retro arcade* meets *modern web dev bootcamp*.

---

## 🚀 Features

| Feature | Description |
|---|---|
| 🧪 **Interactive Code Sandbox** | A custom in-browser editor powered by Monaco Editor, with instant live preview |
| 🏆 **Gamified Learning** | Earn XP, level up, and keep your streak alive as you clear exercises |
| 📚 **Structured Courses** | Bite-sized lessons covering HTML structure, CSS styling, and JS logic |
| 💎 **Premium Tiers** | Advanced courses (like JavaScript) unlock via seamless Razorpay payments |
| 📈 **Progress Tracking** | XP, completed exercises, and enrollments are saved so you never lose your place |
| 👾 **Pixel Art Aesthetics** | Retro gaming-inspired UI — pixel fonts, badges, and GIF avatars |

---

## 🛠 Tech Stack

- **Framework** — [Next.js 14](https://nextjs.org/) (App Router)
- **Language** — TypeScript
- **Styling** — Tailwind CSS
- **Database** — PostgreSQL ([Neon DB](https://neon.tech/))
- **Editor** — [`@monaco-editor/react`](https://github.com/suren-atoyan/monaco-react) for the code sandbox
- **Payments** — Razorpay integration
- **State Management** — React Context & Hooks

---

## 💡 How the Sandbox Works

No third-party iframe services like CodePen or StackBlitz here. Code Adventure compiles HTML, CSS, and JS strings **directly in the browser** and injects them securely into a local `srcdoc` iframe — giving you instant, fully serverless code execution.

```
Your Code  →  Browser Compiler  →  Secure srcdoc iframe  →  Live Preview
```

---

## ⚡️ Getting Started

### Prerequisites

Set up your `.env` file with the following variables:

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | Razorpay public key (payments) |
| `RAZORPAY_SECRET_KEY` | Razorpay secret key (payments) |
| `JWT_SECRET` | User authentication |

### Installation

```bash
npm install
npm run dev
```

Then open **[http://localhost:3000](http://localhost:3000)** in your browser. 🎉

---

## 📂 Project Structure

```
├── app/
│   ├── api/              # Backend endpoints — auth, courses, enrollment, payment verification
│   ├── (routes)/         # Main pages — /dashboard, /courses, /pricing
│   └── components/       # Reusable UI — CodeSandbox, Header, etc.
└── *-exercises.ts        # Static databases for HTML / CSS / JS course content
```

---

## 📄 License

This project is currently unlicensed — add a `LICENSE` file if you plan to open-source it.

<div align="center">

Made with ⚔️ and ☕ for aspiring web developers.

</div>