import { IsNotEmpty, IsNumber, IsOptional, IsString, Length, Min } from "@nestjs/class-validator";
import { IsInt } from "class-validator";

export class CreateAirportDto{

    @IsString()
    @IsNotEmpty()
    name:string;

    @IsString()
    @IsNotEmpty()
    code:string;

    @IsString()
    @IsOptional()
    address:string;

    @IsInt()
    cityId:number
}