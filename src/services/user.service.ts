import UserModel, { IUser } from '../models/user.model';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { User } from '../types/user.interface';
import { getModel } from '../utils/model.select';

export const createUser = async (dto: CreateUserDto): Promise<User> => {
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

export const getAllUsers = async (): Promise<User[] | null> => {
  const UserModel = getModel('user') as import('mongoose').Model<IUser>;
  const doc = await UserModel.find();

  if (!doc) return null;

  return doc.map(user => ({
    id: user._id.toString(),
    name: user.name
  }));
};

export const getUser = async (
  id: string,
): Promise<User | null> => {
    console.log("hi!");
    
  const UserModel = getModel('user') as import('mongoose').Model<IUser>;
  const doc = await UserModel.findById(id);

  if (!doc) return null;

  return {
    id: doc._id.toString(),
    name: doc.name
  };
};

export const updateUser = async (
  id: string,
  dto: UpdateUserDto
): Promise<User | null> => {
  const UserModel = getModel('user') as import('mongoose').Model<IUser>;
  const doc = await UserModel.findByIdAndUpdate(id, dto, { new: true });

  if (!doc) return null;

  return {
    id: doc._id.toString(),
    name: doc.name
  };
};
