import { IUser } from '../user.model';

let mockUsers: IUser[] = [
  { _id: '1', name: 'Alice' } as IUser,
  { _id: '2', name: 'Bob'} as IUser,
];

const MockUserModel = {
  find: async () => mockUsers,
  findById: async (id: string) => mockUsers.find(u => u._id === id) || null,
  findByIdAndUpdate: async (id: string, dto: Partial<IUser>) => {
    const user = mockUsers.find(u => u._id === id);
    if (!user) return null;
    Object.assign(user, dto);
    return user;
  },
  findByIdAndDelete: async (id: string) => {
    const index = mockUsers.findIndex(u => u._id === id);
    if (index === -1) return null;
    const deleted = mockUsers.splice(index, 1)[0];
    return deleted;
  },
  create: async (dto: Partial<IUser>) => {
    const newUser = { _id: Date.now().toString(), ...dto } as IUser;
    mockUsers.push(newUser);
    return newUser;
  },
};

export default MockUserModel;
