import { Types } from 'mongoose';
import { IStockItem } from '../stockIten.model';
import { sortItemsByCounterAndDatePipeline } from '../../services/inventoryRepoet.service';

let mockStockItems: IStockItem[] = [
    {
        _id: new Types.ObjectId(),
        name: 'Item 1',
        barcode: '1234567890123',
        category: 'Category 1',
        quantityInStock: 100,
        wholesalePrice: 10.99,
        lastUpdatedBy: 'Admin',
        lastUpdatedAt: new Date(),
    } as IStockItem,
    {
        _id: new Types.ObjectId(),
        name: 'Item 2',
        barcode: '9876543210123',
        category: 'Category 2',
        quantityInStock: 50,
        wholesalePrice: 20.99,
        lastUpdatedBy: 'Admin',
        lastUpdatedAt: new Date(),
    } as IStockItem,
];

const MockStockItemModel = {
    find: async () => mockStockItems,
    findById: async (id: string) => mockStockItems.find(item => item._id.toString() === id) || null,
    findByIdAndUpdate: async (id: string, dto: Partial<IStockItem>) => {
        const item = mockStockItems.find(i => i._id.toString() === id);
        if (!item) return null;
        Object.assign(item, dto);
        return item;
    },
    findByIdAndDelete: async (id: string) => {
        const index = mockStockItems.findIndex(item => item._id.toString() === id);
        if (index === -1) return null;
        const deleted = mockStockItems.splice(index, 1)[0];
        return deleted;
    },
    create: async (dto: Partial<IStockItem>) => {
        const newItem = { _id: new Types.ObjectId(), ...dto } as IStockItem;
        mockStockItems.push(newItem);
        return newItem;
    },
    findOneAndUpdate: async (filter: Partial<IStockItem>, update: Partial<IStockItem>, options: { new: boolean }) => {
        const item = mockStockItems.find(i => i._id.toString() === filter._id?.toString() && i.barcode === filter.barcode);
        if (!item) return null;
        Object.assign(item, update);
        return options.new ? item : null; // אם רוצים את הפריט המעודכן
    },
      aggregate: async (pipeline: any) => {
        // const aggregatedItems = mockStockItems.filter(item => {
        //     const match = pipeline[0].$match;
        //     const dateCondition = item.lastUpdatedAt == match.lastUpdatedAt.$eq;
        //     return item.lastUpdatedBy === match.lastUpdatedBy && dateCondition;
        // });
        //------------
        // const pipeline2 = sortItemsByCounterAndDatePipeline('Admin', new Date().toISOString());
        // const result = executePipeline(mockStockItems, pipeline);
        // return result
          return mockStockItems.map(item => ({
        name: item.name,
        quantityInStock: item.quantityInStock, // הוסף גם את הכמות
    }));
    },
};

const executePipeline = (data: any[], pipeline: any) => {
    let result = data;

    for (const stage of pipeline) {
        if (stage.$match) {
            result = result.filter(item => 
                item.lastUpdatedBy === stage.$match.lastUpdatedBy &&
                item.lastUpdatedAt.getTime() === stage.$match.lastUpdatedAt.getTime()
            );
        }
        if (stage.$project) {
            result = result.map(item => ({
                name: item.name,
                quantityInStock: item.quantityInStock,
            }));
        }
    }

    return result;
};

export default MockStockItemModel;
