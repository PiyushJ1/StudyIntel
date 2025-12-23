// src/routes/index.ts
import { Router } from "express";
import waitlistRoutes from "./waitlistRoutes";
import signupUserRoute from "./signupUserRoute";
import signinRoute from "./signinRoute";
import startSession from "./startSessionRoute";
import finishSession from "./finishSessionRoute";
import newCourses from "./newCourses";
import userInfo from "./userInfo";
import courseTopics from "./courseTopics";
import courseTopicsStorage from "./courseTopicsStorage";

const router = Router();

// object to map path with route
const routes = {
  "/waitlist": waitlistRoutes, // save email to waitlist
  "/signup": signupUserRoute, // signup new user
  "/signin": signinRoute, // authenticate user log in
  "/users": userInfo, // fetch user info
  "/start-session": startSession, // TODO: start new study session
  "/finish-session": finishSession, // TODO: finish and save study session info
  "/new-courses": newCourses, // add the user's courses
  "/scrape-course": courseTopics, // scrape course topics (AI)
  "/course-topics": courseTopicsStorage, // save/fetch user's course topics
};

// create object to array of [key, value] pairs
Object.entries(routes).forEach(([path, route]) => {
  router.use(path, route);
});

export default router;
