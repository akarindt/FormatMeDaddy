import ApiResponse from '@responses/api-response';
import { Request, Response, NextFunction } from 'express';
import path from 'path';

export default function asyncHandler(fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) {
    return (req: Request, res: Response, next: NextFunction) => {
        fn(req, res, next)
            .then((apiResponse: ApiResponse) => {
                if (!res.headersSent && apiResponse) {
                    const { data, isFile, field, statusCode } = apiResponse;
                    if (isFile) {
                        res.set(field).status(statusCode).download(data, path.parse(data).base);
                        return;
                    }

                    res.set(field).status(statusCode).send({ data: data });
                    return;
                }
            })
            .catch(next);
    };
}
