# StudyIntel &mdash; a study analytics platform 

<img src="./frontend/public/assets/StudyIntel.png" alt="StudyIntel Logo" width="150" />

![Next.js](https://img.shields.io/badge/Next.js-000000?logo=next.js&logoColor=white) 
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white) 
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white) 
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white) 
![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white) 
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?logo=postgresql&logoColor=white) 
![Prisma](https://img.shields.io/badge/Prisma-0C344B?logo=prisma&logoColor=white)  
![Jest](https://img.shields.io/badge/Jest-C21325?logo=jest&logoColor=white) 


### https://studyintel.app

StudyIntel helps students track study sessions, visualise habits, and receive personalised insights based on their data. The platform combines real-time session tracking with analytics to help UNSW students visualise, gain deeper insights and understand how their study time is spent.

## The Problem

Students often lack visibility into their study habits. They spend hours studying but unsure if it was effective, struggle to balance multiple courses, or fail to contextualise their efforts. Traditional time-tracking tools provide raw data but no actionable insights.

StudyIntel solves this by turning study session data into meaningful analytics: streak tracking, course balance analysis, session recommendations, and AI-powered topic retrieval; all in a clean and intuitive dashboard.


## Features
- Study Session Tracking
- Analytics Dashboard and Insights
- Course Management
- AI-led weekly topic fetching
- JWT Authentication
- Waitlist

## Screenshots

### Landing Page
![Landing](./frontend/public/assets/landing.png)

### Dashboard
![Dashboard](./frontend/public/assets/dashboard.png)

### Stopwatch
![Stopwatch](./frontend/public/assets/stopwatch.png)

### Courses Page
![Course](./frontend/public/assets/courses1.png)
![Course](./frontend/public/assets/courses2.png)

### Insights Page
![Insights](./frontend/public/assets/insights.png)

### Profile Page
![Profile](./frontend/public/assets/profile.png)

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Frontend** | Next.js 16, TypeScript, Tailwind CSS, Recharts, Framer Motion |
| **Backend** | Node.js, Express, TypeScript |
| **Database** | PostgreSQL, Prisma ORM |
| **Caching** | Redis |
| **AI** | Perplexity AI API |
| **Auth** | JWT, bcrypt |
| **Testing** | Jest, Supertest, jest-mock-extended |
| **Deployment** | Vercel (frontend), Railway (backend), Docker |


## Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│   Next.js App   │────▶│   Express API   │────▶│    PostgreSQL   │
│   (Frontend)    │     │    (Backend)    │     │    (Database)   │
│                 │     │                 │     │                 │
└─────────────────┘     └───┬───────────┬─┘     └─────────────────┘
                            │           │
                            ▼           ▼
              ┌─────────────────┐  ┌─────────────────┐
              │      Redis      │  │     Resend      │
              │ (Rate Limiting) │  │    (Emails)     │
              └─────────────────┘  └─────────────────┘ 
```
## Deployment

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/PiyushJ1/StudyIntel.git
   ```

2. **Start the backend**
   ```bash
   cd backend
   npm install
   npx prisma migrate dev # run db migration
   npx prisma generate # generate prisma client
   npm run dev
   ```

3. **Start the frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Access the app**
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:4000`

*Check the backend server health on `http://localhost:4000/health`*


## Testing

### Run Tests

```bash
cd backend
npm test              # run test suites
npm run test:coverage # get coverage report
```

### Test Structure

```
src/__tests__/
├── routes/           # API endpoint tests
│   ├── signin.test.ts
│   ├── signup.test.ts
│   ├── startSession.test.ts
│   └── ...
├── utils/            # utility function tests
├── mocks/            # reusable mock data
│   └── prisma.mock.ts
└── setup.ts          # test config
```

## CI/CD Pipeline

StudyIntel uses GitHub Actions to run the CI/CD pipeline for the frontend and backend. The workflow runs on:  
- `git push` or PRs to the `main` branch
- Manual trigger (`workflow_dispatch`)  

### Jobs
- Checkout & Node.js setup (v22)  
- Install dependencies (`npm install`)  
- Linting & formatting (ESLint, Prettier) 
- TypeScript check (`tsc --noEmit`)  
- Security audit (`npm audit --audit-level=moderate`)
- Run tests (Jest + Supertest)  

The code is then deployed on Vercel and Railway if all jobs are successful.

## License

MIT License. See [LICENSE.md](./LICENSE.md) for details.
