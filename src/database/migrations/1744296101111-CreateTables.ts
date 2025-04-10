import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1744296101111 implements MigrationInterface {
    name = 'CreateTables1744296101111'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "city" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_f8c0858628830a35f19efdc0ecf" UNIQUE ("name"), CONSTRAINT "PK_b222f51ce26f7e5ca86944a6739" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "airplane" ("id" SERIAL NOT NULL, "modelNumber" character varying NOT NULL, "capacity" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ed933274baeda55658b17b13b78" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "airplane"`);
        await queryRunner.query(`DROP TABLE "city"`);
    }

}
