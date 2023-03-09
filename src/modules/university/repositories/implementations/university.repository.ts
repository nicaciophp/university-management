import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { TCreateUniversity } from "../../models/create-university.type";
import { University } from "../../models/university.model";
import { IUniversity } from "../models/university.interface";

@Injectable()
export class UniversityRepository implements IUniversity {
    constructor(
        @InjectModel('University') private readonly universityModel: Model<University>,
      ) {}
      
    public async create(data: TCreateUniversity): Promise<void> {
        await this.universityModel.create(data);
    }

    public async findByCountryStateName(
        country: string, 
        state: string, 
        name: string
        ): Promise<University | undefined> {
            return await this.universityModel.findOne({ name, country, "state-province": state});
    }
}