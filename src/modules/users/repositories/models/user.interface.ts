import { TCreateUser } from "../../models/create-user.type";
import { User } from "../../models/user.model";

export interface IUser {
  create(data: TCreateUser): Promise<void>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
  changePassword(password: string, id: string): Promise<void>;
}
