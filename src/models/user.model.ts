import { Schema, model, Document, Types } from 'mongoose';

export interface IUser extends Document {
    _id: Types.ObjectId;
  name: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
});

const UserModel = model<IUser>('User', userSchema);

export default UserModel;
