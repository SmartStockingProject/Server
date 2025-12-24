import {
  StockItemCreateDto,
  StockItemDto,
  StockItemUpdateQuantityDto,
  StockItemUpdateWholesalePriceDto,
  StockItemByCounterAndDateDto,
} from "../dtos/stockItem.dto";
import { IStockItem } from "../models/stockIten.model";
import { getModel } from "../utils/model.select";
import { sortItemsByCounterAndDatePipeline } from "./inventoryRepoet.service";

export const createStockItem = async (
  dto: StockItemCreateDto
): Promise<StockItemDto> => {
  try {
    // בחר את המודל המתאים בהתאם לסביבת הפיתוח
    // אם בסביבת פיתוח, השתמש במודל המוק
    // אחרת, השתמש במודל האמיתי
    const stockItemModel = getModel(
      "stockItem"
    ) as import("mongoose").Model<IStockItem>;
    const date = new Date();

    const doc = (await stockItemModel.create({
      name: dto.name,
      barcode: dto.barcode,
      category: dto.category,
      quantityInStock: dto.quantityInStock,
      wholesalePrice: dto.wholesalePrice,
      lastUpdatedBy: dto.lastUpdatedBy,
      lastUpdatedAt: date,
    })) as IStockItem;

    return doc as StockItemDto;
  } catch (error) {
    throw error;
  }
};

export const getAllStockItems = async (): Promise<StockItemDto[] | null> => {
  try {
    const stockItemModel = getModel(
      "stockItem"
    ) as import("mongoose").Model<IStockItem>;
    const doc = await stockItemModel.find();
    if (!doc) return null;

    return doc.map((stockItem) => stockItem as StockItemDto);
  } catch (error) {
    throw error;
  }
};

// עדכון כמות במלאי על פי מזהה וברקוד
export const updateQuantityInStock = async (
  dto: StockItemUpdateQuantityDto,
  id: string
): Promise<StockItemDto | null> => {
  const stockItemModel = getModel(
    "stockItem"
  ) as import("mongoose").Model<IStockItem>;
  try {
    const doc = await stockItemModel.findOneAndUpdate(
      { _id: id, barcode: dto.barcode },
      { quantityInStock: dto.quantityInStock },
      { new: true }
    );
    return doc as StockItemDto;
  } catch (error) {
    throw error;
  }
};

// עדכון מחיר סיטונאי על פי מזהה וברקוד
export const updateWholesalePriceInStock = async (
  dto: StockItemUpdateWholesalePriceDto,
  id: string
): Promise<StockItemDto | null> => {
  const stockItemModel = getModel(
    "stockItem"
  ) as import("mongoose").Model<IStockItem>;
  try {
    const doc = await stockItemModel.findOneAndUpdate(
      { _id: id, barcode: dto.barcode },
      { wholesalePrice: dto.wholesalePrice },
      { new: true }
    );
    return doc as StockItemDto;
  } catch (error) {
    throw error;
  }
};

export const deleteStockItem = async (
  id: string
): Promise<StockItemDto | null> => {
  try {
    const stockItemModel = getModel(
      "stockItem"
    ) as import("mongoose").Model<IStockItem>;
    const doc = await stockItemModel.findByIdAndDelete(id);
    return doc as StockItemDto;
  } catch (error) {
    throw error;
  }
};
// קבלת פריטי מלאי מסוננים לפי שם ותאריך באמצעות Pipeline
export const getStockItemsWithPipeline = async (nameCounter: string, date: Date): Promise<StockItemByCounterAndDateDto[] | null> => {
  try {
    const stockItemModel = getModel(
      "stockItem"
    ) as import("mongoose").Model<IStockItem>;

    console.log("hello1 "+ nameCounter + " " + date);
    
    const pipeline = sortItemsByCounterAndDatePipeline(nameCounter, date.toString());
    console.log("hello2" + pipeline);

    const doc = await stockItemModel.aggregate(pipeline);
    console.log("hello3 "+doc.length);
    
    if (!doc) return null;

    return doc;
  } catch (error) {
    throw error;
  }
};
