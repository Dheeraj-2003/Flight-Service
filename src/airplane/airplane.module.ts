import { Module } from '@nestjs/common';
import { AirplaneController } from './airplane.controller';
import { AirplaneService } from './airplane.service';
import { AirplaneRepository } from './airplane.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Airplane } from './airplane.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Airplane])],
  controllers: [AirplaneController],
  providers: [AirplaneService, AirplaneRepository]
})
export class AirplaneModule {}
