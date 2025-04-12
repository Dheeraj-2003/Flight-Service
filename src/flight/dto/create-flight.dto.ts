import { IsNotEmpty } from '@nestjs/class-validator';
import { Type } from 'class-transformer';
import { IsString, IsNumber, IsDateString, IsDate } from 'class-validator';

export class CreateFlightDto {
  @IsString()
  @IsNotEmpty()
  flightNumber: string;

  @IsNumber()
  @IsNotEmpty()
  airplaneId: number;

  @IsString()
  @IsNotEmpty()
  departureAirportCode: string;

  @IsString()
  @IsNotEmpty()
  arrivalAirportCode: string;

  @Type(()=> Date)
  @IsDate()
  @IsNotEmpty()
  departureTime: Date;

  @Type(()=> Date)
  @IsDate()
  @IsNotEmpty()
  arrivalTime: Date;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  boardingGate: string;

  @IsNumber()
  @IsNotEmpty()
  totalSeats: number;
}
