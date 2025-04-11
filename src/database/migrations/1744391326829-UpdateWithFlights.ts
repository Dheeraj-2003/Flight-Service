import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateWithFlights1744391326829 implements MigrationInterface {
    name = 'UpdateWithFlights1744391326829'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "flight" ("id" SERIAL NOT NULL, "flightNumber" character varying NOT NULL, "airplaneId" integer NOT NULL, "departureAirportCode" character varying NOT NULL, "arrivalAirportCode" character varying NOT NULL, "arrivalTime" TIMESTAMP NOT NULL, "departureTime" TIMESTAMP NOT NULL, "price" integer NOT NULL, "boardingGate" character varying NOT NULL, "totalSeats" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_f3e21c00ba40ed321afed8dc1e1" UNIQUE ("flightNumber"), CONSTRAINT "PK_bf571ce6731cf071fc51b94df03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "airport" DROP CONSTRAINT "FK_b9f671939f5db31e0edd2b171a9"`);
        await queryRunner.query(`ALTER TABLE "airport" ALTER COLUMN "cityId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "flight" ADD CONSTRAINT "FK_4536914081408ed9a36062b6833" FOREIGN KEY ("airplaneId") REFERENCES "airplane"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "flight" ADD CONSTRAINT "FK_8e36cb4a91d42a205d79b5e8457" FOREIGN KEY ("departureAirportCode") REFERENCES "airport"("code") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "flight" ADD CONSTRAINT "FK_dd13cce65189f5394e4e6fa017c" FOREIGN KEY ("arrivalAirportCode") REFERENCES "airport"("code") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "airport" ADD CONSTRAINT "FK_b9f671939f5db31e0edd2b171a9" FOREIGN KEY ("cityId") REFERENCES "city"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "airport" DROP CONSTRAINT "FK_b9f671939f5db31e0edd2b171a9"`);
        await queryRunner.query(`ALTER TABLE "flight" DROP CONSTRAINT "FK_dd13cce65189f5394e4e6fa017c"`);
        await queryRunner.query(`ALTER TABLE "flight" DROP CONSTRAINT "FK_8e36cb4a91d42a205d79b5e8457"`);
        await queryRunner.query(`ALTER TABLE "flight" DROP CONSTRAINT "FK_4536914081408ed9a36062b6833"`);
        await queryRunner.query(`ALTER TABLE "airport" ALTER COLUMN "cityId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "airport" ADD CONSTRAINT "FK_b9f671939f5db31e0edd2b171a9" FOREIGN KEY ("cityId") REFERENCES "city"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`DROP TABLE "flight"`);
    }

}
