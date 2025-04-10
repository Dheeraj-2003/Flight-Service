import { HttpCode, HttpException, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { rmSync } from "fs";
import { number } from "joi";
import { NotFoundError } from "rxjs";
import { DeepPartial, DeleteResult, ObjectLiteral, Repository } from "typeorm";

export class BaseRepository<T extends ObjectLiteral> {
    constructor(protected readonly repo: Repository<T>) {}

    async findAll(): Promise<T[]>{
        return await this.repo.find();
    }

    async findOneById(id:number): Promise<T | null>{
        return await this.repo.findOne({
            where: {
                id:id
            } as any
        })
    }

    async create(data: Partial<T>): Promise<T>{
        const entity = this.repo.create(data as DeepPartial<T>);
        return await this.repo.save(entity);
    }

    async update(id: number, data: Partial<T>): Promise<T>{
        const response = await this.repo.update(id, data);
        const {affected} = response;
        if(affected == 0){
            throw new NotFoundException();
        }
        return this.findOneById(id) as Promise<T>;
    }

    async delete(id:number) : Promise<DeleteResult>{
        const response =  await this.repo.delete(id);
        const {affected} = response;
        if(affected == 0){
            throw new NotFoundException();
        }
        return response;
    }
}