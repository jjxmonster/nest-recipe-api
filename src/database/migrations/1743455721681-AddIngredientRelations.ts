import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddIngredientRelations1743455721681 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'ingredient',
      new TableColumn({
        name: 'productId',
        type: 'int',
        isNullable: true,
      }),
    );

    await queryRunner.addColumn(
      'ingredient',
      new TableColumn({
        name: 'dishId',
        type: 'int',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'ingredient',
      new TableForeignKey({
        columnNames: ['productId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'product',
        onDelete: 'CASCADE',
        name: 'FK_ingredient_product',
      }),
    );

    await queryRunner.createForeignKey(
      'ingredient',
      new TableForeignKey({
        columnNames: ['dishId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'dish',
        name: 'FK_ingredient_dish',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('ingredient', 'FK_ingredient_dish');
    await queryRunner.dropForeignKey('ingredient', 'FK_ingredient_product');

    await queryRunner.dropColumn('ingredient', 'dishId');
    await queryRunner.dropColumn('ingredient', 'productId');
  }
}
