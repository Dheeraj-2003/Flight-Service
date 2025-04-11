import { City } from "src/city/city.entity";
import { Flight } from "src/flight/flight.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Airport{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    name:string;

    @Column({unique: true})
    code:string;

    @Column({nullable: true})
    address:string;

    @ManyToOne(()=> City, city=> city.airports, {cascade: true, onDelete: 'CASCADE'})
    @JoinColumn({ name: 'cityId' })
    city:City;

    @Column()
    cityId: number;

    @OneToMany(()=> Flight, flight=> flight.departureAirport)
    departureFlights: Flight[];

    @OneToMany(()=> Flight, flight=> flight.arrivalAirport)
    arrivalFlights: Flight[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}