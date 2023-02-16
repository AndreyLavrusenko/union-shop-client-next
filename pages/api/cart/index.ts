import type { NextApiRequest, NextApiResponse } from 'next'
import {pool} from '@/config/db'


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    if (req.method === 'POST') {

        try {

            const authHeader = req.headers.userid

            if (authHeader) {

                const sql_select = "SELECT * FROM cart WHERE userId = ?";
                const data_select = [authHeader]

                // Получаю всю карзину и если такой товар уже есть обновляю его количество
                pool.query(sql_select, data_select, (error, result) => {

                    const sql_search_in_cart = "SELECT * FROM cart WHERE productName = ? AND size = ? AND color = ? AND userId = ?"
                    const data_search_in_cart = [req.body.name, req.body.size, req.body.color, authHeader]

                    pool.query(sql_search_in_cart, data_search_in_cart, (error, result: any) => {
                        // Если такого товара еще нет в козине
                        if (result.length === 0) {
                            // Получаю id товара в таблице all_products
                            const sql_search = "SELECT id, uniqCode FROM all_products WHERE title_product = ? AND size = ? AND color = ?"
                            const data_search = [req.body.name, req.body.size, req.body.color]

                            // Добавляю товар в корзину с его уникальным id из другой таблицы
                            pool.query(sql_search, data_search, (error, result) => {
                                if (error) return res.status(400).json({message: "Products not found 1", resultCode: 1, error})

                                // @ts-ignore
                                const product_all_id = result[0].id
                                // @ts-ignore
                                const product_all_uniq = result[0].uniqCode


                                const sql = "INSERT INTO cart (userId, uniqCode, productId, allProductId, productName, price, color, size, quantity) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1)"
                                const data = [authHeader, product_all_uniq, req.body.id, product_all_id, req.body.name, req.body.price, req.body.color, req.body.size]

                                pool.query(sql, data, (error, result) => {
                                    if (error) return res.status(400).json({message: "Products not found 2", resultCode: 1, error})

                                    return res.status(201).json({resultCode: 0})
                                })
                            })
                        } else {
                            // Если в таблице есть такой товар, то увеличиваем счетчик на 1
                            const sql_update = "UPDATE cart SET quantity = quantity + 1 WHERE productName = ? AND size = ? AND color = ? AND userId = ?"
                            const data_update = [req.body.name, req.body.size, req.body.color, authHeader]

                            pool.query(sql_update, data_update, (error, result) => {
                                if (error) return res.status(400).json({message: "Products not found 3", resultCode: 1, error})

                                return res.status(201).json({resultCode: 0})
                            })
                        }
                    })

                })

            } else {
                return res.status(500).json({resultCode: 1})
            }

        } catch (err) {
            return res.status(500).json({message: "Что-то пошло не так"})
        }

    }

}


export const config = {
    api: {
        externalResolver: true,
    },
}