import express, { Request, Response } from "express";
import { PrismaClient } from "../../../generated/prisma";
import { AdminControllers } from "./admin.controller";
import validateRequest from "../../../middlewares/validateRequest";
import { adminValidationSchemas } from "./admin.validation";

const router = express.Router();

router.get("/", AdminControllers.getAllAdmins);
router.get("/:id", AdminControllers.getSingleAdmin);
router.patch("/:id", validateRequest(adminValidationSchemas.update), AdminControllers.updateAdmin);
router.delete("/:id", AdminControllers.deleteAdmin);
router.delete("/soft/:id", AdminControllers.softDeleteAdmin);

export const AdminRoutes = router;