"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
let Product = class Product {
    id;
    title;
    price;
    stock_status;
    stock_quantity;
    category;
    tags;
    on_sale;
    created_at;
    updatedAt;
};
exports.Product = Product;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Product ID from WooCommerce', example: 123 }),
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], Product.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Product title/name',
        example: 'Wireless Bluetooth Headphones',
    }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Product price', example: 99.99 }),
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Stock status',
        enum: ['instock', 'outofstock'],
        example: 'instock',
    }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "stock_status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Available stock quantity',
        example: 50,
        nullable: true,
    }),
    (0, typeorm_1.Column)('int', { nullable: true }),
    __metadata("design:type", Object)
], Product.prototype, "stock_quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Product category',
        example: 'Electronics',
        nullable: true,
    }),
    (0, typeorm_1.Column)('varchar', { nullable: true }),
    __metadata("design:type", Object)
], Product.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Product tags',
        example: ['wireless', 'bluetooth', 'audio'],
        type: [String],
    }),
    (0, typeorm_1.Column)('simple-array', { nullable: true }),
    __metadata("design:type", Array)
], Product.prototype, "tags", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Whether the product is on sale',
        example: false,
    }),
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Product.prototype, "on_sale", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Product creation date',
        example: '2024-01-15T10:30:00.000Z',
    }),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Product.prototype, "created_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Last update date',
        example: '2024-01-15T10:30:00.000Z',
    }),
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Product.prototype, "updatedAt", void 0);
exports.Product = Product = __decorate([
    (0, typeorm_1.Entity)('products')
], Product);
//# sourceMappingURL=product.entity.js.map