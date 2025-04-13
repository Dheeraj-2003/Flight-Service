import { Between, Repository } from "typeorm";
import { Flight } from "./flight.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseRepository } from "src/common/base.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class FlightRepository extends BaseRepository<Flight> {
    constructor(@InjectRepository(Flight) private readonly flightRepository: Repository<Flight>) {
        super(flightRepository)
    }

    async getFlightsByFilter(where : any, sort: any): Promise<Flight[]>{
        return this.flightRepository.find({
            where: where,
            order: sort,
            relations:{
                'airplane': true,
                'arrivalAirport': true,
                'departureAirport': true
            }
        });
    }
}