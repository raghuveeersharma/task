import express from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  postUser,
  updateUser,
} from "../controllers/user.controllers.js";
const router = express.Router();

router.route("/user").post(postUser);
router.route("/user/:_id").put(updateUser).delete(deleteUser).get(getUser);
router.route("/users").get(getUsers);

export { router };
