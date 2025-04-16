import asyncHandler from '@helpers/async-handler';
import express from 'express';
import * as convertController from '@controllers/convert-controller';
import upload from '@middlewares/multer';

const router = express.Router();

router.post('/file/convert', upload.array('files'), asyncHandler(convertController.convert));
router.post('/file/download/single', asyncHandler(convertController.downloadSingle));
router.post('/file/download/multiple', asyncHandler(convertController.downloadMultiple));

export default router;
