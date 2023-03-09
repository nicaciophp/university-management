import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { TCreateUser } from "../../models/create-user.type";
import { User } from "../../models/user.model";
import { IUser } from "../models/user.interface";

@Injectable()
export class UserRepository implements IUser {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
      ) {}
      
    public async create(data: TCreateUser): Promise<void> {
        await this.userModel.create(data);
    }

    public async findByEmail(email: string): Promise<User> {
        return await this.userModel.findOne({ email });
    }

    public async findById(id: string): Promise<User> {
        return await this.userModel.findOne({ _id: id });
    }

    public async changePassword(password: string, id: string): Promise<void> {
        await this.userModel.updateOne({ _id: id }, { password })
    } 
}