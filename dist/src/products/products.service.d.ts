import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { WooCommerceService } from './woocommerce.service';
export declare class ProductsService {
    private productRepository;
    private wooCommerceService;
    constructor(productRepository: Repository<Product>, wooCommerceService: WooCommerceService);
    findAll(): Promise<Product[]>;
    ingestProductsFromWooCommerce(): Promise<{
        imported: number;
        updated: number;
    }>;
    evaluateProducts(conditions: string): Promise<Product[]>;
}
