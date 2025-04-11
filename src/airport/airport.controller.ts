import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateAirportDto } from './dto/create-airport.dto';
import { Airport } from 'src/airport/airport.entity';
import { AirportService } from './airport.service';
import { UpdateAirportDto } from 'src/airport/dto/update-airport.dto';

@Controller('airport')
export class AirportController {

    constructor(private readonly airportService: AirportService){}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UsePipes(ValidationPipe)
    async createAirport(@Body() createAirportDto: CreateAirportDto) {
        return this.airportService.createAirport(createAirportDto);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async getAllAirports() {
        return await this.airportService.getAirports();
    }

    @Get(':id')
    async getAirportById(@Param('id', ParseIntPipe) id: number): Promise<Airport>{
        return await this.airportService.getAirportById(id);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    async deleteAirportById(@Param('id', ParseIntPipe) id: number){
        await this.airportService.deleteAirportById(id);
        return {'message': "Airport deleted succesfully"}
    }
    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    @UsePipes(ValidationPipe)
    async updateAirport(@Param('id', ParseIntPipe) id: number,@Body() updateAirportDto: UpdateAirportDto) {
        return await this.airportService.updateAirport(id,updateAirportDto);
    }
}
