import mongoose, { model, Schema } from "mongoose";

const statsSchema = new Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  stats: {
    totalTimeSpent: {
      type: Number,
      default: 0,
    },
    dailyTimeSpent: [
      {
        date: { type: Date },
        timeSpent: { type: Number, default: 0 },
      },
    ],
    monthlyTimeSpent: [
      {
        timeSpent: { type: Number, default: 0 },
      },
    ],
    weeklyTimeSpent: [
      {
        timeSpent: { type: Number, default: 0 },
      },
    ],
  },
});

const Stats = model("stats", statsSchema);
export default Stats;
