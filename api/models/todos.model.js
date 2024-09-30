import mongoose, { model, Schema } from "mongoose";
import User from "./user.models.js";

const todoSchema = new Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    list: [
      {
        task: { type: String, required: true },
        completed: { type: Boolean, default: false },
        deadline: { type: Date },
        createdAt: { type: Date, required: true },
        estimatedTime: { type: Number },
        timeSpent: { type: Number, default: 0 },
        repeat: {
            type: String,
            enum: ["DAILY", "WEEKLY", "MONTHLY","NONE"],
            default: "NONE",
        },
      },
    ],
  },
  { timeStamps: true }
);

const TodoList = model("todo", todoSchema);

export default TodoList;
