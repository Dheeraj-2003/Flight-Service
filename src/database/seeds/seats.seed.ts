// src/database/seed.ts
import { AppDataSource } from '../../config/typeorm-migrations.config';
import { Seat } from "../../seat/seat.entity";

async function seedSeats() {
  await AppDataSource.initialize();
  const seatRepo = AppDataSource.getRepository(Seat);

  const seats: Partial<Seat>[] = [];

  seats.push({
    airplaneId: 1,
    row: 1,
    col:'A',
  }),
  seats.push({
    airplaneId: 1,
    row: 1,
    col:'B',
  }),
  seats.push({
    airplaneId: 1,
    row: 1,
    col:'C',
  }),
  seats.push({
    airplaneId: 1,
    row: 1,
    col:'D',
  }),
  seats.push({
    airplaneId: 1,
    row: 2,
    col:'A',
  }),
  seats.push({
    airplaneId: 1,
    row: 2,
    col:'B',
  }),
  seats.push({
    airplaneId: 1,
    row: 2,
    col:'C',
  }),
  seats.push({
    airplaneId: 1,
    row: 2,
    col:'D',
  }),
  await seatRepo.save(seats);
  console.log('Seats seeded successfully');

  await AppDataSource.destroy();
}

seedSeats().catch((err) => {
  console.error('Error seeding seats:', err);
  process.exit(1);
});
