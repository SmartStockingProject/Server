import { StockItemCreateDto, StockItemDto, StockItemUpdateQuantityDto, StockItemUpdateWholesalePriceDto } from "../dtos/stockItem.dto";
import { IStockItem } from "../models/stockIten.model";
import { getModel } from "../utils/model.select";


export const createStockItem = async (dto: StockItemCreateDto): Promise<StockItemDto> => {
  // בחר את המודל המתאים בהתאם לסביבת הפיתוח
  // אם בסביבת פיתוח, השתמש במודל המוק
  // אחרת, השתמש במודל האמיתי
  const stockItemModel = getModel('stockItem') as import('mongoose').Model<IStockItem>;
  const date= new Date();
  console.log("date: ", date);
  const date1 = new Date(Date.now()); // המרה למבנה Date
console.log("date: ", date);
  const doc = await stockItemModel.create({ name: dto.name, barcode: dto.barcode, category: dto.category, quantityInStock: dto.quantityInStock, wholesalePrice: dto.wholesalePrice, lastUpdatedBy: dto.lastUpdatedBy, lastUpdatedAt: date }) as IStockItem;

  return {
    id: doc._id.toString(),
    name: doc.name,  
  barcode: doc.barcode,
  category: doc.category,
  quantityInStock: doc.quantityInStock,
  wholesalePrice: doc.wholesalePrice,
  lastUpdatedBy: doc.lastUpdatedBy,
  lastUpdatedAt: doc.lastUpdatedAt
  };
};

export const getAllStockItems = async (): Promise<StockItemDto[] | null> => {
      console.log(
    "service here!"
  );
  const stockItemModel = getModel('stockItem') as import('mongoose').Model<IStockItem>;
  console.log(
    "service here!", stockItemModel
  );
  
  const doc = await stockItemModel.find();

  if (!doc) return null;

  return doc.map(stockItem => ({
    id: stockItem._id.toString(),
    name: stockItem.name,  
  barcode: stockItem.barcode,
  category: stockItem.category,
  quantityInStock: stockItem.quantityInStock,
  wholesalePrice: stockItem.wholesalePrice,
  lastUpdatedBy: stockItem.lastUpdatedBy,
  lastUpdatedAt: stockItem.lastUpdatedAt
  }));
};

// עדכון כמות במלאי על פי מזהה וברקוד
export const updateQuantityInStock= async (dto:StockItemUpdateQuantityDto, id: string) : Promise<StockItemDto | null> => {
  const stockItemModel = getModel('stockItem') as import('mongoose').Model<IStockItem>;
    const doc=  await stockItemModel.findOneAndUpdate( {_id: id, barcode: dto.barcode}, {quantityInStock: dto.quantityInStock}, { new: true });
    return doc as StockItemDto;
}

// עדכון מחיר סיטונאי על פי מזהה וברקוד
export const updateWholesalePriceInStock= async (dto:StockItemUpdateWholesalePriceDto, id: string) : Promise<StockItemDto | null> => {
  const stockItemModel = getModel('stockItem') as import('mongoose').Model<IStockItem>;
    const doc=  await stockItemModel.findOneAndUpdate( {_id: id, barcode: dto.barcode}, {wholesalePrice: dto.wholesalePrice}, { new: true });
    return doc as StockItemDto;
}

// חסר מחיקה לפי מזהה