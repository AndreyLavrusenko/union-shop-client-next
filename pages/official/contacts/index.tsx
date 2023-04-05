import React from 'react';
import styles from "@/styles/page/official.module.scss";
import Title from "@/components/official/Title";
import Text from "@/components/official/Text";

const Contacts = () => {
    return (
        <div className={styles.official}>
            <Title title={"Контакты"} />
            <div style={{textAlign: "center"}}>
                <Text>
                    <strong >Вопросы о заказах и товарах:</strong> <br/>
                    <span>shop@union.com</span> <br/><br/>
                    <strong>Производство мерчендайза:</strong> <br/>
                    <span>wear@union.com</span> <br/><br/>
                    Instagram/Vk/Telegram <br/><br/>
                </Text>
            </div>
            <Text>
                <span>ИП:</span> <br/>
                <span>ИНН:</span> <br/>
                <span>ОГРНИП:</span> <br/>
                <span>Юр. адрес:</span> <br/>
            </Text>

        </div>
    );
};

export default Contacts;