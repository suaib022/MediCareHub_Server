import { PrismaClient } from "../../../generated/prisma";
import { Request, Response } from "express";
import { AdminServices } from "./admin.service";
import pick from "../../../shared/pick";
import { adminFilterableFields } from "./admin.constant";



const prisma = new PrismaClient();

const getAllAdmins = async(req: Request, res: Response) => {
          // console.log(req.query)
        const filters = pick(req.query, adminFilterableFields);
        const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder'])
        console.log(options)

    const result = await AdminServices.getAllAdminsFromDB(filters, options);

    // console.log({result});

    res.status(200).json({
        success: true,
        message: "Data retrieved successfully!",
        data: result
    })
}

export const AdminControllers = {
    getAllAdmins
}