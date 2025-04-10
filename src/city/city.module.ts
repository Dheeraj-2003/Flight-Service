import { Module } from '@nestjs/common';
import { CityController } from './city.controller';
import { CityService } from './city.service';
import { City } from './city.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityRepository } from './city.repository';

@Module({
  imports: [TypeOrmModule.forFeature([City])],
  controllers: [CityController],
  providers: [CityService, CityRepository]
})
export class CityModule {}
