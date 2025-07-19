import { Request, Response } from "express";
import { UserService } from "./user.service";

const createAdmin = async (req: Request, res: Response) => {
try{
    const result = await UserService.createAdmin(req.body);

  res.send(result);
}
catch(err) {
  res.send(err);
}
};

export const UserController = {
  createAdmin,
};
