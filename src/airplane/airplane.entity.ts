import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Airplane{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    modelNumber:string;

    @Column()
    capacity: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}