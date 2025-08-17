import { Request, Response } from 'express';
import {
  createUserService,
  
} from '../services/user.service';
import { CreateUserDto } from '../dtos/user.dto';


export const createUser = async (req: Request, res: Response) => {
  const dto: CreateUserDto = req.body; // סוג האובייקט שמתקבל בבקשה הוא CreateUserDto
console.log("body: "+req.body);
  const user = await createUserService(dto); // הסוג המוחזר יהיה User
  res.status(201).json(user);
};