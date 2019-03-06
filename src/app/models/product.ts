export class Product {
    options: string;
    productCode: string;
    productName: string;
    productBrandId: string;
    typeProductId: string;
    productCost: number;
    providersId: string;
    storageId: string;
}

export interface Brand {
    productBrandId: number;
    productBrandName: string;
    product2s: string;
}
