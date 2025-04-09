import { number } from "joi";
import { DeepPartial, ObjectLiteral, Repository } from "typeorm";

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
        await this.repo.update(id, data);
        return this.findOneById(id) as Promise<T>;
    }

    async delete(id:number): Promise<void>{
        await this.repo.delete(id);
    }
}