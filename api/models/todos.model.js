import mongoose, { model, Schema } from "mongoose";

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
        created_at: { type: Date, required: true },
        estimatedTime: { type: Number },
        timeSpent: { type: Number, default: 0 },
        repeat: {
          interval: {
            type: String,
            enum: ["DAILY", "WEEKLY", "MONTHLY"],
            default: null,
          },
        },
      },
    ],
  },
  { timeStamps: true }
);

const TodoList = model("todo", todoSchema);

export default TodoList;
