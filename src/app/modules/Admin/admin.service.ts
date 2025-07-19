import { Prisma, PrismaClient } from "../../../generated/prisma";
import { Request, Response } from "express";



const prisma = new PrismaClient();

const getAllAdminsFromDB = async(params: any) => {

    const {searchTerm, ...filterData} = params;
    const andConditions: Prisma.AdminWhereInput[] = [];
    const adminSearchableFields = ['name', 'email'];

    if(params.searchTerm){
        andConditions.push({
            OR: adminSearchableFields.map(field => ({
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
        where: whereConditions
    });

    return result;

    console.log({result});
}

export const AdminServices = {
    getAllAdminsFromDB
}