import mongoose from "mongoose";

const ToDoSchema = new mongoose.Schema({
  isCompleted: { type: Boolean, default: false },
  Todo: String,
  // user: { type: mongoose.Schema.Types.ObjectId,
  //   ref: "User",
  // },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export const ToDo = mongoose.model("ToDo", ToDoSchema);

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    require: "email is require",
    // validate: [validateEmail, "Please fill a valid email address"],
    unique: true,
  },

  password: {
    type: String,
    require: true,
    min: [3, "Too few eggs"],
    max: 12,
  },
  lenght: { type: Number, default: 0 },
  // ToDo: [{ type: mongoose.Schema.Types.ObjectId, ref: "ToDo" }],
});

export const User = mongoose.model("User", userSchema);
