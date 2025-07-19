import { PrismaClient } from "../../../generated/prisma";
import { Request, Response } from "express";
import { AdminServices } from "./admin.service";



const prisma = new PrismaClient();

const getAllAdmins = async(req: Request, res: Response) => {
    const result = await AdminServices.getAllAdminsFromDB(req.query);

    console.log({result});

    res.status(200).json({
        success: true,
        message: "Data retrieved successfully!",
        data: result
    })
}

export const AdminControllers = {
    getAllAdmins
}