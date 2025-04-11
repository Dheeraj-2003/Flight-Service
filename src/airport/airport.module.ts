import { Module } from '@nestjs/common';
import { AirportController } from './airport.controller';
import { AirportService } from './airport.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Airport } from './airport.entity';
import { City } from 'src/city/city.entity';
import { CityService } from 'src/city/city.service';
import { CityRepository } from 'src/city/city.repository';
import { AirportRepository } from './airport.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Airport, City])],
  controllers: [AirportController],
  providers: [AirportService, CityRepository, AirportRepository]
})
export class AirportModule {}
