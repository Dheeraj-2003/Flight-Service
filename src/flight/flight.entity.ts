import { Airplane } from "src/airplane/airplane.entity";
import { Airport } from "src/airport/airport.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
} from "typeorm";

@Entity()
export class Flight {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  flightNumber: string;

  @ManyToOne(() => Airplane,airplane => airplane.flights, {cascade: true, onDelete: 'CASCADE'})
  @JoinColumn({ name: 'airplaneId'})
  airplane: Airplane;

  @Column()
  airplaneId: number;

  @ManyToOne(() => Airport, airport=> airport.departureFlights, {cascade: true, onDelete: 'CASCADE'})
  @JoinColumn({ name: 'departureAirportCode', referencedColumnName: 'code' })
  departureAirport: Airport;

  @Column()
  departureAirportCode: string;

  @ManyToOne(() => Airport,airport=> airport.arrivalFlights, {cascade: true, onDelete: 'CASCADE'})
  @JoinColumn({ name: 'arrivalAirportCode', referencedColumnName: 'code'})
  arrivalAirport: Airport;

  @Column()
  arrivalAirportCode: string;

  @Column()
  arrivalTime: Date;

  @Column()
  departureTime: Date;

  @Column()
  price: number;

  @Column()
  boardingGate: string;

  @Column()
  totalSeats: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
