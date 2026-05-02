import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { Problem } from "../models/problem.model.js";
import { Contest } from "../models/contest.model.js";
import { apiResponse } from "../utils/apiResponse.js";

const addProblem = asyncHandler(async (req, res) => {
  // 1. get values 2.validation 3.
  const {
    title,
    description,
    inputFormat,
    outputFormat,
    sampleInput,
    sampleOutput,
    difficulty,
    points,
  } = req.body;
  if (
    [
      title,
      description,
      inputFormat,
      outputFormat,
      sampleInput,
      sampleOutput,
      difficulty,
      points,
    ].some((feild) => feild?.toString().trim() === "")
  ) {
    throw new apiError(405, "All fields are required");
  }
  const existedProblem = await Problem.findOne({
    $or: [{ title }],
  });
  if (existedProblem) {
    throw new apiError(404, "Problem already exists");
  }
  const problem = await Problem.create({
    title: title.toLowerCase(),
    description,
    inputFormat,
    outputFormat,
    sampleInput,
    sampleOutput,
    difficulty: difficulty.toLowerCase(),
    points,
    createdBy: req.user._id,
  });
  return res
    .status(200)
    .json(new apiResponse(200, problem, "Problem Added Successfully"));
});

const getAllProblems = asyncHandler(async (req, res) => {
  const problems = await Problem.find({});

  return res
    .status(200)
    .json(new apiResponse(200, problems, "Problems Fetched"));
});

const getProblemCatalog = asyncHandler(async (req, res) => {
  const [problems, contests] = await Promise.all([
    Problem.find({}).sort({ createdAt: -1 }),
    Contest.find({}).select("name level problems"),
  ]);

  const contestMap = new Map();

  contests.forEach((contest) => {
    contest.problems.forEach((problemId) => {
      const key = String(problemId);
      const linkedContests = contestMap.get(key) || [];

      linkedContests.push({
        id: contest._id,
        name: contest.name,
        level: contest.level,
      });

      contestMap.set(key, linkedContests);
    });
  });

  const standaloneProblems = [];
  const contestProblems = [];

  problems.forEach((problem) => {
    const linkedContests = contestMap.get(String(problem._id)) || [];
    const enrichedProblem = {
      ...problem.toObject(),
      contests: linkedContests,
      inContest: linkedContests.length > 0,
    };

    if (linkedContests.length > 0) {
      contestProblems.push(enrichedProblem);
      return;
    }

    standaloneProblems.push(enrichedProblem);
  });

  return res.status(200).json(
    new apiResponse(
      200,
      {
        standaloneProblems,
        contestProblems,
      },
      "Problem catalog fetched"
    )
  );
});

const getProblemById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const problem = await Problem.findById(id);
  if (!problem) {
    throw new apiError(406, "Problem not found");
  }
  return res.status(200).json(new apiResponse(200, problem, "Problem fetched"));
});

const updateProblem = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updates = {};
  [
    "title",
    "description",
    "inputFormat",
    "outputFormat",
    "sampleInput",
    "sampleOutput",
    "difficulty",
    "points",
  ].forEach((field) => {
    if (req.body[field] !== undefined) updates[field] = req.body[field];
  });

  const updatedProblem = await Problem.findByIdAndUpdate(
    id,
    { $set: updates },
    { new: true }
  );

  if (!updatedProblem) {
    throw new apiError(404, "Problem not found for update");
  }
  return res
    .status(200)
    .json(new apiResponse(200, updatedProblem, "Problem Updated Successfully"));
});

const deleteProblem = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deletedProblem = await Problem.findByIdAndDelete(id);
  if (!deletedProblem) {
    throw new apiError(404, "Problem not found for deletion");
  }
  return res
    .status(200)
    .json(new apiResponse(200, deletedProblem, "Problem Deleted Successfully"));
});

export {
  addProblem,
  getAllProblems,
  getProblemCatalog,
  getProblemById,
  updateProblem,
  deleteProblem,
};
