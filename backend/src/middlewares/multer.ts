import multer, { StorageEngine } from 'multer';
import { Request } from 'express';
import path from 'path';
import fs from 'fs';
import { MAX_FILE_SIZE, ACCEPTED_FORMAT, PRE_UPLOAD_DIRECTORY } from '@helpers/constants';
import ApiError from '@responses/api-error';

if (!fs.existsSync(PRE_UPLOAD_DIRECTORY)) {
    fs.mkdirSync(PRE_UPLOAD_DIRECTORY, { recursive: true });
    console.log(`[INFO] Created upload directory: ${PRE_UPLOAD_DIRECTORY}`);
}

const allAcceptedExtensions = new Set<string>();
Object.values(ACCEPTED_FORMAT).forEach((formats) => {
    formats.forEach((ext) => allAcceptedExtensions.add(`${ext.toLowerCase()}`));
});

const storage: StorageEngine = multer.diskStorage({
    destination: (_req: Request, _file: Express.Multer.File, cb) => {
        cb(null, PRE_UPLOAD_DIRECTORY);
    },
    filename: (_req: Request, file: Express.Multer.File, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const extension = path.extname(file.originalname).toLowerCase();
        const baseName = path.basename(file.originalname, extension);
        const safeBaseName = baseName.replace(/[^a-zA-Z0-9_-]/g, '_');
        cb(null, `${safeBaseName}-${uniqueSuffix}${extension}`);
    },
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: MAX_FILE_SIZE,
    },
    fileFilter: (_req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
        const fileExtension = path.extname(file.originalname).toLowerCase();

        if (allAcceptedExtensions.has(fileExtension)) {
            cb(null, true);
        } else {
            const allowedExtString = Array.from(allAcceptedExtensions).join(', ');
            const error = new ApiError(400, `Invalid file type. Only the following extensions are allowed: ${allowedExtString}`);
            cb(error);
        }
    },
});
export default upload;
