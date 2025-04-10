import { IsNotEmpty, IsNumber, IsString, Length, Min } from "@nestjs/class-validator";

export class CreateCityDto{

    @IsString()
    @IsNotEmpty()
    @Length(1,50)
    name:string;
}