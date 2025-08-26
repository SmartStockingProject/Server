import express from 'express';
import { createStockItem, getAllStockItem, updateQuantity, updateWholesalePrice } from '../controllers/stockItem.controller';
const router = express.Router();

router.post('/stock-item', createStockItem);
router.get('/stock-item', getAllStockItem);
router.put('/stock-item/:id', updateQuantity);
router.put('/stock-item/price/:id', updateWholesalePrice);

export default router;