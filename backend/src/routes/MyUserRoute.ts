import express from "express";
import MyUserController from "../controller/MyUserController";

const router = express.Router();

router.post("/", MyUserController.createCurrentUser);

export default router;