import CustomError from '@responses/custom-error';
import { Request, Response, NextFunction } from 'express';

export default function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction) {
    if (err instanceof CustomError) {
        res.status(err.statusCode).send({ errors: err.serializeErrors() });
        return;
    }

    res.status(400).send({ errors: [{ message: process.env.NODE_ENV === 'Development' ? err.message : 'Something went wrong' }] });
    return;
}
