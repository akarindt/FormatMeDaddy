import { glob } from 'glob';
import { Application } from 'express';
import importFile from './import-file';
import path from 'path';

export default async function loadRoutes(app: Application) {
    const routePaths = await glob(`${path.join(__dirname, '../routes')}/*{.ts, .js}`, { windowsPathsNoEscape: true });

    await Promise.all(
        routePaths.map(async (routePath) => {
            const importedFile = await importFile(routePath);
            app.use('/api', 'default' in importedFile ? importedFile.default : importedFile);
        })
    );
}
