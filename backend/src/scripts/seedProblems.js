import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "../db/db.js";
import { Problem } from "../models/problem.model.js";
import { dsaProblems } from "../data/dsaProblems.js";

dotenv.config({ path: "./.env" });

const shouldReset = process.argv.includes("--reset");

async function seedProblems() {
  await connectDB();

  if (shouldReset) {
    await Problem.deleteMany({});
  }

  const operations = dsaProblems.map((problem) => ({
    updateOne: {
      filter: { title: problem.title },
      update: { $set: problem },
      upsert: true,
    },
  }));

  const result = await Problem.bulkWrite(operations, { ordered: false });

  const totalAfterSeed = await Problem.countDocuments();

  console.log(`Seeded ${dsaProblems.length} DSA problems.`);
  console.log(`Inserted: ${result.upsertedCount || 0}`);
  console.log(`Modified: ${result.modifiedCount || 0}`);
  console.log(`Current total problems: ${totalAfterSeed}`);
}

seedProblems()
  .catch((error) => {
    console.error("Problem seeding failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.connection.close();
  });
