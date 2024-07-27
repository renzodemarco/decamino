import express from 'express';
import { getOsmDataController } from '../controllers/osmController.js';

const router = express.Router();

router.get('/', getOsmDataController);

export default router;