import { Airplane } from "../airplane/airplane.entity";
import { SEAT_TYPE } from "../common/enum";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Seat{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    row:number;

    @Column()
    col:string;

    @ManyToOne(()=> Airplane, airplane=> airplane.seats, {cascade: true, onDelete: 'CASCADE'})
    @JoinColumn({ name: 'airplaneId' })
    airplane:Airplane;

    @Column()
    airplaneId: number;

    @Column({
        type: 'enum',
        enum: SEAT_TYPE,
        default: SEAT_TYPE.ECONOMY,
    })
    type: SEAT_TYPE;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}