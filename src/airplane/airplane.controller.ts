import { Body, Controller, HttpCode, HttpStatus, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AirplaneService } from './airplane.service';
import {CreateAirplaneDto} from './dto/create-airplane.dto';
import { Airplane } from './airplane.entity';

@Controller('airplanes')
export class AirplaneController {
    constructor(private readonly airplaneService: AirplaneService){}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UsePipes(ValidationPipe)
    async createAirplane(@Body() createAirplaneDto: CreateAirplaneDto) {
        const airplane = new Airplane();
        airplane.modelNumber = createAirplaneDto.modelNumber;
        airplane.capacity = createAirplaneDto.capacity
        return await this.airplaneService.createAirplane(airplane);
    }
}
