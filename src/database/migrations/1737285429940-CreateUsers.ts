import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsers1737285429940 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          { name: 'id', type: 'int', isPrimary: true },
          { name: 'name', type: 'varchar' },
          { name: 'user_name', type: 'varchar' },
          { name: 'email', type: 'varchar' },
          { name: 'user_street', type: 'varchar' },
          { name: 'user_suite', type: 'varchar' },
          { name: 'user_city', type: 'varchar' },
          { name: 'user_zipcode', type: 'int' },
          { name: 'user_lat', type: 'decimal' },
          { name: 'user_lng', type: 'decimal' },
          { name: 'phone', type: 'varchar' },
          { name: 'website', type: 'varchar' },
          { name: 'company_name', type: 'varchar' },
          { name: 'company_catch_phrase', type: 'varchar' },
          { name: 'company_bs', type: 'varchar' },
          { name: 'is_active', type: 'boolean', default: true },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
