import { Application, Request, Response } from "express";
import express from "express";
import cors from "cors";
import { userRoutes } from "./app/modules/User/user.route";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send({
    Message: "Ph health care server..",
  });
});

app.use("/api/v1/user", userRoutes);

export default app;
