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
exports.WooCommerceService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
let WooCommerceService = class WooCommerceService {
    httpService;
    configService;
    baseUrl;
    consumerKey;
    consumerSecret;
    constructor(httpService, configService) {
        this.httpService = httpService;
        this.configService = configService;
        this.baseUrl = this.configService.get('WOOCOMMERCE_BASE_URL', 'https://wp-multisite.convertcart.com');
        this.consumerKey = this.configService.get('WOOCOMMERCE_CONSUMER_KEY', 'ck_af82ae325fbee1c13f31eb26148f4dea473b0f77');
        this.consumerSecret = this.configService.get('WOOCOMMERCE_CONSUMER_SECRET', 'cs_2d8cc467c5b91a80f5ed18dd3c282ee8299c9445');
    }
    async fetchProducts(page = 1, perPage = 100) {
        try {
            const url = `${this.baseUrl}/wp-json/wc/v3/products`;
            const params = {
                consumer_key: this.consumerKey,
                consumer_secret: this.consumerSecret,
                page,
                per_page: perPage,
            };
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(url, { params }));
            return response.data;
        }
        catch (error) {
            console.error('Error fetching products from WooCommerce:', error);
            throw new Error('Failed to fetch products from WooCommerce API');
        }
    }
    async fetchAllProducts() {
        const allProducts = [];
        let page = 1;
        let hasMore = true;
        while (hasMore) {
            const products = await this.fetchProducts(page, 100);
            allProducts.push(...products);
            hasMore = products.length === 100;
            page++;
        }
        return allProducts;
    }
    transformWooCommerceProduct(wcProduct) {
        return {
            id: wcProduct.id,
            title: wcProduct.name,
            price: parseFloat(wcProduct.price),
            stock_status: wcProduct.stock_status,
            stock_quantity: wcProduct.stock_quantity,
            category: wcProduct.categories.length > 0 ? wcProduct.categories[0].name : null,
            tags: wcProduct.tags.map((tag) => tag.name),
            on_sale: wcProduct.on_sale,
            created_at: new Date(wcProduct.date_created),
        };
    }
};
exports.WooCommerceService = WooCommerceService;
exports.WooCommerceService = WooCommerceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        config_1.ConfigService])
], WooCommerceService);
//# sourceMappingURL=woocommerce.service.js.map