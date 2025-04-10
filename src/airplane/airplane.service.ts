import { HttpCode, HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { AirplaneRepository } from './airplane.repository';
import { Airplane } from './airplane.entity';

@Injectable()
export class AirplaneService {
    constructor(private readonly airplaneRepository: AirplaneRepository){}

    async createAirplane(data: Airplane){
        return await this.airplaneRepository.create(data);
    }
    
    async getAirplanes(): Promise<Airplane[]> {
        try {
            const airplanes = await this.airplaneRepository.findAll();
            if(!airplanes){
                throw new NotFoundException('No data available for the Airplanes')
            }
            return airplanes;
        } catch (error) {
            if(error instanceof HttpException){
                throw error;
            }
            throw new InternalServerErrorException('Cannot fetch airplanes')
        }
    }

    async getAirplaneById(id: number) : Promise<Airplane>{
        try {
            const airplane = await this.airplaneRepository.findOneById(id);
            if(!airplane){
                throw new NotFoundException(`Airplane with ID: ${id} was not found`);
            }
            return airplane;
        } catch (error) {
            if(error instanceof HttpException){
                throw error;
            }
            throw new InternalServerErrorException('Cannot fetch Airplane with given ID')
        }
    }
    async deleteAirplaneById(id: number) : Promise<void>{
        try {
            const response =  await this.airplaneRepository.delete(id);
        } catch (error) {
            if(error instanceof NotFoundException) throw new NotFoundException('Cannot fetch Airplane with given ID');
            else if(error instanceof HttpException){
                throw error;
            }
            throw new InternalServerErrorException('Cannot delete Airplane with given ID')
        }
    }
    async updateAirplane(id:number, data: Partial<Airplane>) : Promise<Airplane>{
        try {
            const response = await this.airplaneRepository.update(id,data);
            console.log(response);
            return response;
        } catch (error) {
            if(error instanceof NotFoundException) throw new NotFoundException('Cannot fetch Airplane with given ID');
            else if(error instanceof HttpException) throw error;
            throw new InternalServerErrorException('Cannot Update the Airplane')
        }
    }
}
