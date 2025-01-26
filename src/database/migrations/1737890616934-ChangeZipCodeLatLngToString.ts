import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeZipCodeLatLngToString1737890616934
  implements MigrationInterface
{
  name = 'ChangeZipCodeLatLngToString1737890616934';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "user_zipcode" TYPE character varying USING "user_zipcode"::character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "user_lat" TYPE character varying USING "user_lat"::character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "user_lng" TYPE character varying USING "user_lng"::character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "user_lng" TYPE integer USING "user_lng"::integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "user_lat" TYPE integer USING "user_lat"::integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "user_zipcode" TYPE integer USING "user_zipcode"::integer`,
    );
  }
}
