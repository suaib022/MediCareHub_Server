import express, { Request, Response } from "express";
// import { userController } from './user.controller';

const router = express.Router();

// router.post("/", userController.createAdmin);

router.get("/", (req: Request, res: Response) => {
  res.send({
    message: "Choltache -,-",
  });
});

export const userRoutes = router;
