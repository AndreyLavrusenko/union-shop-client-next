import {IProductInfo} from "@/models/IProductInfo";

export interface IStatusResult {
    deliveryPrice: number
    id: number
    myOrder: string
    sale: number
    status: string
    total: number
    trackNumber: string | number
    userInfo: string
}

export interface IStatus {
    arr: IProductInfo[]
    result: IStatusResult[]
}