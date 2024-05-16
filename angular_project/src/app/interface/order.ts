import { OrderDetails } from "./orderDetails";

export interface Order {
    id: number;
    totalPrice: number;
    tax: number;

    shipping: number;
    lastName: string,
    firstName:string,
    orderAddress1: string,
    orderAddress2: string,
    orderCity: string,
    orderState: string,
    zip: string,
    houseNo: string,
    phone: string,
    email: string,
    totalProductAmount: number,
    user: number,
    orderDetails: OrderDetails[]

}