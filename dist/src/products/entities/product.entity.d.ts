export declare class Product {
    id: number;
    title: string;
    price: number;
    stock_status: string;
    stock_quantity: number | null;
    category: string | null;
    tags: string[];
    on_sale: boolean;
    created_at: Date;
    updatedAt: Date;
}
