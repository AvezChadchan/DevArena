import { Router } from "express";

import {
  submitCode,
  getUserSubmissions,
  getProblemSubmissions,
} from "../controllers/submission.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/submit-code").post(verifyJWT, submitCode);

router.route("/get-user-submissions").get(verifyJWT, getUserSubmissions);

router.route("/get-problem-submissions/:id").get(verifyJWT,getProblemSubmissions);

export default router;
