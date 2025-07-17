# 📚 StudyIntel

**StudyIntel** is an AI-powered SaaS platform I’m building solo as a 2nd-year university student. It helps students stop wasting time and start studying smarter. By tracking study habits and visualizing progress, it reveals what’s working and what’s not, so users can stay focused, improve consistently, and reach their academic goals.

🌐 **Live at:** [https://studyintel.app](https://studyintel.app)

---

## ✨ Key Features (In Progress)

- **📊 Smart Study Analytics**  
  Track sessions by subject, method, and time to uncover useful patterns.

- **🧠 Personalized Optimization Insights** *(Coming Soon)*  
  AI-driven suggestions to improve focus, balance workload, and reach flow state.

- **📈 Intuitive Dashboards**  
  Clean, student-focused visuals for reviewing progress, consistency, and trends.

---

## ⚙️ Tech Stack

<p align="left"><img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" /> <img src="https://img.shields.io/badge/Tailwind_CSS-grey?style=for-the-badge&logo=tailwind-css&logoColor=38B2AC"/> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" /> <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white" /> <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" /> <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" /></p>

---

## 🚀 Development Progress

> ✅ Core infrastructure and auth are live  
> 🛠 Currently building study tracking & dashboard features

### ✅ Completed
- Landing page with waitlist
- Email/password auth (sign-up, login, logout)
- Login/register page UI
- Dashboard navigation bar sections

### 🔄 In Progress
- Study session tracker UI (manual input + timer)
- Backend APIs for session storage
- Basic dashboard with session summaries

### 🔜 Coming Next
- Charts: study time by day/week/subject
- Profile settings page
- MVP polish and responsiveness

---

## 🗺️ MVP Plan

### 🎯 Goal  
Deliver a minimal, usable product that lets students log study sessions and see their progress visually.  
*AI-powered insights and extras come later.*

### 🔑 Core MVP Features
- Email/password authentication  
- Study session tracking (with subject & method)  
- Dashboard with time trends and summaries  
- Optional: user profile/preferences

---

## 🌱 Stretch Goals (Post-MVP)
- AI-generated personalized study recommendations  
- Streak tracking, goals, and reminders  
- Exportable reports (CSV/PDF)  
- Social features or study groups  
- Mobile-friendly design or PWA

---

> This README will be updated as progress is made on the project.

🧱 MVP Feature List (Priority-Ordered)
✅ 1. Session Tracker (Core Input)
Subject / Task

Study method (Pomodoro, reading, problem-solving)

Focus level (1–5 or emoji scale)

Duration

Notes (optional)

🔧 Simple form UI, then save to DB with timestamp

✅ 2. Progress Dashboard (Core Output)
Visuals that give a sense of momentum:

Weekly study hours bar chart

Focus score line graph over time

Calendar heatmap (GitHub-style streak)

Total sessions, hours, avg focus

🔧 Use Chart.js or Recharts — fast and good-looking

✅ 3. Basic Insights (Hardcoded or Light AI)
These don’t need to be AI right away. Start with static rules:

“Your best focus days: Tue, Thu”

“You study Math 2× more than Physics — consider rebalancing?”

“Longest streak: 4 days. Try beating it!”

🔧 Add to dashboard sidebar or a weekly digest email

✅ 4. Streak System (Gamified Motivation)
Daily streak counter

Streak milestones (e.g. “5-day streak!” badge)

Warning if streak breaks soon

🔧 Show this on dashboard and make it visual (emoji fire 🔥 or colored rings)

✅ 5. Profile & Settings
Let users:

Edit name, subjects, preferred methods

Toggle light/dark mode (if you want polish)

View their saved data

✅ 6. Email Weekly Digest (Simple Cron Job or Notion-style)
Summary of hours studied, focus average

Your best study day

Short tip (pre-written, no need for AI now)

🔧 Use something like SendGrid or Resend to schedule digests
