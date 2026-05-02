import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { Contest } from "../models/contest.model.js";
import { User } from "../models/user.model.js";
import { Problem } from "../models/problem.model.js";
import mongoose from "mongoose";
import { Submission } from "../models/submissions.model.js";

const levelRules = {
  easy: {
    allowed: new Set(["easy"]),
    message: "Easy contests can only contain easy problems",
  },
  medium: {
    allowed: new Set(["easy", "medium"]),
    message: "Medium contests can only contain easy or medium problems",
  },
  hard: {
    allowed: new Set(["easy", "medium", "hard"]),
    message: "Hard contests can contain problems of any difficulty",
  },
};

const validateContestProblemsForLevel = (problems, level) => {
  const normalizedLevel = String(level || "").toLowerCase();
  const rule = levelRules[normalizedLevel];

  if (!rule) {
    throw new apiError(400, "Contest level must be easy, medium, or hard");
  }

  if (!Array.isArray(problems) || problems.length < 1) {
    throw new apiError(400, "A contest must contain at least 1 problem");
  }

  const invalidProblem = problems.find(
    (problem) => !rule.allowed.has(String(problem?.difficulty || "").toLowerCase())
  );

  if (invalidProblem) {
    throw new apiError(400, rule.message);
  }

  if (
    normalizedLevel === "medium" &&
    !problems.some(
      (problem) => String(problem?.difficulty || "").toLowerCase() === "medium"
    )
  ) {
    throw new apiError(
      400,
      "A medium contest must contain at least one medium problem"
    );
  }

  if (
    normalizedLevel === "hard" &&
    !problems.some(
      (problem) => String(problem?.difficulty || "").toLowerCase() === "hard"
    )
  ) {
    throw new apiError(400, "A hard contest must contain at least one hard problem");
  }
};

const createContest = asyncHandler(async (req, res) => {
  let {
    name,
    description,
    level,
    startTime,
    endTime,
    problems = [],
  } = req.body;

  if (!name || !description || !level || !startTime || !endTime) {
    throw new apiError(
      400,
      "Name, description, level, startTime and endTime are required"
    );
  }

  startTime = new Date(startTime);
  endTime = new Date(endTime);

  if (Number.isNaN(startTime.getTime()) || Number.isNaN(endTime.getTime())) {
    throw new apiError(400, "Start time and end time must be valid dates");
  }

  if (startTime >= endTime) {
    throw new apiError(402, "Start time must be earlier than end time");
  }

  if (!Array.isArray(problems)) {
    throw new apiError(400, "Problems must be an array");
  }

  const uniqueProblemIds = [...new Set(problems.map((problemId) => String(problemId)))];

  const invalidProblemId = uniqueProblemIds.find(
    (problemId) => !mongoose.Types.ObjectId.isValid(problemId)
  );

  if (invalidProblemId) {
    throw new apiError(400, "Problems array contains an invalid problem id");
  }

  const contestProblems = await Problem.find({
    _id: {
      $in: uniqueProblemIds.map((problemId) => new mongoose.Types.ObjectId(problemId)),
    },
  }).select("difficulty");

  if (contestProblems.length !== uniqueProblemIds.length) {
    throw new apiError(400, "One or more selected problems do not exist");
  }

  validateContestProblemsForLevel(contestProblems, level);

  const contest = await Contest.create({
    name: name.toLowerCase(),
    description,
    level: String(level).toLowerCase(),
    startTime,
    endTime,
    problems: uniqueProblemIds,
    createdBy: req.user._id,
  });

  return res
    .status(200)
    .json(new apiResponse(200, contest, "Contest Created Successfully"));
});

const getContests = asyncHandler(async (req, res) => {
  const contests = await Contest.find({}).sort({ startTime: 1 });

  const now = new Date();

  const list = contests.map((contest) => {
    let status = "upcoming";

    if (now < contest.startTime) {
      status = "upcoming";
    } else if (now > contest.endTime) {
      status = "ended";
    } else {
      status = "running";
    }

    return {
      id: contest._id,
      name: contest.name,
      description: contest.description,
      level: contest.level,
      startTime: contest.startTime,
      endTime: contest.endTime,
      status,
      totalProblems: Array.isArray(contest.problems)
        ? contest.problems.length
        : 0,
    };
  });

  return res
    .status(200)
    .json(new apiResponse(200, list, "All contests Fetched"));
});

const getContestDetail = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new apiError(404, "Contest ID is Required");
  }
  const contest = await Contest.findById(id)
    .populate(
      "problems",
      "title difficulty points description sampleInput sampleOutput"
    )
    .populate("createdBy", "username");
  if (!contest) {
    throw new apiError(405, "Contest not found");
  }
  const now = new Date();
  let status = "upcoming";
  if (now < contest.startTime) {
    status = "upcoming";
  } else if (now > contest.endTime) {
    status = "ended";
  } else {
    status = "running";
  }
  const result = {
    id: contest._id,
    name: contest.name,
    description: contest.description,
    level: contest.level,
    startTime: contest.startTime,
    endTime: contest.endTime,
    status,
    problems: contest.problems,
    createdBy: contest.createdBy,
  };
  return res
    .status(200)
    .json(new apiResponse(200, result, "Contest Details Fetched"));
});

