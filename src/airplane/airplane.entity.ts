import { Flight } from "src/flight/flight.entity";
import { Seat } from "src/seat/seat.entity";
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

    @OneToMany(() => Seat, seat => seat.airplane)
    seats: Seat[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}