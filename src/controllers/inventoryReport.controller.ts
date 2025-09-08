// פונקציה ששולפת את כל המידע של הספירה לפי תאריך ולפי סופר
import { Request, Response, NextFunction } from 'express';
import { createPdf, generatePdfWithTable } from '../utils/createPDF';


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

export const downloadPdf = (req: Request, res: Response): void => {
   createPdf(res); 
};
