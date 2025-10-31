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
var ScheduledIngestionService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduledIngestionService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const products_service_1 = require("./products.service");
let ScheduledIngestionService = ScheduledIngestionService_1 = class ScheduledIngestionService {
    productsService;
    logger = new common_1.Logger(ScheduledIngestionService_1.name);
    constructor(productsService) {
        this.productsService = productsService;
    }
    async handleHourlyIngestion() {
        this.logger.log('Starting scheduled hourly product ingestion...');
        try {
            const result = await this.productsService.ingestProductsFromWooCommerce();
            this.logger.log(`Scheduled ingestion completed successfully:
        - Imported: ${result.imported} products
        - Updated: ${result.updated} products
        - Total processed: ${result.imported + result.updated} products`);
        }
        catch (error) {
            this.logger.error('Scheduled ingestion failed:', error.message);
        }
    }
    async handleDailyIngestion() {
        this.logger.log('Starting scheduled daily product ingestion...');
        try {
            const result = await this.productsService.ingestProductsFromWooCommerce();
            this.logger.log(`Daily scheduled ingestion completed successfully:
        - Imported: ${result.imported} products
        - Updated: ${result.updated} products
        - Total processed: ${result.imported + result.updated} products`);
        }
        catch (error) {
            this.logger.error('Daily scheduled ingestion failed:', error.message);
        }
    }
    async handleFiveMinuteIngestion() {
        this.logger.log('Starting 5-minute scheduled product ingestion...');
        console.log('ingesting 1 minute');
        try {
            const result = await this.productsService.ingestProductsFromWooCommerce();
            this.logger.log(`5-minute scheduled ingestion completed successfully:
        - Imported: ${result.imported} products
        - Updated: ${result.updated} products
        - Total processed: ${result.imported + result.updated} products`);
        }
        catch (error) {
            this.logger.error('5-minute scheduled ingestion failed:', error.message);
        }
    }
    async handleCustomIngestion() {
        this.logger.log('Starting custom scheduled product ingestion...');
        try {
            const result = await this.productsService.ingestProductsFromWooCommerce();
            this.logger.log(`Custom scheduled ingestion completed successfully:
        - Imported: ${result.imported} products
        - Updated: ${result.updated} products
        - Total processed: ${result.imported + result.updated} products`);
        }
        catch (error) {
            this.logger.error('Custom scheduled ingestion failed:', error.message);
        }
    }
};
exports.ScheduledIngestionService = ScheduledIngestionService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_HOUR),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ScheduledIngestionService.prototype, "handleHourlyIngestion", null);
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_MIDNIGHT),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ScheduledIngestionService.prototype, "handleDailyIngestion", null);
__decorate([
    (0, schedule_1.Cron)('*/5 * * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ScheduledIngestionService.prototype, "handleFiveMinuteIngestion", null);
__decorate([
    (0, schedule_1.Cron)(process.env.CRON_SCHEDULE || '0 */6 * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ScheduledIngestionService.prototype, "handleCustomIngestion", null);
exports.ScheduledIngestionService = ScheduledIngestionService = ScheduledIngestionService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [products_service_1.ProductsService])
], ScheduledIngestionService);
//# sourceMappingURL=scheduled-ingestion.service.js.map