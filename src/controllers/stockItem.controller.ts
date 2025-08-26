import express, { NextFunction, Request, Response } from 'express';
import { StockItemCreateDto, StockItemUpdateQuantityDto, StockItemUpdateWholesalePriceDto, StockItemDto } from "../dtos/stockItem.dto";
import { createStockItem as createStockItemService, getAllStockItems as getAllStockItemsService, updateQuantityInStock as updateQuantityInStockService, updateWholesalePriceInStock as updateWholesalePriceInStockService } from "../services/stockItem.service";

export const createStockItem =  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            const dto: StockItemCreateDto = req.body;
            const newItem = await createStockItemService(dto);
            res.status(201).json(newItem);
        } catch (error) {
            next(error);
        }
    }

export const getAllStockItem = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            const items = await getAllStockItemsService();
            res.status(200).json(items);
        } catch (error) {
            next(error);
        }
    }

export const updateQuantity= async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            const id = req.params.id;
            const dto: StockItemUpdateQuantityDto = req.body;
            const updatedItem = await updateQuantityInStockService(dto, id);
            if (!updatedItem) {
                return res.status(404).json({ message: 'Stock item not found' });
            }
            res.status(200).json(updatedItem);
        } catch (error) {
            next(error);
        }
    }

export const updateWholesalePrice = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const id = req.params.id;
        const dto: StockItemUpdateWholesalePriceDto = req.body; 

        const updatedItem = await updateWholesalePriceInStockService(dto, id); 
        if (!updatedItem) {
            return res.status(404).json({ message: 'Stock item not found' });
        }
        res.status(200).json(updatedItem);
    } catch (error) {
        next(error);
    }
};


