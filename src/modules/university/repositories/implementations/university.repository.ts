import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { QueryDto } from "src/modules/shared/dtos/query.dto";
import { IPaginatedData } from "src/modules/shared/models/paginated-data.interface";
import { TCreateUniversity } from "../../models/create-university.type";
import { University } from "../../models/university.model";
import { TUpdateUniversity } from "../../models/update-university.type";
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

    public async findAll(
        query: QueryDto
        ): Promise<IPaginatedData<Pick<
        University, 
        'country' | 
        'name' | 
        'state-province' | 
        '_id'>>> {
            const currentPage = (Math.max(1, query.page) - 1) * query.limit;
            const find = !!query.country ? { country: query.country } : {}
            const data = await this.universityModel
            .find(find)
            .limit(query.limit)
            .skip(currentPage);
            const dataParse = data.map((university) => {
                return {
                    _id: university._id,
                    name: university.name,
                    country: university.country,
                    'state-province': university['state-province'],
                }
            })
            const total = await this.universityModel.count(find);

            return {
                data: dataParse,
                totalPages: Math.ceil(total / query.limit),
            }
    }

    public async findById(id: string): Promise<University> {
        return await this.universityModel.findOne({_id: id })
    }

    public async update(data: TUpdateUniversity, id: string): Promise<void> {
        await this.universityModel.updateOne({ _id: id }, { 
            name: data.name,
            domains: data.domains,
            web_pages: data.web_pages,
            updated_at: new Date()
         });
    }

    public async delete(id: string): Promise<void> {
        await this.universityModel.deleteOne({ _id: id })
    }
}