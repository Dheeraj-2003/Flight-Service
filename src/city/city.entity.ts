import { Airport } from "src/airport/airport.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

@Entity()
export class City{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    name:string;

    @CreateDateColumn()
    created_at: Date;

    @OneToMany(()=> Airport, airport=> airport.city)
    airports: Airport[]

    @UpdateDateColumn()
    updated_at: Date;
}