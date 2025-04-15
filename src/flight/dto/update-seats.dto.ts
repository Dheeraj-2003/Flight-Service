import { IsBoolean, IsDate, IsInt, IsNotEmpty, IsOptional } from "class-validator";

export class UpdateSeatsDto{

    @IsInt()
    @IsNotEmpty()
    seats:number;

    @IsOptional()
    @IsBoolean()
    dec:boolean;
}