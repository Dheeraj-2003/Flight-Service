import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CityService } from './city.service';
import { City } from './city.entity';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';

@Controller('city')
export class CityController {
    constructor(private readonly cityService: CityService){}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UsePipes(ValidationPipe)
    async createCity(@Body() createCityDto: CreateCityDto) {
        const city = new City();
        city.name = createCityDto.name;
        return await this.cityService.createCity(city);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async getAllCitys() {
        return await this.cityService.getCitys();
    }

    @Get(':id')
    async getCityById(@Param('id', ParseIntPipe) id: number): Promise<City>{
        return await this.cityService.getCityById(id);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    async deleteCityById(@Param('id', ParseIntPipe) id: number){
        await this.cityService.deleteCityById(id);
        return {'message': "City deleted succesfully"}
    }
    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    @UsePipes(ValidationPipe)
    async updateCity(@Param('id', ParseIntPipe) id: number,@Body() updateCityDto: UpdateCityDto) {
        const city = new City();
        city.name = updateCityDto.name;
        return await this.cityService.updateCity(id,city);
    }
}
