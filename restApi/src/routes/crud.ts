import express, { Router } from "express";
import { ToDo, User } from "../schema";

const crudRouter: Router = express.Router();

crudRouter.post("/create", async (req, res) => {
  const { isCompleted, task } = req.body;
  const userId = req.user;

  if (!task) return res.send("send proper payload");

  const data = await ToDo.create({
    isCompleted,
    Todo: task,
    userId,
  });
  await data.save();

  const user = await User.findById(data.userId);
  await User.findByIdAndUpdate(user?.id, {
    $set: {
      lenght: (user?.lenght as number) + 1,
    },
  });
  return res.send(data);
});

crudRouter.get("/ToDos", async (req, res) => {
  // const { id } = req.body;
  const id = req.user;
  const data = await ToDo.find({ userId: id });
  res.send(data);
});
crudRouter.get("/ToDos/:id", async (req, res) => {
  const { id } = req.params;

  const data = await ToDo.findById(id);

  res.send(data);
});

crudRouter.put("/update", async (req, res) => {
  const { id } = req.query;
  const { isCompleted, task } = req.body;
  const data = await ToDo.findOneAndUpdate(
    { _id: id },
    { $set: { Todo: task, isCompleted } }
  );
  res.send(data);
});

crudRouter.delete("/delete", async (req, res) => {
  const { id } = req.query;

  const data = await ToDo.deleteOne({ _id: id });
  const user = await User.findById(req.user);
  await User.findByIdAndUpdate(user?.id, {
    $set: {
      lenght: (user?.lenght as number) > 0 ? (user?.lenght as number) - 1 : 0,
    },
  });
  res.send(data);
});

export default crudRouter;
