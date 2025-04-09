import { Injectable } from '@nestjs/common';
import { AirplaneRepository } from './airplane.repository';
import { Airplane } from './airplane.entity';

@Injectable()
export class AirplaneService {
    constructor(private readonly airplaneRepository: AirplaneRepository){}

    async createAirplane(data: Airplane){
        return await this.airplaneRepository.create(data);
    }
    
}
