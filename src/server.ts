import express from 'express';
import mongoose from 'mongoose';
import PDFDocument from 'pdfkit';

const app = express();
const PORT = process.env.PORT || 3000;

// התחברות למסד הנתונים MongoDB
// mongoose.connect('mongodb://localhost:27017/smart_stocktaking')
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.log(err));


// מסלול לדוגמה ליצירת PDF
// app.get('/generate-pdf', (req: any, res: { setHeader: (arg0: string, arg1: string) => void; }) => {
//   const doc = new PDFDocument();
//   res.setHeader('Content-disposition', 'attachment; filename=invoice.pdf');
//   res.setHeader('Content-type', 'application/pdf');
//   doc.pipe(res);
//   doc.text('Welcome to Smart Stocktaking System');
//   doc.end();
// });

app.get('/', (req: any, res: any) => {
  res.send("hello to smart stocking");
});

// הפעלת השרת
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
