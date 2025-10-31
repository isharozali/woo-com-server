import { ProductsService } from './products.service';
import { EvaluateDto } from './dto/evaluate.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    findAll(): Promise<{
        products: import("./entities/product.entity").Product[];
        count: number;
        message: string;
    }>;
    ingestProducts(): Promise<{
        message: string;
        imported: number;
        updated: number;
        total: number;
    }>;
    getIngestionStatus(): {
        scheduledJobs: {
            name: string;
            schedule: string;
            description: string;
        }[];
        environment: {
            cronSchedule: string;
            timezone: string;
        };
    };
    evaluateSegments(body: EvaluateDto): Promise<{
        error: string;
        conditions?: undefined;
        count?: undefined;
        products?: undefined;
    } | {
        conditions: string;
        count: number;
        products: import("./entities/product.entity").Product[];
        error?: undefined;
    }>;
}
