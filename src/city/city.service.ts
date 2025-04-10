import { BadRequestException, HttpCode, HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CityRepository } from './city.repository';
import { City } from './city.entity';

@Injectable()
export class CityService {
    constructor(private readonly cityRepository: CityRepository){}

    async createCity(data: City): Promise<City>{
        try {
            const city = await this.cityRepository.create(data);
            console.log(city)
            return city;
        } catch (error) {
            if(error.name == 'QueryFailedError'){
                throw new BadRequestException('Something went wrong', `name : ${error.message}`)
            }
            if(error instanceof HttpException){
                throw error;
            }
            throw new InternalServerErrorException('Cannot create city')
        }
        
    }
    
    async getCitys(): Promise<City[]> {
        try {
            const cities = await this.cityRepository.findAll();
            if(!cities){
                throw new NotFoundException('No data available for the Citys')
            }
            return cities;
        } catch (error) {
            if(error instanceof HttpException){
                throw error;
            }
            throw new InternalServerErrorException('Cannot fetch cities')
        }
    }

    async getCityById(id: number) : Promise<City>{
        try {
            const city = await this.cityRepository.findOneById(id);
            if(!city){
                throw new NotFoundException(`City with ID: ${id} was not found`);
            }
            return city;
        } catch (error) {
            if(error instanceof HttpException){
                throw error;
            }
            throw new InternalServerErrorException('Cannot fetch City with given ID')
        }
    }
    async deleteCityById(id: number) : Promise<void>{
        try {
            const response =  await this.cityRepository.delete(id);
        } catch (error) {
            if(error instanceof NotFoundException) throw new NotFoundException('Cannot fetch City with given ID');
            else if(error instanceof HttpException){
                throw error;
            }
            throw new InternalServerErrorException('Cannot delete City with given ID')
        }
    }
    async updateCity(id:number, data: Partial<City>) : Promise<City>{
        try {
            const response = await this.cityRepository.update(id,data);
            return response;
        } catch (error) {
            if(error instanceof NotFoundException) throw new NotFoundException('Cannot fetch City with given ID');
            else if(error instanceof HttpException) throw error;
            throw new InternalServerErrorException('Cannot Update the City')
        }
    }
}
