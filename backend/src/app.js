import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

const allowedOrigins = [
  process.env.ORIGIN,
  "http://localhost:3000",
  "http://localhost:3001",
].filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (
        !origin ||
        allowedOrigins.includes(origin) ||
        /^http:\/\/localhost:\d+$/.test(origin)
      ) {
        callback(null, true);
        return;
      }

      callback(new Error(`CORS blocked origin: ${origin}`));
    },
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

import userRouter from "./routes/user.routes.js";
app.use("/api/v1/auth", userRouter);

import problemRouter from "./routes/problem.routes.js";
app.use("/api/v1/problem", problemRouter);

import submissionRouter from "./routes/submission.routes.js";
app.use("/api/v1/submission", submissionRouter);

import leaderboardRouter from "./routes/leaderboard.routes.js";
app.use("/api/v1/leaderboard", leaderboardRouter);

import contestRouter from "./routes/contest.routes.js";
app.use("/api/v1/contest", contestRouter);

app.use((err, req, res, next) => {
  const statusCode = err?.statuscode || err?.statusCode || 500;

  return res.status(statusCode).json({
    statusCode,
    data: null,
    message: err?.message || "Internal Server Error",
    errors: err?.errors || [],
    success: false,
  });
});

export { app };
