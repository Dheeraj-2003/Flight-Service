import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

@Entity()
export class City{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    name:string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}