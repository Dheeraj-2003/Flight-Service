import { Repository } from "typeorm";
import { Airport } from "./airport.entity";
import { BaseRepository } from "src/common/base.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AirportRepository extends BaseRepository<Airport> {
    constructor(@InjectRepository(Airport) private readonly airportRepository: Repository<Airport>) {
        super(airportRepository)
    }
    async existById(id:number): Promise<boolean>{
        return await this.airportRepository.exists({where:{id:id}});
    }
    async existByCode(code:string): Promise<boolean>{
        return await this.airportRepository.exists({where:{code:code}});
    }
    async findOneByCode(code:string): Promise<Airport | null>{
        return await this.repo.findOne({
            where: {
                code:code,
            },
        })
    }
    // async findOneById(id:number): Promise<Airport | null>{
    //     return await this.repo.findOne({
    //         where: {
    //             id:id,
    //         }, 
    //         relations: {
    //             'city': true
    //         } as any
    //     })
    // }
    // async findAll(): Promise<Airport[]>{
    //     return await this.repo.find(
    //         {
    //             relations: {
    //                 'city': true,
    //             }
    //         }
    //     );
    // }
}