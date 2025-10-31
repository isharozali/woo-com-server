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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("./entities/product.entity");
const woocommerce_service_1 = require("./woocommerce.service");
let ProductsService = class ProductsService {
    productRepository;
    wooCommerceService;
    constructor(productRepository, wooCommerceService) {
        this.productRepository = productRepository;
        this.wooCommerceService = wooCommerceService;
    }
    async findAll() {
        return await this.productRepository.find();
    }
    async ingestProductsFromWooCommerce() {
        try {
            const wooCommerceProducts = await this.wooCommerceService.fetchAllProducts();
            let imported = 0;
            let updated = 0;
            for (const wcProduct of wooCommerceProducts) {
                const productData = this.wooCommerceService.transformWooCommerceProduct(wcProduct);
                const existingProduct = await this.productRepository.findOne({
                    where: { id: productData.id },
                });
                if (existingProduct) {
                    await this.productRepository.update(productData.id, productData);
                    updated++;
                }
                else {
                    const product = this.productRepository.create(productData);
                    await this.productRepository.save(product);
                    imported++;
                }
            }
            return { imported, updated };
        }
        catch (error) {
            console.error('Error ingesting products:', error);
            throw new Error('Failed to ingest products from WooCommerce');
        }
    }
    async evaluateProducts(conditions) {
        const query = this.productRepository.createQueryBuilder('product');
        if (!conditions || typeof conditions !== 'string') {
            return await query.getMany();
        }
        const lines = conditions
            .split(/(?<=["'\w])\s+(?=[a-zA-Z_]+\s*[=<>!])/g)
            .map((line) => line.trim())
            .filter(Boolean);
        for (const line of lines) {
            const match = line.match(/^([a-zA-Z_]+)\s*(=|!=|>|<|>=|<=)\s*(.+)$/);
            if (!match)
                continue;
            const [, field, operator, rawValue] = match;
            const value = rawValue.trim().replace(/^["']|["']$/g, '');
            const isNumeric = !isNaN(Number(value));
            const column = field === 'price'
                ? `CAST(product.price AS NUMERIC)`
                : `product.${field}`;
            if (field === 'on_sale') {
                const boolVal = value === 'true';
                if (operator === '!=') {
                    query.andWhere(`${column} != :onSale`, { onSale: boolVal });
                }
                else {
                    query.andWhere(`${column} = :onSale`, { onSale: boolVal });
                }
                continue;
            }
            if (field === 'stock_status') {
                if (operator === '!=') {
                    query.andWhere(`${column} != :stockStatus`, { stockStatus: value });
                }
                else {
                    query.andWhere(`${column} = :stockStatus`, { stockStatus: value });
                }
                continue;
            }
            if (field === 'category') {
                if (operator === '!=') {
                    query.andWhere(`${column} NOT ILIKE :category`, {
                        category: `%${value}%`,
                    });
                }
                else {
                    query.andWhere(`${column} ILIKE :category`, {
                        category: `%${value}%`,
                    });
                }
                continue;
            }
            if (field === 'tags') {
                if (operator === '!=') {
                    query.andWhere(`${column} NOT ILIKE :tag`, { tag: `%${value}%` });
                }
                else {
                    query.andWhere(`${column} ILIKE :tag`, { tag: `%${value}%` });
                }
                continue;
            }
            if (isNumeric) {
                const numVal = Number(value);
                if (isNaN(numVal))
                    continue;
                query.andWhere(`${column} IS NOT NULL AND ${column} != 'NaN'`);
                query.andWhere(`${column} ${operator} :numVal`, { numVal });
            }
            else {
                if (operator === '!=') {
                    query.andWhere(`${column} NOT ILIKE :strVal`, {
                        strVal: `%${value}%`,
                    });
                }
                else {
                    query.andWhere(`${column} ILIKE :strVal`, { strVal: `%${value}%` });
                }
            }
        }
        return await query.getMany();
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        woocommerce_service_1.WooCommerceService])
], ProductsService);
//# sourceMappingURL=products.service.js.map