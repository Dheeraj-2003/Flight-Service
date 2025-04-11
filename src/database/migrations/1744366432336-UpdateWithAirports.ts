import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateWithAirports1744366432336 implements MigrationInterface {
    name = 'UpdateWithAirports1744366432336'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "airport" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "code" character varying NOT NULL, "address" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "cityId" integer, CONSTRAINT "UQ_1828553326d4572d48723eb7476" UNIQUE ("name"), CONSTRAINT "UQ_9349a68ba662b31e1070f45e992" UNIQUE ("code"), CONSTRAINT "PK_ea1ecba8dec9bee0cb60194e788" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "airport" ADD CONSTRAINT "FK_b9f671939f5db31e0edd2b171a9" FOREIGN KEY ("cityId") REFERENCES "city"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "airport" DROP CONSTRAINT "FK_b9f671939f5db31e0edd2b171a9"`);
        await queryRunner.query(`DROP TABLE "airport"`);
    }

}

