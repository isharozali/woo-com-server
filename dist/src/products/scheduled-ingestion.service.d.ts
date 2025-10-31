import { ProductsService } from './products.service';
export declare class ScheduledIngestionService {
    private readonly productsService;
    private readonly logger;
    constructor(productsService: ProductsService);
    handleHourlyIngestion(): Promise<void>;
    handleDailyIngestion(): Promise<void>;
    handleFiveMinuteIngestion(): Promise<void>;
    handleCustomIngestion(): Promise<void>;
}
