import { Injectable } from '@nestjs/common';
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
}
