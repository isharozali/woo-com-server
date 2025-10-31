"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductsTable1700000000000 = void 0;
const typeorm_1 = require("typeorm");
class CreateProductsTable1700000000000 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'products',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                },
                {
                    name: 'title',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'price',
                    type: 'decimal',
                    precision: 10,
                    scale: 2,
                    isNullable: false,
                },
                {
                    name: 'stock_status',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'stock_quantity',
                    type: 'int',
                    isNullable: true,
                },
                {
                    name: 'category',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'tags',
                    type: 'text',
                    isNullable: true,
                },
                {
                    name: 'on_sale',
                    type: 'boolean',
                    default: false,
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'updatedAt',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                    onUpdate: 'CURRENT_TIMESTAMP',
                },
            ],
        }), true);
    }
    async down(queryRunner) {
        await queryRunner.dropTable('products');
    }
}
exports.CreateProductsTable1700000000000 = CreateProductsTable1700000000000;
//# sourceMappingURL=1700000000000-CreateProductsTable.js.map