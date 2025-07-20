import { PrismaClient } from "../../../generated/prisma";
import { NextFunction, Request, Response } from "express";
import { AdminServices } from "./admin.service";
import pick from "../../../shared/pick";
import { adminFilterableFields } from "./admin.constant";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status"

const prisma = new PrismaClient();

const getAllAdmins = async (req: Request, res: Response) => {
  // console.log(req.query)
  const filters = pick(req.query, adminFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
//   console.log(options);

  const result = await AdminServices.getAllAdminsFromDB(filters, options);

  // console.log({result});

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin retrieved successfully!",
    meta: result.meta,
    data: result.data
  })
};

const getSingleAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const result = await AdminServices.getSingleAdminByIdFromDB(id);
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Admin data fetched by id!",
            data: result
        });
    }
    catch (err) {
        next(err)
    }
};

const updateAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const result = await AdminServices.updateAdminIntoDB(id, req.body);
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Admin data updated!",
            data: result
        })
    }
    catch (err) {
        next(err)
    }
};

const deleteAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const result = await AdminServices.deleteAdminFromDB(id);
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Admin data deleted!",
            data: result
        })
    }
    catch (err) {
        next(err)
    }
};


const softDeleteAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const result = await AdminServices.softDeleteAdminFromDB(id);
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Admin data deleted!",
            data: result
        })
    }
    catch (err) {
        next(err)
    }
};

export const AdminControllers = {
  getAllAdmins,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
  softDeleteAdmin
};
