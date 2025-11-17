export const sortItemsByCounterAndDatePipeline = (nameCounter: string, date: string) => [
    { 
        $match: { 
            lastUpdatedBy: nameCounter,
            lastUpdatedAt: {
            $eq: new Date(date) 
        }
        } 
    },
      {
        $project: {
            name: 1,
            quantityInStock: 1, // אם אתה רוצה לשמור את זה לסינון
        },
    },
];