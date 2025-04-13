import { IsString } from "@nestjs/class-validator";
import { Type } from "class-transformer";
import { IsDate, IsOptional } from "class-validator";

export class QueryFlightDto{
    @IsOptional()
    @IsString()
    trips:string;

    @IsOptional()
    @IsString()
    price:string;

    @IsOptional()
    @IsDate()
    @Type(()=> Date)
    tripDate:Date;

    @IsOptional()
    @IsString()
    sort:string;
}