import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AirplaneService } from './airplane.service';
import { Airplane } from './airplane.entity';
import { CreateAirplaneDto } from './dto/create-airplane.dto';
import { UpdateAirplaneDto } from './dto/update-airplane.dto';

@Controller('airplanes')
export class AirplaneController {
    constructor(private readonly airplaneService: AirplaneService){}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UsePipes(ValidationPipe)
    async createAirplane(@Body() createAirplaneDto: CreateAirplaneDto) {
        const airplane = new Airplane();
        airplane.modelNumber = createAirplaneDto.modelNumber;
        airplane.capacity = createAirplaneDto.capacity;
        return await this.airplaneService.createAirplane(airplane);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async getAllAirplanes() {
        return await this.airplaneService.getAirplanes();
    }

    @Get(':id')
    async getAirplaneById(@Param('id', ParseIntPipe) id: number): Promise<Airplane>{
        return await this.airplaneService.getAirplaneById(id);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    async deleteAirplaneById(@Param('id', ParseIntPipe) id: number){
        await this.airplaneService.deleteAirplaneById(id);
        return {'message': "Airplane deleted succesfully"}
    }
    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    @UsePipes(ValidationPipe)
    async updateAirplane(@Param('id', ParseIntPipe) id: number,@Body() updateAirplaneDto: UpdateAirplaneDto) {
        const airplane = new Airplane();
        airplane.modelNumber = updateAirplaneDto.modelNumber;
        airplane.capacity = updateAirplaneDto.capacity;
        return await this.airplaneService.updateAirplane(id,airplane);
    }
}
