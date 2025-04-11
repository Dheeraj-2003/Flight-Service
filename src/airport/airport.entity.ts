import { City } from "src/city/city.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

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
    city:City

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}