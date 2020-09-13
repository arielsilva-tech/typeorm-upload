import {MigrationInterface, QueryRunner, TableForeignKey} from "typeorm";

export class CreateConstrantes1599917494507 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
              await queryRunner.createForeignKey(
                'transactions',
                new TableForeignKey({
                  name: 'TransactionCategoryFK',
                  columnNames: ['category_id'],
                  referencedColumnNames: ['id'],
                  referencedTableName: 'categories',
                  onDelete: 'SET NULL',
                  onUpdate: 'CASCADE',
                }),
              );
            }
          
            public async down(queryRunner: QueryRunner): Promise<void> {
            //  await queryRunner.dropForeignKey('transactions', 'TransactionCategoryFK');
            }

}
