import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './config/logger.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmAsyncConfig } from './config/typeorm.config';
import { AirplaneModule } from './airplane/airplane.module';
import { CityModule } from './city/city.module';
import { AirportModule } from './airport/airport.module';
import { FlightModule } from './flight/flight.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    WinstonModule.forRoot(winstonConfig),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    AirplaneModule,
    CityModule,
    AirportModule,
    FlightModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
