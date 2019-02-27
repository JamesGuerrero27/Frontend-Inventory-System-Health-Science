export class Product {
    options: string;
    code: string;
    name: string;
    brand: string;
    type: string;
    cost: number;
    provider: string;
    storage: string;
}

export interface State {
    flag: string;
    name: string;
    population: string;
}

export interface Brand {
    productBrandId: number;
    productBrandName: string;
    //product2s: string;
}