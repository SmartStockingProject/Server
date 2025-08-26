import { Schema, model, Document, Types } from "mongoose";

export interface IStockItem extends Document {
  _id: Types.ObjectId;
  name: string;
  barcode: string;
  category: string;
  quantityInStock: number;
  wholesalePrice: number;
  lastUpdatedBy: string;
  lastUpdatedAt: Date;
}

const StockItemSchema = new Schema<IStockItem>({
  name: { type: String, required: true },
  barcode: { type: String, required: true },
  category: { type: String, required: true },
  quantityInStock: { type: Number, required: true },
  wholesalePrice: { type: Number, required: true },
  lastUpdatedBy: { type: String, required: true },
  lastUpdatedAt: { type: Date, required: true },
});

const StockItemModel = model<IStockItem>("StockItem", StockItemSchema);

export default StockItemModel;
