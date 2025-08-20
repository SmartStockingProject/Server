import { Types } from 'mongoose';
import { IUser } from '../user.model';

let mockUsers: IUser[] = [
  { _id:new Types.ObjectId(), name: 'Alice' } as IUser,
  { _id: new Types.ObjectId(), name: 'Bob'} as IUser,
];

const MockUserModel = {
  find: async () => mockUsers,
  findById: async (id: string) => mockUsers.find(u => u._id.toString() === id) || null,
  findByIdAndUpdate: async (id: string, dto: Partial<IUser>) => {
    const user = mockUsers.find(u => u._id.toString() === id);
    if (!user) return null;
    Object.assign(user, dto);
    return user;
  },
  findByIdAndDelete: async (id: string) => {
    const index = mockUsers.findIndex(u => u._id.toString() === id);
    if (index === -1) return null;
    const deleted = mockUsers.splice(index, 1)[0];
    return deleted;
  },
  create: async (dto: Partial<IUser>) => {
    const newUser = { _id: new Types.ObjectId(), ...dto } as IUser;
    mockUsers.push(newUser);
    return newUser;
  },
};

export default MockUserModel;
