import { BadRequestException, HttpException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { AirportRepository } from './airport.repository';
import { CreateAirportDto } from './dto/create-airport.dto';
import { Airport } from './airport.entity';
import { CityRepository } from 'src/city/city.repository';
import { UpdateAirportDto } from './dto/update-airport.dto';

@Injectable()
export class AirportService {
    constructor(private readonly airportRepository: AirportRepository, private readonly cityRepository: CityRepository){}

    async createAirport(data: CreateAirportDto){
        
        try {
            const city = await this.cityRepository.findOneById(data.cityId);
            if(!city){
                throw new NotFoundException('No city with given ID');
            }
            return await this.airportRepository.create({...data, city});
        } catch (error) {
            if(error.name == 'QueryFailedError'){
                throw new BadRequestException('Something went wrong', `name : ${error.message}`)
            }
            if(error instanceof HttpException){
                throw error;
            }
            throw new InternalServerErrorException('Cannot create Airport')
        }
        
    }
    async getAirports(): Promise<Airport[]> {
        try {
            const cities = await this.airportRepository.findAll();
            if(!cities){
                throw new NotFoundException('No data available for the Airports')
            }
            return cities;
        } catch (error) {
            if(error instanceof HttpException){
                throw error;
            }
            throw new InternalServerErrorException('Cannot fetch cities')
        }
    }

    async getAirportById(id: number) : Promise<Airport>{
        try {
            const airport = await this.airportRepository.findOneById(id);
            if(!airport){
                throw new NotFoundException(`Airport with ID: ${id} was not found`);
            }
            return airport;
        } catch (error) {
            if(error instanceof HttpException){
                throw error;
            }
            throw new InternalServerErrorException('Cannot fetch Airport with given ID')
        }
    }
    async deleteAirportById(id: number) : Promise<void>{
        try {
            const response =  await this.airportRepository.delete(id);
        } catch (error) {
            if(error instanceof NotFoundException) throw new NotFoundException('Cannot fetch Airport with given ID');
            else if(error instanceof HttpException){
                throw error;
            }
            throw new InternalServerErrorException('Cannot delete Airport with given ID')
        }
    }
    async updateAirport(id:number, data: UpdateAirportDto) : Promise<Airport>{
        try {
            const city = await this.cityRepository.findOneById(data.cityId);
            if(!city){
                throw new NotFoundException('No city with given ID');
            }
            const response = await this.airportRepository.update(id,{...data, city});
            return response;
        } catch (error) {
            if(error instanceof NotFoundException) throw new NotFoundException('Cannot fetch Airport with given ID');
            else if(error instanceof HttpException) throw error;
            throw new InternalServerErrorException('Cannot Update the Airport')
        }
    }
}

    