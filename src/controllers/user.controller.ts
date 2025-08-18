import { NextFunction, Request, Response } from 'express';
import {
  createUser as createUserService,
  updateUser as updateUserService,
  getUser as getUserService,
  getAllUsers as getAllUsersService
} from '../services/user.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { User } from '../types/user.interface';

export const createUser = async (req: Request, res: Response): Promise<any> => {
  const dto: CreateUserDto = req.body; // סוג האובייקט שמתקבל בבקשה הוא CreateUserDto
  const user = await createUserService(dto); // הסוג המוחזר יהיה User
  return res.status(201).json(user);
};

export const getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const users = await getAllUsersService();
    if (!users || users.length === 0 || null) {
      return res.status(404).json({ message: 'No users found' });
    }
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    console.log("hi!");
    
    const userId = req.params.id;
    const user = await getUserService(userId);
    return res.status(200).json(user); 
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const userId = req.params.id;
    const dto: UpdateUserDto = req.body;
    const updatedUser = await updateUserService(userId, dto);
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(201).json(updatedUser);
  } catch (error) {
    next(error); // מעביר את השגיאה למידלואר של ניהול שגיאות
  }
};
