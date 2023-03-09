import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { QueryDto } from 'src/modules/shared/dtos/query.dto';
import { CreateUniversityDto } from '../dtos/create-university.dto';
import { UpdateUniversityDto } from '../dtos/update-university.dto';
import { UniversityService } from '../services/university.service';

@ApiTags('Universities')
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
        return this.universityService.findAll(query);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    public async findOne(@Param('id') id) {
        return this.universityService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    public async update(@Param('id') id, @Body() data: UpdateUniversityDto) {
        return this.universityService.updateUniversity(data, id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    public async delete(@Param('id') id) {
        return this.universityService.deleteUniversity(id);
    }
}
