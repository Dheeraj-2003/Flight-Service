import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSeats1744543421532 implements MigrationInterface {
    name = 'AddSeats1744543421532'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."seat_type_enum" AS ENUM('ECONOMY', 'BUSINESS', 'FIRST')`);
        await queryRunner.query(`CREATE TABLE "seat" ("id" SERIAL NOT NULL, "row" integer NOT NULL, "col" character varying NOT NULL, "airplaneId" integer NOT NULL, "type" "public"."seat_type_enum" NOT NULL DEFAULT 'ECONOMY', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_4e72ae40c3fbd7711ccb380ac17" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "seat" ADD CONSTRAINT "FK_16983c18594351b9510ba598b65" FOREIGN KEY ("airplaneId") REFERENCES "airplane"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "seat" DROP CONSTRAINT "FK_16983c18594351b9510ba598b65"`);
        await queryRunner.query(`DROP TABLE "seat"`);
        await queryRunner.query(`DROP TYPE "public"."seat_type_enum"`);
    }

}
