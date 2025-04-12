import { Module } from '@nestjs/common';
import { FlightController } from './flight.controller';
import { FlightService } from './flight.service';
import { FlightRepository } from './flight.repository';
import { Airplane } from 'src/airplane/airplane.entity';
import { Airport } from 'src/airport/airport.entity';
import { Flight } from './flight.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AirportRepository } from 'src/airport/airport.repository';
import { AirplaneRepository } from 'src/airplane/airplane.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Flight,Airport, Airplane])],
  controllers: [FlightController],
  providers: [FlightService, FlightRepository, AirportRepository, AirplaneRepository]
})
export class FlightModule {}
