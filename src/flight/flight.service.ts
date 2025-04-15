import { BadRequestException, HttpException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { FlightRepository } from './flight.repository';
import { Flight } from './flight.entity';
import { AirplaneRepository } from 'src/airplane/airplane.repository';
import { AirportRepository } from 'src/airport/airport.repository';
import { CreateFlightDto } from './dto/create-flight.dto';
import { QueryFlightDto } from './dto/query-flight.dto';
import { isEmpty } from 'class-validator';
import { Between, MoreThanOrEqual } from 'typeorm';
import { string } from 'joi';
import { UpdateSeatsDto } from './dto/update-seats.dto';

@Injectable()
export class FlightService {
    constructor(private readonly flightRepository: FlightRepository, private readonly airplaneRepository: AirplaneRepository, private readonly airportRepository: AirportRepository){}
    
    async createFlight(data: CreateFlightDto){
        try {
            const airplane = await this.airplaneRepository.findOneById(data.airplaneId);
            if(!airplane){
                throw new NotFoundException('No airplane with given ID');
            }
            const departureAirport = await this.airportRepository.findOneByCode(data.departureAirportCode);
            if(!departureAirport){
                throw new NotFoundException('No Airport with given departureAirportCode');
            }
            const arrivalAirport = await this.airportRepository.findOneByCode(data.arrivalAirportCode);
            if(!arrivalAirport){
                throw new NotFoundException('No Airport with given arrivalAirportCode');
            }
            return await this.flightRepository.create({...data, airplane, departureAirport, arrivalAirport});
        } catch (error) {
            if(error.name == 'QueryFailedError'){
                throw new BadRequestException('Something went wrong', `name : ${error.message}`)
            }
            if(error instanceof HttpException){
                throw error;
            }
            throw new InternalServerErrorException('Cannot create Flight')
        }
        
    }
    async getFlights(query: QueryFlightDto): Promise<Flight[]> {
        const filter:any = {};
        let sortFilter:any = {};
        if(query.trips){
            [filter.departureAirportCode, filter.arrivalAirportCode] = query.trips.split('-');
            if(filter.departureAirportCode === filter.arrivalAirportCode){
                throw new BadRequestException('Select different departure and arrival airports');
            }
        }
        if(query.price){
            let minPrice: string, maxPrice: string;
            [minPrice, maxPrice] = query.price.split('-');
            filter.price = Between(Number(minPrice), Number(maxPrice === undefined ? 20000 : maxPrice));
        }
        if(query.tripDate){
            const oneDay: number = 24*60*60*1000;
            filter.departureTime = Between(query.tripDate,new Date(query.tripDate.getTime()+oneDay));
        }
        if(query.sort){
            sortFilter = query.sort.split(',').reduce((map,it)=>{
                const [key,value] = it.split('_');
                map[key] = value;
                return map;
            },{});
            console.log(sortFilter);
        }
        try {
            const flights = await this.flightRepository.getFlightsByFilter(filter, sortFilter);
            if(!flights){
                throw new NotFoundException('No data available for the Flights')
            }
            return flights;
        } catch (error) {
            if(error instanceof HttpException){
                throw error;
            }
            throw new InternalServerErrorException('Cannot fetch flights')
        }
    }

    async getFlightById(id: number) : Promise<Flight>{
        try {
            const flight = await this.flightRepository.findOneById(id);
            if(!flight){
                throw new NotFoundException(`Flight with ID: ${id} was not found`);
            }
            return flight;
        } catch (error) {
            if(error instanceof HttpException){
                throw error;
            }
            throw new InternalServerErrorException('Cannot fetch Flight with given ID')
        }
    }
    async updateTotalSeats(id:number,updateSeatsDto: UpdateSeatsDto): Promise<Flight | null>{
        try {
            const response =  await this.flightRepository.updateRemainingSeats(id,updateSeatsDto.seats, updateSeatsDto.dec);
            return response;
        } catch (error) {
            if(error instanceof NotFoundException) throw new NotFoundException('Cannot fetch Flight with given ID');
            else if(error instanceof HttpException){
                throw error;
            }
            throw new InternalServerErrorException('Cannot update seats for flight with given ID')
        }
    }
    async deleteFlightById(id: number) : Promise<void>{
        try {
            const response =  await this.flightRepository.delete(id);
        } catch (error) {
            if(error instanceof NotFoundException) throw new NotFoundException('Cannot fetch Flight with given ID');
            else if(error instanceof HttpException){
                throw error;
            }
            throw new InternalServerErrorException('Cannot delete Flight with given ID')
        }
    }
}
