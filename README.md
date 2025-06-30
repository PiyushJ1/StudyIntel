# StudyIntel

**StudyIntel** is an AI-powered SaaS that helps students stop wasting time and start studying smarter. With personalized insights and progress visualizations, it reveals what's working, and what's not—so they can focus, improve, and achieve more.
                        
## 🎯 Key Features

- **AI-powered study analytics:** Track and visualizes study sessions by subject, method, and time to uncover actionable learning patterns.  
- **Personalized optimization insights:** Provides tailored, data-driven suggestions to improve focus, balance workload, and achieve flow state.  
- **Beautiful, intuitive dashboards:** View progress and trends instantly with clear graphs and student-focused insights.

## 🛠️ Tech Stack

- **TypeScript** for robust, type-safe development  
- **Express** for backend API services  
- **Next.js** (App Router) for frontend and server-side rendering  
- **PostgreSQL** for reliable data storage and querying  

---

*Project development is ongoing. This README will be updated as new features and improvements are added.*


# MVP Plan: StudyIntel

---

## 1. Goal for MVP
Build a **basic, usable product** that enables students to log study sessions and view visual progress dashboards, **deferring AI-powered insights for later phases**.

---

## 2. Core MVP Features

### a. User Authentication
- Email/password sign up, login, and logout  
- Use secure auth methods (consider NextAuth.js with credentials provider or similar)

### b. Study Session Tracker
- UI to start/stop study timers or manually add sessions  
- Store session data with attributes: date, duration, subject, and study method (e.g., reading, practice)  

### c. Dashboard & Visualizations
- List of recent study sessions  
- Interactive charts showing study time by day/week and by subject  
- Basic progress summaries (total hours, longest sessions, consistency streaks)

### d. Profile Management
- User can update profile info (name, email)  
- Optional: preferences like default study method or notification settings

---

## 3. Tech Stack

- **Frontend:** Next.js (App Router) with TypeScript  
- **Backend:** Express.js API with TypeScript  
- **Database:** PostgreSQL for session and user data  
- **Authentication:** NextAuth.js or custom JWT-based auth  
- **Charts:** React-based chart library (e.g., Recharts or Chart.js)

---

## 4. MVP Development Phases & Timeframes

| Phase                               | Description                                                  | Timeframe           |
|-----------------------------------|--------------------------------------------------------------|---------------------|
| **Phase 1: Setup & Authentication**     | Setup repo, database schema, implement signup/login/logout       | 3 weeks (part-time)  |
| **Phase 2: Study Session Tracking**      | Create UI for session input & timer, backend storage & APIs       | 4 weeks             |
| **Phase 3: Dashboard & Visualizations**  | Fetch session data, build charts & summary stats on dashboard      | 4 weeks             |
| **Phase 4: Profile Management (Optional)** | Implement profile update UI and backend                              | 1–2 weeks           |
| **Phase 5: Deployment & Polish**          | Deploy full app (Vercel/Heroku), add responsive styling and bug fixes | 1–2 weeks           |

---

## 5. Stretch Goals (Post-MVP / Future)

- AI-powered personalized study optimization insights  
- Notifications & reminders to improve study habits  
- Export study data (CSV, PDF)  
- Social sharing & study group features  
- Mobile support or Progressive Web App (PWA)

---
