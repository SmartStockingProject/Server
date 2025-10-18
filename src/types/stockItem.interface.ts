//מייצג מוצר נוכחי במלאי
export interface StockItem {
  id: string;           
  name: string;         
  barcode: string;            
  category: string;            
  quantityInStock: number;     
  wholesalePrice: number;      
  lastUpdatedBy: string;  // מזהה המשתמש שעדכן את הכמות לאחרונה
  lastUpdatedAt: Date;         
}
