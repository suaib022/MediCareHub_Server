import { NextFunction, Request, Response } from "express";
import { ZodObject, ZodRawShape } from "zod";

type AnyZodObject = ZodObject<ZodRawShape>;

const validateRequest = (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await schema.parseAsync({
            body: req.body
        })
        return next();
    }
    catch (err) {
        next(err)
    }
};

export default validateRequest;