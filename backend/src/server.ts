import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(__dirname, '../.env') });

import express from 'express';
import cors from 'cors';
import loadRoutes from './helpers/load-routes';
import errorHandler from '@middlewares/error-handler';
import ApiError from '@responses/api-error';
import deleteExpiredFile from '@helpers/delete-expire-file';
import cron from 'node-cron';

const app = express();
const port = parseInt(process.env.PORT!);

(async () => {
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    await loadRoutes(app);

    app.use('/api/*name', () => {
        throw new ApiError(404, 'Route not found!');
    });

    app.use(errorHandler);

    app.listen(port, () => {
        console.log('[INFO] - Server started! Running at port:', port);
    });
})();

cron.schedule('0 0 0 * * *', async () => {
    await deleteExpiredFile();
    console.log('[INFO] Cron job: Delete expired files - Success!');
});
