import { Between, QueryRunner, Repository, UpdateResult } from "typeorm";
import { Flight } from "./flight.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseRepository } from "src/common/base.repository";
import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { response } from "express";

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

    async updateRemainingSeats(id:number, seats: number, dec: boolean = true) : Promise<Flight | null>{
        const queryRunner : QueryRunner = this.flightRepository.manager.connection.createQueryRunner();
        await queryRunner.startTransaction();
        try {
            await queryRunner.query('SELECT * FROM flight where flight.id = $1 FOR UPDATE', [id])
            let response;
            if(dec){
                response = await queryRunner.manager.createQueryBuilder().update(Flight).set({totalSeats: () => `"totalSeats"-:seats` }).where("id=:id", {seats,id}).execute();
            }
            else {
                response = queryRunner.manager.createQueryBuilder().update(Flight).set({totalSeats: () => `"totalSeats"+:seats` }).where("id=:id", {seats,id}).execute();
            }
            if(response.affected==0){
                throw new NotFoundException()
            }
            await queryRunner.commitTransaction();
            return this.findOneById(id);
        } catch (error) {
            await queryRunner.rollbackTransaction()
            console.log(error)
            throw new HttpException("Couldn't alter totalSeats",HttpStatus.INTERNAL_SERVER_ERROR)
        } finally{
            await queryRunner.release();
        }
    }
}