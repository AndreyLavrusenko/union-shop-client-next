import type { NextApiRequest, NextApiResponse } from 'next'
import {pool} from '@/config/db'
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";

type Data = {
    result?: any
    message?: string,
    resultCode?: number
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    try {
        const user = await getServerSession(req, res, authOptions)

        const authHeader = user?.user?.id ?? ''

        if (authHeader) {

            const sql = "SELECT * FROM cart WHERE userId = ?"
            const data = [authHeader]
            // @ts-ignore
            function getItemCountFromAllProducts(arr: any[], callback: any) {
                const resultArray: any[] = [];
                let pending = arr.length;
                const sql2 = "SELECT * FROM all_products WHERE id = ?"

                for (let i = 0; i < pending; i++) {
                    const data2 = [arr[i].allProductId];

                    pool.query(sql2, data2, (error, result: any) => {
                        if (error) return res.status(400).json({message: "Products not found", resultCode: 1})

                        resultArray.push(...result)
                        if (0 === --pending) {
                            callback(resultArray)
                        }
                    })
                }
            }

            pool.query(sql, data, (error, result: any) => {
                if (error) return res.status(400).json({message: "Products not found", resultCode: 1})

                if (result.length === 0) {
                    return res.json({resultCode: 1})
                } else {
                    // @ts-ignore
                    getItemCountFromAllProducts(result, function (resultArray) {

                        result.forEach((result: any, i: number) => {
                            resultArray.forEach((item: any, j: number) => {
                                if (result.allProductId === item.id) {
                                    result.count = item.count
                                }
                            })
                        })

                        // @ts-ignore
                        return res.status(200).json([...result])
                    })
                }
            })

        } else {
            return res.status(501).json({resultCode: 1})
        }

    } catch (err) {
        return res.status(500).json({message: "Что-то пошло не так"})
    }
}


export const config = {
    api: {
        externalResolver: true,
    },
}