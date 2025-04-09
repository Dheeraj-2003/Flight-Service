import { Repository } from "typeorm";
import { Airplane } from "./airplane.entity";
import { BaseRepository } from "src/common/base.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AirplaneRepository extends BaseRepository<Airplane> {
    constructor(@InjectRepository(Airplane) private readonly airplaneRepository: Repository<Airplane>) {
        super(airplaneRepository)
    }
}