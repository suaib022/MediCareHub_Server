import { Prisma, PrismaClient } from "../../../generated/prisma";
import { Request, Response } from "express";
import { paginationHelper } from "../../../helper/paginationHelper";
import { adminSearchAbleFields } from "./admin.constant";



const prisma = new PrismaClient();

const getAllAdminsFromDB = async(params: any, options: any) => {

    const { page, limit, skip } = paginationHelper.calculatePagination(options);
    const { searchTerm, ...filterData } = params;
    const andConditions: Prisma.AdminWhereInput[] = [];

    if(params.searchTerm){
        andConditions.push({
            OR: adminSearchAbleFields.map(field => ({
                [field]: {
                    contains: params.searchTerm,
                    mode: "insensitive"
                }
            }))
        })
    }

    if(Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map(key => ({
                [key]: {
                    equals: filterData[key]
                }
            }))
        })
    }

    
    const whereConditions: Prisma.AdminWhereInput =
        andConditions.length > 0 ? { AND: andConditions } : {};

    const result = await prisma.admin.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder ? {
            [options.sortBy]: options.sortOrder
        } : {
            createdAt: 'desc'
        }
    });

    return result;

    console.log({result});
}

export const AdminServices = {
    getAllAdminsFromDB
}