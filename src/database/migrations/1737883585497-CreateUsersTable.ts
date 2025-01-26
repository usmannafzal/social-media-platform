import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersTable1737883585497 implements MigrationInterface {
    name = 'CreateUsersTable1737883585497'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "user_name" character varying NOT NULL, "email" character varying NOT NULL, "user_street" character varying NOT NULL, "user_suite" character varying NOT NULL, "user_city" character varying NOT NULL, "user_zipcode" integer NOT NULL, "user_lat" integer NOT NULL, "user_lng" integer NOT NULL, "phone" character varying NOT NULL, "website" character varying NOT NULL, "company_name" character varying NOT NULL, "company_catch_phrase" character varying NOT NULL, "company_bs" character varying NOT NULL, "is_active" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
