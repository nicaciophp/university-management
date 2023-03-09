import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common';
import { QueryDto } from 'src/modules/shared/dtos/query.dto';
import { CreateUniversityDto } from '../dtos/create-university.dto';
import { HipolabsApiInterface } from '../interfaces/hipolabs-api.interface';
import { ApiUniversityHipoLabs } from '../providers/university-hipolabs-api.provider';
import { UniversityRepository } from '../repositories/implementations/university.repository';

@Injectable()
export class UniversityService {
    constructor(private readonly universityRepository: UniversityRepository) {}

    public async saveUniversity() {
        const universities = [
            "argentina",
            "brazil",
            "chile",
            "colombia",
            "paraguai",
            "peru",
            "suriname",
            "uruguay"
        ];
        const universityApi = new ApiUniversityHipoLabs();
        await Promise.all(
            universities.map(async (university: string) => {
                const unive = await universityApi.getUniversity(university, {});
                await Promise.all(
                    unive.data.map(async(u) => {
                        const universityExists = await this.universityRepository.findByCountryStateName(
                            u.country, 
                            u['state-province'], 
                            u.name
                        );
                        if(!universityExists) {
                            await this.universityRepository.create(u);
                            console.log('TASK-INSERT-UNIVERSITY', u);
                        }
                    })
                );
            })
        )
    }

    public async createUniversity(data: CreateUniversityDto) {
        const universityExists = await this.universityRepository.findByCountryStateName(
            data.country, 
            data['state-province'], 
            data.name
        );
        if(!!universityExists) {
            throw new BadGatewayException('Universidade já existe.');
        }
        try {
            await this.universityRepository.create(data);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    public async findAll(query: QueryDto) {
        return await this.universityRepository.findAll(query);
    }
}
