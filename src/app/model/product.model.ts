export class Product {
    productId: number;
    productCategory: string;
    productName: string;
    productDescription: string;
    units: number;
    edit?: boolean;

    constructor(productCategory, productName, productDescription, units) {
        this.productCategory = productCategory;
        this.productDescription = productDescription;
        this.productName = productName;
        this.units = units;
    }
}