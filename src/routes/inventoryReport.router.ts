import express from 'express';
import { downloadPdf } from '../controllers/inventoryReport.controller';

const router = express.Router();

router.get('/inventory-report', downloadPdf);

export default router;
