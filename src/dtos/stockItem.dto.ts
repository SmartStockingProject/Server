export interface StockItemDto {
  id: string;          
  name: string;        
  barcode: string;           
  category: string;           
  quantityInStock: number;     
  wholesalePrice: number;      
  lastUpdatedBy: string;      
  lastUpdatedAt: Date;        
}

export interface StockItemCreateDto {
  name: string;        
  barcode: string;             
  category: string;            
  quantityInStock: number;     
  wholesalePrice?: number | 0;      
  lastUpdatedBy: string;    
}

export interface StockItemUpdateQuantityDto { 
  barcode: string;                         
  quantityInStock: number;     
}

export interface StockItemUpdateWholesalePriceDto { 
  barcode: string;                         
  wholesalePrice: number;     
}