const joinContest = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  if (!id) {
    throw new apiError(400, "Contest ID is required");
  }
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new apiError(400, "Invalid Contest ID");
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new apiError(404, "User not found");
  }

  const contest = await Contest.findById(id);
  if (!contest) {
    throw new apiError(404, "Contest not found");
  }

  if (new Date() > new Date(contest.endTime)) {
    throw new apiError(400, "Cannot join an ended contest");
  }

  const alreadyJoined = contest.participants.some((u) => u.equals(userId));
  if (alreadyJoined) {
    throw new apiError(400, "User has already joined the contest");
  }

  contest.participants.push(userId);
  user.joinedContests.push(contest._id);

  await contest.save();
  await user.save();

  return res
    .status(200)
    .json(new apiResponse(200, {}, "User joined contest successfully"));
});

const getContestParticipants = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) throw new apiError(400, "Contest ID is requried");
  if (!mongoose.Types.ObjectId.isValid(id))
    throw new apiError(400, "Invalid contest ID");
  const contest = await Contest.findById(id).populate(
    "participants",
    "username email score"
  );
  if (!contest) throw new apiError(404, "Contest not found");
  return res.status(200).json(
    new apiResponse(
      200,
      {
        contestId: contest._id,
        contestName: contest.name,
        participants: contest.participants,
      },
      "Contest participants fethced"
    )
  );
});

const getUserContests = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const user = await User.findById(userId).populate(
    "joinedContests",
    "name startTime endTime problems"
  );
  if (!user) throw new apiError("User not found");
  const now = new Date();
  const contest = user.joinedContests.map((contest) => {
    let status = "upcoming";
    if (now < contest.startTime) {
      status = "upcoming";
    } else if (now > contest.endTime) {
      status = "ended";
    } else {
      status = "running";
    }
    return {
      id: contest._id,
      name: contest.name,
      level: contest.level,
      startTime: contest.startTime,
      endTime: contest.endTime,
      status,
      problemCount: contest.problems?.length || 0,
    };
  });
  return res
    .status(200)
    .json(new apiResponse(200, contest, "User contests fetched"));
});

const getContestLeaderboard = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) throw new apiError(400, "Contest ID is required");
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new apiError(400, "Invalid Contest ID");
  }
  const contestId = new mongoose.Types.ObjectId(id);
  const contest = await Contest.findById(contestId).populate(
    "participants",
    "username email score"
  );

  if (!contest) throw new apiError(404, "Contest not found");

  const acceptedScores = await Submission.aggregate([
    {
      $match: {
        contest: contestId,
        verdict: "Accepted",
      },
    },
    {
      $group: {
        _id: {
          user: "$user",
          problem: "$problem",
        },
        problemScore: { $max: "$pointsAwarded" },
        firstAcceptedAt: { $min: "$createdAt" },
      },
    },
    {
      $group: {
        _id: "$_id.user",
        totalScore: { $sum: "$problemScore" },
        solvedCount: { $sum: 1 },
        lastAcceptedAt: { $max: "$firstAcceptedAt" },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $unwind: "$user",
    },
    {
      $match: {
        "user.role": "user",
      },
    },
    {
      $project: {
        userId: "$user._id",
        username: "$user.username",
        email: "$user.email",
        totalScore: 1,
        solvedCount: 1,
        lastAcceptedAt: 1,
      },
    },
    {
      $sort: {
        totalScore: -1,
        solvedCount: -1,
        lastAcceptedAt: 1,
      },
    },
  ]);

  const scoreByUserId = new Map(
    acceptedScores.map((entry) => [String(entry.userId), entry])
  );

  const leaderboard = contest.participants
    .map((participant) => {
      const score = scoreByUserId.get(String(participant._id));

      return {
        userId: participant._id,
        username: participant.username,
        email: participant.email,
        totalScore: score?.totalScore || 0,
        solvedCount: score?.solvedCount || 0,
        lastAcceptedAt: score?.lastAcceptedAt || null,
      };
    })
    .sort((a, b) => {
      if (b.totalScore !== a.totalScore) return b.totalScore - a.totalScore;
      if (b.solvedCount !== a.solvedCount) return b.solvedCount - a.solvedCount;
      if (!a.lastAcceptedAt && b.lastAcceptedAt) return 1;
      if (a.lastAcceptedAt && !b.lastAcceptedAt) return -1;
      if (!a.lastAcceptedAt && !b.lastAcceptedAt) {
        return String(a.username).localeCompare(String(b.username));
      }
      return new Date(a.lastAcceptedAt) - new Date(b.lastAcceptedAt);
    })
    .map((entry, index) => ({
      ...entry,
      rank: index + 1,
    }));

  return res
    .status(200)
    .json(
      new apiResponse(
        200,
        {
          contestId: contest._id,
          contestName: contest.name,
          totalParticipants: contest.participants.length,
          leaderboard,
        },
        "Contest leaderboard fetched"
      )
    );
});

export {
  createContest,
  getContests,
  getContestDetail,
  joinContest,
  getContestParticipants,
  getUserContests,
  getContestLeaderboard,
};
