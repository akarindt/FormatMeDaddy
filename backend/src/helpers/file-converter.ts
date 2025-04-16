import ApiError from '@responses/api-error';
import os from 'os';
import { MAPPED_LIBRARY, PRE_UPLOAD_DIRECTORY, UPLOAD_DIRECTORY } from './constants';
import path from 'path';
import fs from 'fs';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

const buildCommand = (extName: string, platform: 'darwin' | 'linux' | 'win32', replacements: Record<string, string>) => {
    return MAPPED_LIBRARY[extName][platform].replace(/#(\w+)/g, (_, key) => replacements[key] || '');
};

export default async function fileConverter(fileName: string, convertTo: string) {
    if (!fs.existsSync(UPLOAD_DIRECTORY)) {
        fs.mkdirSync(UPLOAD_DIRECTORY, { recursive: true });
        console.log(`[INFO] Created upload directory: ${UPLOAD_DIRECTORY}`);
    }

    const platform = os.platform();

    if (!['linux', 'darwin', 'win32'].includes(platform)) {
        throw new ApiError(400, 'Unsupported platform!');
    }

    const inputFile = path.join(PRE_UPLOAD_DIRECTORY, fileName);
    const parse = path.parse(inputFile);
    const outputFile = path.join(UPLOAD_DIRECTORY, `${parse.name}${convertTo}`);

    const command = buildCommand(parse.ext, platform as 'darwin' | 'linux' | 'win32', {
        FROM: inputFile,
        DIR: path.dirname(outputFile),
        OUTPUT: outputFile,
        EXT: convertTo.replace('.', ''),
    });

    await execAsync(command);
    return path.basename(outputFile);
}
