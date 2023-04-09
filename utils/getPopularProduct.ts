import {pool} from "@/config/db";


// Получение популярных товаров по категориям (3 полоски)
export const popularFunc = (res: any, category: string, category_name: string, category_desc: string) => {
    // Запрос на сервер
    const sql = `SELECT ${category}, ${category_name}, ${category_desc} FROM system`;

    pool.query(sql, (error, result:any) => {
        if (error) return res.status(400).json({message: "Products not found", resultCode: 1})

        const sql_select = `SELECT * FROM product WHERE categories = ? AND isVisible = 1 ORDER BY popularity DESC LIMIT 14`
        // Дотсаю категорию
        const data = [([...Object.values(result[0])][0])]

        const titles = [([...Object.values(result[0])][1]), ([...Object.values(result[0])][2])]

        // Выбрать элементы из бд подходящие под категорию
        pool.query(sql_select, data, (error, resultProduct:any) => {
            if (error) return res.status(400).json({resultProduct: [], message: "Products not found", resultCode: 1})

            if (resultProduct) {
                return res.status(200).json({resultProduct, titles})
            }
        })
    })
}