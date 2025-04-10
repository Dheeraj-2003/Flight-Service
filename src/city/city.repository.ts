import { Repository } from "typeorm";
import { BaseRepository } from "src/common/base.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { City } from "./city.entity";

@Injectable()
export class CityRepository extends BaseRepository<City> {
    constructor(@InjectRepository(City) private readonly cityRepository: Repository<City>) {
        super(cityRepository)
    }
}