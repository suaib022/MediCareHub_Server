import express, { Request, Response } from "express";
import { PrismaClient } from "../../../generated/prisma";
import { AdminControllers } from "./admin.controller";

const router = express.Router();

router.get("/", AdminControllers.getAllAdmins)

export const AdminRoutes = router;