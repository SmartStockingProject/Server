
export const getModel = (modelName: string) => {
  const isDev = process.env.NODE_ENV === 'development';

  console.log(process.env.NODE_ENV);
  

  // הנתיבים מבוססים על מבנה קבצים של:
  // models/[modelName].model.ts
  // models/__mocks__/[modelName].model.mock.ts

  const realPath = `../models/${modelName}.model`;
  const mockPath = `../models/_mocks_/${modelName}.model.mock`;

  const selectedPath = isDev ? mockPath : realPath;

  const modelModule = require(selectedPath);
  console.log(`Using model from: ${selectedPath} ${modelModule} ${modelModule.default}`);
  
  return modelModule.default;
};
