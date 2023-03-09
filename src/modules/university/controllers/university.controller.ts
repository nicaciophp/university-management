import { Controller } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { UniversityService } from '../services/university.service';

@Controller('university')
export class UniversityController {
    constructor(private readonly universityService: UniversityService) {}

    @Cron(CronExpression.EVERY_MINUTE)
    public async saveUniversity() {
        await this.universityService.saveUniversity();
    }
}
