import MappedLibrary from '@typings/mapped-library';
import path from 'path';

export const MAX_FILE_SIZE = 500 * 1024 * 1024; // 500MB
export const ACCEPTED_FORMAT = {
    documents: ['.pdf', '.docx', '.txt', '.odt'],
    images: ['.jpg', '.png', '.webp', '.gif', '.bmp', '.svg'],
    audio: ['.mp3', '.wav', '.ogg', '.flac'],
    video: ['.mp4', '.avi', '.mkv', '.mov', '.webm'],
    archives: ['.zip', '.rar', '.7z', '.tar.gz'],
};

export const MAPPED_FORMAT: Record<string, string> = {
    '.pdf': 'documents',
    '.docx': 'documents',
    '.txt': 'documents',
    '.odt': 'documents',
    '.jpg': 'images',
    '.png': 'images',
    '.webp': 'images',
    '.gif': 'images',
    '.bmp': 'images',
    '.svg': 'images',
    '.mp3': 'audio',
    '.wav': 'audio',
    '.ogg': 'audio',
    '.flac': 'audio',
    '.mp4': 'video',
    '.avi': 'video',
    '.mkv': 'video',
    '.mov': 'video',
    '.webm': 'video',
    '.zip': 'archives',
    '.rar': 'archives',
    '.7z': 'archives',
    '.tar.gz': 'archives',
};

export const MAPPED_LIBRARY: MappedLibrary = {
    '.pdf': {
        linux: 'libreoffice --headless --convert-to #EXT --outdir #DIR #FROM',
        win32: 'libreoffice --headless --convert-to #EXT --outdir #DIR #FROM',
        darwin: 'libreoffice --headless --convert-to #EXT --outdir #DIR #FROM',
    },
    '.docx': {
        linux: 'libreoffice --headless --convert-to #EXT --outdir #DIR #FROM',
        win32: 'libreoffice --headless --convert-to #EXT --outdir #DIR #FROM',
        darwin: 'libreoffice --headless --convert-to #EXT --outdir #DIR #FROM',
    },
    '.txt': {
        linux: 'pandoc #FROM -o #OUTPUT',
        win32: 'pandoc #FROM -o #OUTPUT',
        darwin: 'pandoc #FROM -o #OUTPUT',
    },

    '.odt': {
        linux: 'libreoffice --headless --convert-to #EXT --outdir #DIR #FROM',
        win32: 'libreoffice --headless --convert-to #EXT --outdir #DIR #FROM',
        darwin: 'libreoffice --headless --convert-to #EXT --outdir #DIR #FROM',
    },

    '.jpg': {
        linux: 'convert #FROM #OUTPUT',
        win32: 'magick "#FROM" "#OUTPUT"',
        darwin: 'convert #FROM #OUTPUT',
    },
    '.png': {
        linux: 'convert #FROM #OUTPUT',
        win32: 'magick "#FROM" "#OUTPUT"',
        darwin: 'convert #FROM #OUTPUT',
    },
    '.webp': {
        linux: 'convert #FROM #OUTPUT',
        win32: 'magick "#FROM" "#OUTPUT"',
        darwin: 'convert #FROM #OUTPUT',
    },
    '.gif': {
        linux: 'convert #FROM #OUTPUT',
        win32: 'magick "#FROM" "#OUTPUT"',
        darwin: 'convert #FROM #OUTPUT',
    },
    '.bmp': {
        linux: 'convert #FROM #OUTPUT',
        win32: 'magick "#FROM" "#OUTPUT"',
        darwin: 'convert #FROM #OUTPUT',
    },
    '.svg': {
        linux: 'inkscape #FROM --export-type=#EXT --export-filename=#OUTPUT',
        win32: 'inkscape #FROM --export-type=#EXT --export-filename=#OUTPUT',
        darwin: 'inkscape #FROM --export-type=#EXT --export-filename=#OUTPUT',
    },

    '.mp3': {
        linux: 'ffmpeg -i #FROM #OUTPUT',
        win32: 'ffmpeg -i #FROM #OUTPUT',
        darwin: 'ffmpeg -i #FROM #OUTPUT',
    },
    '.wav': {
        linux: 'ffmpeg -i #FROM #OUTPUT',
        win32: 'ffmpeg -i #FROM #OUTPUT',
        darwin: 'ffmpeg -i #FROM #OUTPUT',
    },
    '.ogg': {
        linux: 'ffmpeg -i #FROM #OUTPUT',
        win32: 'ffmpeg -i #FROM #OUTPUT',
        darwin: 'ffmpeg -i #FROM #OUTPUT',
    },
    '.flac': {
        linux: 'ffmpeg -i #FROM #OUTPUT',
        win32: 'ffmpeg -i #FROM #OUTPUT',
        darwin: 'ffmpeg -i #FROM #OUTPUT',
    },

    '.mp4': {
        linux: 'ffmpeg -i #FROM #OUTPUT',
        win32: 'ffmpeg -i #FROM #OUTPUT',
        darwin: 'ffmpeg -i #FROM #OUTPUT',
    },
    '.avi': {
        linux: 'ffmpeg -i #FROM #OUTPUT',
        win32: 'ffmpeg -i #FROM #OUTPUT',
        darwin: 'ffmpeg -i #FROM #OUTPUT',
    },
    '.mkv': {
        linux: 'ffmpeg -i #FROM #OUTPUT',
        win32: 'ffmpeg -i #FROM #OUTPUT',
        darwin: 'ffmpeg -i #FROM #OUTPUT',
    },
    '.mov': {
        linux: 'ffmpeg -i #FROM #OUTPUT',
        win32: 'ffmpeg -i #FROM #OUTPUT',
        darwin: 'ffmpeg -i #FROM #OUTPUT',
    },
    '.webm': {
        linux: 'ffmpeg -i #FROM #OUTPUT',
        win32: 'ffmpeg -i #FROM #OUTPUT',
        darwin: 'ffmpeg -i #FROM #OUTPUT',
    },

    '.zip': {
        linux: 'unzip #FROM -d #DIR',
        win32: '7z x #FROM -o#DIR',
        darwin: 'unzip #FROM -d #DIR',
    },
    '.rar': {
        linux: 'unrar x #FROM #DIR',
        win32: '7z x #FROM -o#DIR',
        darwin: 'unrar x #FROM #DIR',
    },
    '.7z': {
        linux: '7z x #FROM -o#DIR',
        win32: '7z x #FROM -o#DIR',
        darwin: '7z x #FROM -o#DIR',
    },
    '.tar.gz': {
        linux: 'tar -xzf #FROM -C #DIR',
        win32: '7z x #FROM -o#DIR',
        darwin: 'tar -xzf #FROM -C #DIR',
    },
};

export const PRE_UPLOAD_DIRECTORY = path.join(__dirname, '..', '..', 'pre_uploads');
export const UPLOAD_DIRECTORY = path.join(__dirname, '..', '..', 'uploads');
export const DAY_AGO = 7;
