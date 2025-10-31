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
exports.ProductResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class ProductResponseDto {
    id;
    title;
    price;
    stock_status;
    stock_quantity;
    category;
    tags;
    on_sale;
    created_at;
}
exports.ProductResponseDto = ProductResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Product ID from WooCommerce',
        example: 123,
    }),
    __metadata("design:type", Number)
], ProductResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Product title/name',
        example: 'Wireless Bluetooth Headphones',
    }),
    __metadata("design:type", String)
], ProductResponseDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Product price',
        example: 99.99,
    }),
    __metadata("design:type", Number)
], ProductResponseDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Stock status',
        enum: ['instock', 'outofstock'],
        example: 'instock',
    }),
    __metadata("design:type", String)
], ProductResponseDto.prototype, "stock_status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Available stock quantity',
        example: 50,
        nullable: true,
    }),
    __metadata("design:type", Object)
], ProductResponseDto.prototype, "stock_quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Product category',
        example: 'Electronics',
        nullable: true,
    }),
    __metadata("design:type", Object)
], ProductResponseDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Product tags',
        example: ['wireless', 'bluetooth', 'audio'],
        type: [String],
    }),
    __metadata("design:type", Array)
], ProductResponseDto.prototype, "tags", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Whether the product is on sale',
        example: false,
    }),
    __metadata("design:type", Boolean)
], ProductResponseDto.prototype, "on_sale", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Product creation date',
        example: '2024-01-15T10:30:00.000Z',
    }),
    __metadata("design:type", Date)
], ProductResponseDto.prototype, "created_at", void 0);
//# sourceMappingURL=product-response.dto.js.map