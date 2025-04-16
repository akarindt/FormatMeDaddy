import { MAPPED_FORMAT, UPLOAD_DIRECTORY } from '@helpers/constants';
import fileConverter from '@helpers/file-converter';
import ApiError from '@responses/api-error';
import ApiResponse from '@responses/api-response';
import { Request, Response } from 'express';
import path from 'path';
import { promisify } from 'util';
import { exec } from 'child_process';
import fs from 'fs';

const unlinkAsync = promisify(fs.unlink);
const execAsync = promisify(exec);

export async function convert(req: Request, _res: Response) {
    const files = req.files;

    if (!Array.isArray(files) || files.length === 0 || !files) {
        throw new ApiError(400, 'No files were uploaded.');
    }

    if (!req.body) {
        throw new ApiError(400, 'No body was provided.');
    }

    const convertedFiles = await Promise.all(
        files.map(async (file) => {
            const convertedTo = req.body[file.originalname];
            if (!convertedTo) {
                return unlinkAsync(file.path);
            }

            if (!MAPPED_FORMAT[convertedTo]) {
                return unlinkAsync(file.path);
            }

            const extname = path.extname(file.originalname);
            if (MAPPED_FORMAT[extname] !== MAPPED_FORMAT[convertedTo]) {
                return unlinkAsync(file.path);
            }

            return fileConverter(path.parse(file.path).base, req.body[file.originalname]);
        })
    );

    return new ApiResponse(200, convertedFiles.filter(Boolean));
}

export async function downloadSingle(req: Request, res: Response) {
    const file = req.body.file;

    if (!file || file === '') {
        throw new ApiError(400, 'No file was provided.');
    }

    const outputPath = path.join(UPLOAD_DIRECTORY, path.basename(file));
    if (!fs.existsSync(outputPath)) {
        throw new ApiError(400, 'File does not exist.');
    }

    res.download(outputPath);
}

export async function downloadMultiple(req: Request, res: Response) {
    const files = req.body.files;

    if (!Array.isArray(files) || files.length === 0 || !files) {
        throw new ApiError(400, 'No files were provided.');
    }

    const fileParam = files
        .map((filePath: string) => {
            return path.join(UPLOAD_DIRECTORY, path.basename(filePath));
        })
        .filter(fs.existsSync)
        .join(' ');

    const zipName = `${Date.now()}.zip`;
    const outputPath = path.join(UPLOAD_DIRECTORY, zipName);

    const command = `7z a -tzip ${outputPath} ${fileParam}`;

    await execAsync(command);

    res.download(outputPath, async (err) => {
        await unlinkAsync(outputPath);

        if (err) {
            throw new ApiError(400, 'Something went wrong.');
        }
    });
}
