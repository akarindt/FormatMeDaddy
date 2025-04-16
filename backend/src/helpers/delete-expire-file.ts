import { glob } from 'glob';
import fs from 'fs';
import { promisify } from 'util';
import { DAY_AGO, PRE_UPLOAD_DIRECTORY, UPLOAD_DIRECTORY } from './constants';

const statAsync = promisify(fs.stat);
const unlinkAsync = promisify(fs.unlink);

const deleteExpiredFile = async () => {
    const threshold = Date.now() - DAY_AGO * 24 * 60 * 60 * 1000;

    const [preUploadFiles, uploadFiles] = await Promise.all([
        glob(`${PRE_UPLOAD_DIRECTORY}/*`, { windowsPathsNoEscape: true }),
        glob(`${UPLOAD_DIRECTORY}/*`, { windowsPathsNoEscape: true }),
    ]);

    return Promise.all(
        [...preUploadFiles, ...uploadFiles].map(async (filePath) => {
            const stat = await statAsync(filePath);
            if (stat.birthtimeMs <= threshold) {
                return unlinkAsync(filePath);
            }
        })
    );
};

export default deleteExpiredFile;
