import type {NextApiRequest, NextApiResponse} from 'next'
import {pool} from '@/config/db'
import md5 from 'md5'
import {v4 as uuidv4} from 'uuid';
import nodemailer from 'nodemailer';


// Регистрация или вход обычным способом
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    try {
        // Проверка были отправлены какие нибудь данные или нет
        if (!req.body.email || !req.body.password) return res.status(400).json({resultCode: 1})

        const hash = md5(req.body.password)

        const sql = `SELECT * FROM users WHERE email = ? AND password = ?`
        const data = [req.body.email, hash]

        // Отправка запроса и его проверка
        pool.query(sql, data, async (error, result: any) => {
            if (error) return res.status(400).json({message: error, resultCode: 1})

            // Если пользователя не сущетсвует то создаем его
            //@ts-ignore
            if (result.length === 0) {

                const id = uuidv4()
                const hashEmail = uuidv4() // Для подтверждения email

                const sql_reg = `INSERT INTO users (id, email, password, confirmHash) VALUES (?, ?, ?, ?)`
                const regData = [id, req.body.email, hash, hashEmail]

                pool.query(sql_reg, regData, async (error, result: any) => {
                    if (error) return res.status(400).json({message: "Something went wrong!", resultCode: 1})

                    pool.query(sql, data, async (error, resultUser: any) => {
                        if (error) return res.status(400).json({message: "User is not created", resultCode: 1})

                        // Если пользователь создает аккаунт, то отправляем письмо на почту с подтверждением email
                        const transporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                                user: process.env.NEXT_EMAIL, // generated ethereal user
                                pass: process.env.NEXT_EMAIL_PASSWORD, // generated ethereal password
                            },
                        });

                        const mailOptions = {
                            from: process.env.NEXT_EMAIL,
                            to: req.body.email,
                        }

                        try {
                            await transporter.sendMail({
                                ...mailOptions,
                                subject: "Union Shop - Подтверждение email", // Subject line
                                text: "Подтверждение почты", // plain text body
                                html: `
                                    <div style="background-color: white; padding: 40px; height: 100%;">
                                        <h3 style="font-weight: 700;
                                                    font-size: 48px;
                                                    line-height: 100%;
                                                    text-align: center;
                                                    letter-spacing: -0.016em;
                                                    color: #191847;
                                                    "
                                        >Подтверждение аккаунта</h3>
                                         <div style="margin: 0 auto;
                                                     display: flex;
                                                     padding-top: 20px;
                                                     padding-bottom: 70px;
                                                     "
                                         >
                                            <div style="max-width: 880px; padding-left: 15px; margin: 0 auto;">
                                                <h4 style="margin: 0; padding-bottom: 5px;">Добро пожаловать в ЮНИОН!</h4>
                                                <p style="margin: 0;">
                                                Благодарим за регистрацию в Интернет-Магазине ЮНИОН. Чтобы подтвердить учетную запись, Вам необходимо перейти по ссылке. <br>
                                                Преимущества подтвержденной учетной записи: <br>
                                                Возможность приобретения товаров  <br>
                                                Доступ к полной коллекции лицензионных продуктов ЮНИОН, промо-акциях и товарах наших партнеров <br>
                                                Подарочные промокоды в день рождения  <br>
                                                Получение эксклюзивных бонусов <br>
                                                Если у Вас возникли вопросы, обязательно обратитесь в службу поддержки.</p>
                                            </div>
                                        </div>
                                        
                                        <div style="text-align: center"
                                        >
                                            <a 
                                                style="
                                                    font-weight: 400;
                                                    font-size: 14px;
                                                    line-height: 17px;
                                                    color: #FFFFFF;
                                                    background: #1468E7;
                                                    border-radius: 8px;
                                                    padding: 12px 24px;
                                                    text-decoration: none;
                                                    text-align: center;
                                                "
                                                target="_blank" 
                                                href="${process.env.NEXT_PUBLIC_BACK_URI}/api/auth/activate/${hashEmail}"
                                                >
                                                Актививировать
                                            </a>
                                        </div>
                                        <br><br><br>
                                    </div>
                                `,
                            })
                        } catch (err) {
                            console.log(err)
                        }

                        return res.status(200).json(resultUser[0])
                    })
                })
            } else {
                // Записываем email пользователя
                return res.status(200).json(result[0])
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