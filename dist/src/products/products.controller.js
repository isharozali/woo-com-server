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
exports.ProductsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const products_service_1 = require("./products.service");
const product_response_dto_1 = require("./dto/product-response.dto");
const ingest_response_dto_1 = require("./dto/ingest-response.dto");
const evaluate_dto_1 = require("./dto/evaluate.dto");
const evaluate_response_dto_1 = require("./dto/evaluate-response.dto");
let ProductsController = class ProductsController {
    productsService;
    constructor(productsService) {
        this.productsService = productsService;
    }
    async findAll() {
        const products = await this.productsService.findAll();
        return {
            products,
            count: products.length,
            message: 'Products fetched successfully',
        };
    }
    async ingestProducts() {
        const result = await this.productsService.ingestProductsFromWooCommerce();
        return {
            message: 'Products ingested successfully',
            imported: result.imported,
            updated: result.updated,
            total: result.imported + result.updated,
        };
    }
    getIngestionStatus() {
        return {
            scheduledJobs: [
                {
                    name: 'Hourly Ingestion',
                    schedule: '0 * * * *',
                    description: 'Runs every hour',
                },
                {
                    name: 'Daily Ingestion',
                    schedule: '0 0 * * *',
                    description: 'Runs daily at midnight',
                },
                {
                    name: 'Custom Ingestion',
                    schedule: process.env.CRON_SCHEDULE || '0 */6 * * *',
                    description: 'Custom schedule (configurable via CRON_SCHEDULE env var)',
                },
            ],
            environment: {
                cronSchedule: process.env.CRON_SCHEDULE || '0 */6 * * *',
                timezone: process.env.TZ || 'UTC',
            },
        };
    }
    async evaluateSegments(body) {
        if (!body.conditions) {
            return { error: 'Conditions are required' };
        }
        const products = await this.productsService.evaluateProducts(body.conditions);
        return {
            conditions: body.conditions,
            count: products.length,
            products,
        };
    }
};
exports.ProductsController = ProductsController;
__decorate([
    (0, common_1.Get)('products'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all products',
        description: 'Retrieves all products stored in the local database',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of all products',
        type: [product_response_dto_1.ProductResponseDto],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('products/ingest'),
    (0, swagger_1.ApiOperation)({
        summary: 'Ingest products from WooCommerce',
        description: 'Fetches all products from WooCommerce API and stores them in the local database. Updates existing products and imports new ones.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Products ingested successfully',
        type: ingest_response_dto_1.IngestResponseDto,
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Failed to fetch products from WooCommerce API',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "ingestProducts", null);
__decorate([
    (0, common_1.Get)('products/ingest/status'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get ingestion status',
        description: 'Returns information about the scheduled ingestion jobs and their configuration.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Ingestion status retrieved successfully',
        schema: {
            type: 'object',
            properties: {
                scheduledJobs: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            name: { type: 'string' },
                            schedule: { type: 'string' },
                            description: { type: 'string' },
                        },
                    },
                },
                environment: {
                    type: 'object',
                    properties: {
                        cronSchedule: { type: 'string' },
                        timezone: { type: 'string' },
                    },
                },
            },
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "getIngestionStatus", null);
__decorate([
    (0, common_1.Post)('evaluate'),
    (0, swagger_1.ApiOperation)({
        summary: 'Evaluate products',
        description: 'Filters products based on text conditions. Supports natural language filtering with keywords like "on sale", "in stock", price comparisons, category filters, and tag filters.',
    }),
    (0, swagger_1.ApiBody)({
        type: evaluate_dto_1.EvaluateDto,
        description: 'Text conditions for filtering products',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Filtered products based on conditions',
        type: evaluate_response_dto_1.EvaluateResponseDto,
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Invalid conditions provided',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [evaluate_dto_1.EvaluateDto]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "evaluateSegments", null);
exports.ProductsController = ProductsController = __decorate([
    (0, swagger_1.ApiTags)('products'),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [products_service_1.ProductsService])
], ProductsController);
//# sourceMappingURL=products.controller.js.map