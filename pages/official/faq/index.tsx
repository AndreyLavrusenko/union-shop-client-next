import React from 'react';
import styles from "@/styles/page/official.module.scss";
import Title from "@/components/official/Title";
import Text from '@/components/official/Text'

const FAQ = () => {
    return (
        <div className={styles.official}>
            <Title title={"Ответы на часто задаваемые вопросы"}/>
            <Text>
                <strong>Отменить заках?</strong> <br/>
                Чтобы отменить заказ напишите нам: <br/>
                - на почту: (Адрес почты) <br/>
                - в инстаграм: (ссылка) <br/>
                - в контакте: (ссылка) <br/>
                Внимание! Отменить заказ можно до тех пор, пока мы не отправим его на сборку. <br/>
                <strong>Изменить заказ?</strong> <br/>
                Чтобы отменить заказ напишите нам: <br/>
                - на почту: (Адрес почты) <br/>
                - в инстаграм: (ссылка) <br/>
                - вконтакте: (ссылка) <br/>
                Внимание! Отменить заказ можно до тех пор, пока мы не отправим его на сборку. <br/>
                <strong> У меня есть промо-код. Как его использовать?</strong> <br/>
                Введите название промо-кода в поле “промо-код”, оформляя заказ на сайте. Скидка применится
                автоматически.Внимание! В одном заказе можно использовать только один промо-код. <br/>
                <strong>Как использовать подарочный сертификат?</strong> <br/>
                Подарочный сертификат предназначен только для онлайн покупок! <br/><br/>
                Сразу после покупки вы получите сертификат и инструкции, как его использовать, на почту. Сертификатом
                можно оплачивать любые товары только в интернет-магазине. Его можно использовать в нескольких заказах,
                пока на нём не закончатся деньги. <br/>
                <strong>Где мой заказ?</strong><br/>
                Мы знаем, что вы хотите получить заказ максимально быстро и сообщаем вам каждый этап: после оформления
                заказа вам на e-mail отправляется письмо с подтверждением принятие заказа. В письме указан номера
                заказа, наименования выбранных товаров и общая суммы. После передачи заказа в обработку, вы получаете
                повторное письмо, подтверждающее изменение статуса заказа на “в обработке”. Этот этап занимает от 3 до
                10 дней. После упаковки и отправки заказа, вам на e-mail придёт очередное письмо, содержащее трек-номер
                для отслеживания посылки (или “номер посылки”). По данному трек-номеру на сайте почты России можно
                отследить посылку. <br/> <br/>
                ВАЖНО! Обратите внимание, что часть товаров находится на предзаказе - это означает что товар находится в
                статусе производства и отправка будет произведена через 2-5 недель после оформления заказа.Внимательно
                ознакомитесь с описанием товара. <br/> <br/>
                При отсутствии товара на складе вы вправе заменить его другим товаром либо аннулировать заказ. <br/>
                <strong>Почему так долго не обрабатывают мой заказ?</strong> <br/>
                Если статус вашего заказа не меняется на статус “в обработке” более 7 дней, вероятнее всего вы оформили
                заказ на товар по предзаказу. Товары по предзаказу отправляются в течение 3-5 недель. <br/>
                <strong>Условия, сроки и стоимость доставки?</strong> <br/>
                Стоимость и сроки доставки по Санкт-Петербургу: <br/>
                Доставка товара по Санкт-Петербургу осуществляется курьерской службой доставки. Стоимость доставки — 350
                рублей. <br/>
                Доставка 1-2 рабочих дня с 11:00 до 21:00, при наличии товара на складе. <br/>
                Стоимость и сроки доставки по России:Доставка товара по России осуществляется службой доставки Почта
                России по территории РФ. Стоимость доставки — от 250 до 750 рублей. <br/>
                Средняя продолжительность доставки 3-14 рабочих дней после отправления вашего заказа. <br/>
                Стоимость и сроки доставки в страны ближнего и дальнего зарубежья: <br/>
                Доставка международных отправлений осуществляется Почтой России до границы РФ, после пересечения границы
                доставка осуществляется местной почтовой службой. Тариф на международные отправления рассчитывается на
                нашем сайте при заказе и зависит от веса выбранных товаров. <br/>
                Стоимость и сроки доставки EMS delivery: Тариф рассчитывается на сайте и зависит от адреса доставки и
                веса выбранных товаров. <br/>
                <strong>У вас есть самовывоз?</strong> <br/>
                Нет, на данный момент мы не предоставляем данную возможность. <br/>
                <strong>У вас есть примерка?</strong> <br/>
                Нет, но мы позаботились о том, чтобы она вам не понадобилась! <br/>
                Обмеры: указаны для каждого товара под размером. <br/>
                Выбор размера: воспользуйтесь инструкцией, чтобы правильно себя обмерить. <br/>
                Возврат: вы можете примерить изделие дома, без спешки и, если товар не подойдет, оформить возврат в
                течение 14 дней с момента получения заказа. <br/>
                <strong> Мне не пришёл трек-номер. Что делать?</strong> <br/>
                Проверьте, пожалуйста, папку “Спам”. Если письма нет — напишите нам и мы решим ваш вопрос. <br/>
                <strong>Как оплатить?</strong> <br/>
                Банковской картой на сайте без комиссии. К оплате принимаются: Visa, Mastercard, Maestro, МИР. Также вы
                можете оплатить заказ с помощью Яндекс.Деньги и QIWI Кошелёк. <br/>
                Товар оплачивается только в рублях, при оплате с банковских карт в другой валюте, платёж будет
                сконвертирован согласно курсу банка, выпустившего карту. <br/>
                Внимание! Мы НЕ принимаем оплату наличными, переводом с карты на карту физ. лицу и иные платежные
                сервисы. <br/>
                <strong>Я могу перевести деньги на карту?</strong> <br/>
                Нет. Мы официальный интернет-магазин и работаем через платежную систему (агрегатор) (оплата банковскими
                картами, Яндекс.Деньги, QIWI Кошелёк).Оплата заказа производится только на сайте или по официальной
                ссылке на оплату. <br/>
                <strong>Могу ли я оплатить заказ при получении? </strong> <br/>
                К сожалению, нет. Доставка происходит после полной предоплаты заказа на сайте. Данное заявление может не
                распространяться на товары наших партнеров. Для дополнительной информации обратитесь в наш чат
                поддержки. <br/>
                <strong>Мне не приходит код - подтверждение, что делать?</strong> <br/>
                Проверьте: <br/>
                1. Привязан ли номер телефона к карте, с которой произведена оплата. <br/>
                2. Введён ли номер телефона без ошибок. Если номер уже вписан в строку, необходимо выключить
                автозаполнение на устройстве, с которого производите оплату. <br/>
                Всё верно, но код не пришёл? Обратитесь в ваш банк для уточнения. <br/>
                <strong>Могу ли я вернуть вещь, если она не подошла мне?</strong> <br/>
                Товар можно вернуть в течение 14 календарных дней после получения заказа. Для оформления возврата
                свяжитесь с нами удобным способом. <br/>
                Укажите в сообщении причину возврата и номер вашего заказа. <br/>
                Отправьте посылку Почтой России за ваш счет по адресу: (адрес) на имя ИП (вставить, когда появится) (ИП
                указывать обязательно). <br/>
                После одобрения возврата мы перечислим денежные средства на карту или банковский счёт в течение 14
                рабочих дней. <br/>
                Обращаем ваше внимание, что возврат денежных средств зависит от скорости обработки операции вашим банком
                и может достигать 7 банковских дней. Возврат наличных средств не осуществляется. <br/>
                Возврат денежных средств осуществляется за вычетом суммы, оплаченной за доставку при оформлении
                заказа <br/>
                *Если вы получили товар ненадлежащего качества, то возврат денежных средств осуществляется в полном
                размере. <br/>
                <strong>Получили ли вы мой возврат?</strong> <br/>
                Мы проинформируем вас по e-mail, когда получим и проверим возврат на складе. Если вы увидели, что
                возврат доставлен, но письма нет, убедитесь что письма нет в папке “Спам”.Если вы не получили от нас
                письмо, а сроки вышли, свяжитесь с нами по почте <span>(адрес)</span> и мы решим ваш вопрос. <br/>
                <strong>Почему мне вернули неправильную сумму?</strong> <br/>
                Сумма возврата состоит из: <br/>
                1. Стоимость возвращаемых вами товаров. <br/>
                2. Минус стоимость доставки, если был оформлен возврат товара надлежащего качества. <br/>
                3. Стоимость доставки заказа возвращается только в случае отмены заказа до получения или в случае
                возврата товара ненадлежащего качества. Если в вашем возврате была допущена ошибка, пожалуйста свяжитесь
                с нами по почте: (адрес) и мы все решим. <br/>
                <strong>Мне пришёл чек, но денег ещё нет. Что делать?</strong> <br/>
                Не переживайте! Срок зачисления средств на ваш счёт зависит от банка эмитента и может занимать от 2 до
                30 дней. <br/>
                <strong>Как выбрать размер?</strong> <br/>
                1. Обмеры: указаны для каждого товара под размером. <br/>
                2. Выбор размера: воспользуйтесь инструкцией, чтобы правильно себя обмерить. <br/>
                <strong>Бывают ли у вас скидки или сезонные распродажи?</strong> <br/>
                В разделе «Распродажа» мы предлагаем вещи на которые в данный момент действует скидка. Кроме того, мы
                делаем сезонные скидки на некоторые позиции. <br/>
                <strong>Как ухаживать за одеждой?</strong> <br/>
                Чтобы надолго сохранить первоначальный вид изделия и продлить радость от покупки, мы рекомендуем: <br/>
                - машинную или ручную стирку при максимальной температуре воды 30 градусов (избегайте сильного трения и
                выкручивания); <br/>
                - сушку в расправленном виде на плоской поверхности вдали от прямых солнечных лучей; <br/>
                - гладить с внутренней стороны на средних температурах с большим количеством пара; <br/>
                - избегать контакта принтов с горячими поверхностями. <br/>
                Пусть ваша одежда остается в идеальном состоянии как можно дольше! <br/>
               <strong> У вас есть розничный магазин, где можно померить одежду?</strong> <br/>
                Нет, на данный момент на территории Российской Федерации физических магазинов нет. <br/>
                <strong>Доставка и оплата</strong> <br/>
                Настоящее пользовательское соглашение, далее "Соглашение", заключается между Интернет-магазином ЮНИОН,
                имеющим адрес в сети Интернет www.union-shop.com (union.ru/ shop), далее "Интернет-магазин" или "Сайт",
                и пользователем услуг Интернет-магазина, далее "Покупатель", и определяет условия приобретения товаров
                через Сайт. <br/><br/>
                1.Основные положения <br/>
                1.1. Настоящее Соглашение заключается между Покупателем и Интернет-магазином в момент оформления заказа. <br/>
                1.2. Настоящие Соглашение, а также информация о товаре, представленная на Сайте, являются публичной офертой в соответствии со ст.435 и ч.2 ст.437 ГК РФ. <br/>
                1.3. К отношениям между Покупателем и Интернет-магазином применяются положения ГК РФ о продажи товаров дистанционным способом (ст.497 Федерального закона РФ от 25.10.2007 N 234-ФЗ), а также Закон РФ «О защите прав потребителей» от 07.02.1992 № 2300-1 и иные правовые акты, принятые в соответствии с ними. <br/>
                1.4. Покупателем может быть любое физическое или юридическое лицо, способное принять и оплатить заказанный им товар в порядке и на условиях, установленных настоящим Соглашением, на территории Российской Федерации. <br/>
                1.5. Интернет-магазин оставляет за собой право вносить изменения в настоящее Соглашение. <br/>
                1.6. Настоящее Соглашение должно рассматриваться в том виде, как оно опубликовано на Сайте, и должно применяться и толковаться в соответствии с законодательством Российской Федерации. <br/>
                2. Информация о товаре <br/>
                2.1. Товар представлен на Сайте через фото-образцы, являющиеся собственностью Интернет-магазина. <br/>
                2.2. Каждый фото-образец сопровождается текстовой информацией: ценой и описанием товара, информацией о сроках обработки товаров, информацией о предзаказе. <br/>
                2.3. По просьбе Покупателя менеджер Интернет-магазина обязан предоставить посредством электронной почты прочую информацию, необходимую и достаточную, с точки зрения Покупателя, для принятия им решения о покупке товара. <br/>
                2.4. Указанная на Сайте цена товара может быть изменена Интернет-магазином в одностороннем порядке. <br/>
                3. Порядок приобретения товара <br/>
                3.1. Покупатель вправе оформить заказ на любой товар, представленный на Сайте. Заказ может быть оформлен Покупателем следующим способом: самостоятельно на Сайте. <br/>
                3.2. После оформления заказа на e-mail Покупателя отправляется письмо, подтверждающее принятие заказа, с указанием номера заказа, наименований выбранных товаров и общей суммы заказа, являющийся неотъемлемой частью настоящего Соглашения. <br/>
                3.3 После передачи заказа в обработку, на e-mail Покупателя отправляется письмо, подтверждающее изменение статуса заказа на “в обработке”. Обработка заказов занимает от 2 до 7 дней. <br/>
                3.4 После упаковки и отправки заказа, на e-mail Покупателя отправляется письмо, в котором указан трек-номер для отслеживания посылки, а именно “номер посылки”. По данному номеру, на сайте почты России, Покупатель имеет возможность отследить посылку. <br/>
                3.5. При отсутствии товара на складе менеджер Интернет-магазина обязан поставить в известность об этом Покупателя (по телефону или посредством электронной почты). <br/>
                3.6. При отсутствии товара Покупатель вправе заменить его другим товаром либо аннулировать заказ. <br/>
                3.7. Покупатель вправе отказаться от заказанного товара в любое время до его отправки заблаговременно поставив в известность об этом Интернет-магазин посредством электронной почты. <br/>
                4. Доставка и приемка-передача товара <br/>
                4.1. Доставка товара, заказанного в Интернет-магазине, в согласованном количестве и ассортименте, осуществляется службой доставки Почта России по территории РФ.Доставка международный отправлений осуществляется службой доставки Почта России до границы, после пересечения границы доставка осуществляется местной почтовой службой. <br/>
                4.2. Расходы по доставке товара оплачиваются Покупателем по тарифам, указанным на Сайте.Тариф на международные отправления рассчитывается на сайте и зависят от веса выбранных товаров. <br/>
                4.4. Отправка и доставка заказанного товара производится в оговоренные с Покупателем сроки. Информация о сроках обработки и доставки товара указана в описании к товарам.Уважаемый покупатель! Пожалуйста, проверяйте ваш e-mail, указанный при оформлении заказа. Мы очень внимательно относимся к статусу вашего заказа и всегда высылаем вам письма в которых описан каждый этап формирования заказа.Просим вас быть предельно внимательными приходящим от нас письмам. В день отправки вашего заказа на e-mail высылается трек-номер для отслеживания, после чего вы сможете отслеживать свою посылку на сайте Почты России в графе “отслеживание”. Бывают случаи, когда посылка лежит 14-30 дней в вашем почтовом отделении, после чего она возвращается обратно к нам. Интернет магазин ЮНИОН не следит за статусом вашей посылки. Когда посылка прибудет к вам по указанному адресу, Почта России обязана передать вам извещение на получение посылки. В любом случае, даже если извещение к вам не пришло, а вы видите по трек-номеру, что ваша посылка находится в отделении по месту жительства, значит вы можете забрать посылку самостоятельно, без извещения. <br/>
                5. Оплата товара <br/>
                5.1. Используя систему (вставить наш агрегатор, когда появится), вы моментально оплатите покупку электронными деньгами популярных платежных систем, банковской картой или со счета сотового телефона. Оплатить выставленный счет можно позже, через сеть терминалов. Может взиматься комиссия системы (вставить наш агрегатор, когда появится). Заказ будет автоматически оплачен и готов к отправке согласно пункта 3.2 <br/>
                5.3. Товар оплачивается только в рублях, при оплате с банковских карт, в другой валюте, платеж будет сконвертирован согласно курсу банка, выпустившего карту. <br/>
                6. Возврат и обмен товара <br/>
                6.1. Покупатель вправе отказаться от товара, если он еще не отправлен. Покупатель вправе отказаться от товара после его получения в течение четырнадцати дней. Возврат товара надлежащего качества возможен в случае, если сохранены его товарный вид, потребительские свойства, а также документ, подтверждающий факт и условия покупки указанного товара (товарная накладная, кассовый чек). В течение этого периода Покупатель обязан известить менеджера магазина посредством электронной почты о желании вернуть товар. <br/>
                6.2. При отказе Покупателя от товара до его отправки Интернет-магазин возвращает ему денежную сумму, уплаченную за товар. При отказе Покупателя от товара, после его получения, Интернет-магазин возвращает ему денежную сумму, уплаченную за товар, за вычетом суммы расходов Интернет-магазина, связанных с доставкой товара Покупателю и вывозом товара от Покупателя, не позднее, чем через десять дней со дня предъявления Покупателем соответствующего требования. <br/>
                6.4. Товар ненадлежащего качества может быть заменен на аналогичный товар надлежащего качества, либо возвращен Продавцу, в данном случае доставку товара оплачивает Продавец. <br/>
                6.5 Покупатель вправе совершить обмен товара после его получения в течение четырнадцати дней. Обмен товара надлежащего качества возможен в случае, если сохранены его товарный вид, потребительские свойства, а также документ, подтверждающий факт и условия покупки указанного товара (товарная накладная, кассовый чек). В течение этого периода Покупатель обязан известить менеджера магазина посредством электронной почты о желании обменять товар. Расходы в данном случае оплачивает Покупатель. <br/>
                Куда отправить возврат? <br/>
                (вставить адрес, когда появится) на имя ИП (вставить, когда появится) (ИП указывать обязательно <br/>
            </Text>
        </div>
    );
};

export default FAQ;