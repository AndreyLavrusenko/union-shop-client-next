import type { NextApiRequest, NextApiResponse } from 'next'
import {pool} from '@/config/db'


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const limit = 10; // Количетсво товаров на одной странице

        const sql = `SELECT COUNT(*) FROM product WHERE isVisible = 1`;

        pool.query(sql, (error, result) => {
            if (error) return res.status(400).json({message: "Products not found 0", error, resultCode: 1})

            const qCategory = req.query.category
            const search = req.query.search

            if (qCategory !== 'all' && search) {
                let replacement = `'%${search}%'`;
                const sqlCategorySearch = `SELECT COUNT(*) FROM product WHERE isVisible = 1 AND category_type = ? AND title LIKE ${replacement}`;
                const dataCategorySearch = [qCategory]

                pool.query(sqlCategorySearch, dataCategorySearch, (error, result) => {
                    if (error) return res.status(400).json({message: "Products not found 0", error, resultCode: 1})

                    //@ts-ignore
                    const page = parseInt(req.query.page) || 0;
                    const offset = limit * page
                    //@ts-ignore
                    const totalRows = Object.values(result[0])[0]
                    //@ts-ignore
                    const totalPage = Math.ceil(totalRows / limit)

                    const sql = `SELECT * FROM product WHERE category_type = ? AND isVisible = 1 AND title LIKE ${replacement} ORDER BY id ASC LIMIT ${limit} OFFSET ${offset}`;
                    const data = [qCategory]

                    pool.query(sql, data, (error, result) => {
                        if (error) return res.status(400).json({message: "Products not found 1", resultCode: 1})

                        return res.status(200).json({result, page, limit, totalRows, totalPage})

                    })
                })
            } else if (qCategory !== 'all') { // Если страницы с выбором категории

                const sqlCategory = `SELECT COUNT(*) FROM product WHERE isVisible = 1 AND category_type = ?`;
                const dataCategory = [qCategory]

                pool.query(sqlCategory, dataCategory, (error, result) => {
                    if (error) return res.status(400).json({message: "Products not found 0", error, resultCode: 1})

                    //@ts-ignore
                    const page = parseInt(req.query.page) || 0;
                    const offset = limit * page
                    //@ts-ignore
                    const totalRows = Object.values(result[0])[0]
                    //@ts-ignore
                    const totalPage = Math.ceil(totalRows / limit)

                    const sql = `SELECT * FROM product WHERE category_type = ? AND isVisible = 1 ORDER BY id ASC LIMIT ${limit} OFFSET ${offset}`;
                    const data = [qCategory]

                    pool.query(sql, data, (error, result) => {
                        if (error) return res.status(400).json({message: "Products not found 1", resultCode: 1})

                        return res.status(200).json({result, page, limit, totalRows, totalPage})

                    })
                })
            } else if (search) {
                let replacement = `'%${search}%'`;
                const sqlSearch = `SELECT COUNT(*) FROM product WHERE isVisible = 1 AND title LIKE ${replacement}`;

                pool.query(sqlSearch, (error, result) => {
                    if (error) return res.status(400).json({message: "Products not found 0", error, resultCode: 1})

                    //@ts-ignore
                    const page = parseInt(req.query.page) || 0;
                    const offset = limit * page
                    //@ts-ignore
                    const totalRows = Object.values(result[0])[0]
                    //@ts-ignore
                    const totalPage = Math.ceil(totalRows / limit)

                    const sql = `SELECT * FROM product WHERE isVisible = 1 AND title LIKE ${replacement} ORDER BY id ASC LIMIT ${limit} OFFSET ${offset}`;

                    pool.query(sql, (error, result) => {
                        if (error) return res.status(400).json({message: "Products not found 1", resultCode: 1})

                        return res.status(200).json({result, page, limit, totalRows, totalPage})

                    })
                })

            } else if (qCategory === 'all') { // Если страницы без выбора категории
                //@ts-ignore
                const page = parseInt(req.query.page) || 0;
                const offset = limit * page
                //@ts-ignore
                const totalRows = Object.values(result[0])[0]
                //@ts-ignore
                const totalPage = Math.ceil(totalRows / limit)

                const sql = `SELECT * FROM product WHERE isVisible = 1 ORDER BY id ASC LIMIT ${limit} OFFSET ${offset}`;

                pool.query(sql, (error, result) => {
                    if (error) return res.status(400).json({message: "Products not found 2", resultCode: 1})

                    return res.status(200).json({result, page, limit, totalRows, totalPage})

                })
            }

        })


    } catch (err) {
        return res.status(500).json({message: "Что-то пошло не так"})
    }
}

export const config = {
    api: {
        externalResolver: true,
    },
}
