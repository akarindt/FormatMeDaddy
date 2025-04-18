export default function formatFileSize(size: number) {
    if (size === 0) return '0 B';

    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(size) / Math.log(1024));
    const convertedSize = size / Math.pow(1024, i);

    return `${convertedSize.toFixed(2)} ${units[i]}`;
}
