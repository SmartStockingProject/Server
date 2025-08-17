import UserModel, { IUser } from '../models/user.model';
import { CreateUserDto } from '../dtos/user.dto';
import { User } from '../types/user.interface';
import { getModel } from '../utils/model.select';

export const createUserService = async (dto: CreateUserDto): Promise<User> => {

    // בחר את המודל המתאים בהתאם לסביבת הפיתוח
    // אם בסביבת פיתוח, השתמש במודל המוק
    // אחרת, השתמש במודל האמיתי
  const UserModel = getModel('user') as import('mongoose').Model<IUser>;
  // יצירת משתמש חדש במסד הנתונים או במוק
  const doc = await UserModel.create({ name: dto.name }) as { _id: any; name: string };

  return {
    id: doc._id.toString(),
    name: doc.name,
  };
};