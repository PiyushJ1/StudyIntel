// src/routes/index.ts
import { Router } from "express";
import waitlistRoutes from "./waitlistRoutes.js";
import signupUserRoute from "./signupUserRoute.js";
import signinRoute from "./signinRoute.js";
import startSession from "./startSessionRoute.js";
import finishSession from "./finishSessionRoute.js";
import newCourses from "./newCourses.js";
import userInfo from "./userInfo.js";
import courseTopics from "./courseTopics.js";
import courseTopicsStorage from "./courseTopicsStorage.js";
import pastSessions from "./pastSessions.js";

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
  "/past-sessions": pastSessions // get all past study sessions
};

// create object to array of [key, value] pairs
Object.entries(routes).forEach(([path, route]) => {
  router.use(path, route);
});

export default router;
