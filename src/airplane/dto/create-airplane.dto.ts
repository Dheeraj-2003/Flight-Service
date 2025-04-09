import { IsNotEmpty, IsNumber, IsString, Length, Min } from "@nestjs/class-validator";

export class CreateAirplaneDto{

    @IsString()
    @IsNotEmpty()
    @Length(1,20)
    modelNumber:string;

    @IsNumber()
    @Min(0)
    capacity: number;
}