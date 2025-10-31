import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { Product } from './entities/product.entity';
interface WooCommerceProduct {
    id: number;
    name: string;
    price: string;
    stock_status: string;
    stock_quantity: number | null;
    categories: Array<{
        name: string;
    }>;
    tags: Array<{
        name: string;
    }>;
    on_sale: boolean;
    date_created: string;
}
export declare class WooCommerceService {
    private readonly httpService;
    private readonly configService;
    private readonly baseUrl;
    private readonly consumerKey;
    private readonly consumerSecret;
    constructor(httpService: HttpService, configService: ConfigService);
    fetchProducts(page?: number, perPage?: number): Promise<WooCommerceProduct[]>;
    fetchAllProducts(): Promise<WooCommerceProduct[]>;
    transformWooCommerceProduct(wcProduct: WooCommerceProduct): Partial<Product>;
}
export {};
