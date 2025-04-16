import url from 'url';

export default async function importFile(filePath: string) {
    return (await import(url.pathToFileURL(filePath).href))?.default;
}
