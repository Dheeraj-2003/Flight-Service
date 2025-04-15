import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { FlightService } from './flight.service';
import { Flight } from './flight.entity';
import { CreateFlightDto } from './dto/create-flight.dto';
import { QueryFlightDto } from './dto/query-flight.dto';
import { UpdateSeatsDto } from './dto/update-seats.dto';

@Controller('flight')
export class FlightController {
    constructor(private readonly flightService: FlightService){}
    
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createFlight(@Body() createFlightDto: CreateFlightDto) {
        return this.flightService.createFlight(createFlightDto);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async getAllFlights(@Query() query: QueryFlightDto) {
        return await this.flightService.getFlights(query);
    }

    @Get(':id')
    async getFlightById(@Param('id', ParseIntPipe) id: number): Promise<Flight>{
        return await this.flightService.getFlightById(id);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    async deleteFlightById(@Param('id', ParseIntPipe) id: number){
        await this.flightService.deleteFlightById(id);
        return {'message': "Flight deleted succesfully"}
    }
    @Patch(':id/seats')
    async updateSeats(@Body() updateSeatsDto: UpdateSeatsDto, @Param('id', ParseIntPipe) id:number){
        return await this.flightService.updateTotalSeats(id,updateSeatsDto);
    }
}
