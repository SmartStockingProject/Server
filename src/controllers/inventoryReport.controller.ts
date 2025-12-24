// פונקציה ששולפת את כל המידע של הספירה לפי תאריך ולפי סופר
import { Request, Response, NextFunction } from 'express';
import { createPdf, generatePdfWithTable } from '../utils/createPDF';
import { getStockItemsWithPipeline } from '../services/stockItem.service';


// export const getInventoryReport = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
//   try {
//     const { date, supermarketId } = req.query;

//     if (!date || !supermarketId) {
//       return res.status(400).json({ message: 'Missing required query parameters: date and supermarketId' });
//     }

//     const report = await getInventoryReportService(date as string, supermarketId as string);

//     if (!report) {
//       return res.status(404).json({ message: 'No report found for the given date and supermarket' });
//     }

//     return res.status(200).json(report);

//   } catch (error) {
//     next(error);
//   }
// };

export const downloadPdf = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
   console.log("hi from controller "+ req.params.nameCounter + " " + req.params.date);
   
   const dataOfTable = await getStockItemsWithPipeline(req.query.nameCounter as string , new Date(req.query.date as string));
   console.log("hello4");
   
  // createPdf(dataOfTable, res); 
    res.status(200).json(dataOfTable);
};

