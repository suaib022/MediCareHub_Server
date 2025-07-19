import express, { Request, Response } from "express";
import { UserController } from "./user.controller";
// import { userController } from './user.controller';

const router = express.Router();

// router.post("/", userController.createAdmin);


router.post("/", UserController.createAdmin);

export const userRoutes = router;
