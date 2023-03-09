import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { QueryDto } from 'src/modules/shared/dtos/query.dto';
import { CreateUniversityDto } from '../dtos/create-university.dto';
import { UniversityService } from '../services/university.service';

@Controller('universities')
export class UniversityController {
    constructor(private readonly universityService: UniversityService) {}

    @Cron(CronExpression.EVERY_DAY_AT_1AM)
    public async saveUniversity() {
        await this.universityService.saveUniversity();
    }
    
    @UseGuards(JwtAuthGuard)
    @Post()
    public async createUniversity(@Body() data: CreateUniversityDto) {
        await this.universityService.createUniversity(data);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    public async findAll(@Query() query: QueryDto) {
        console.log(query)
        return this.universityService.findAll(query);
    }
}
