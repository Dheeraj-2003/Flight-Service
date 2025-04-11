import { Flight } from "src/flight/flight.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Airplane{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    modelNumber:string;

    @Column()
    capacity: number;

    @OneToMany(() => Flight, flight => flight.airplane)
    flights: Flight[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}