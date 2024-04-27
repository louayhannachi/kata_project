import { IProduct } from "../../product/models/product";

export interface ICartItem {
    product: IProduct;
    purchasedQuantity: number;
    taxe: number,
    priceHT: number,
    priceTTC: number,
}
