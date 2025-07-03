// src/users/user.interface.ts
import { Document } from 'mongoose';
import { HydratedDocument } from 'mongoose';


export interface User {
  username: string;
  password: string;
  role: string;
}

// This union type ensures _id is correctly typed
export type UserDocument = HydratedDocument<User>;
