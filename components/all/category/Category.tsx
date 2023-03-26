import React from 'react';
import {ICategoryType} from "@/pages/shop";
import styles from '../../../styles/page/shop.module.scss'

interface IProps {
    setActiveCategoryFunc: (str: string) => void
    activeCategory: string | string[]
    setSearch: (str: string) => void
    category: ICategoryType[]
}

const Category = ({setActiveCategoryFunc, activeCategory, setSearch, category}: IProps) => {
    console.log(category)
    return (
        <div className={styles.all__category}>
            {category.map((item, i) => {
                return (
                    <div
                        key={i}
                        className={activeCategory === item.categories ? styles.all__category__item + " " + styles.active : styles.all__category__item}
                        onClick={() => setActiveCategoryFunc(item.categories)}
                    >
                        {item.categories}
                    </div>
                )
            })}
            <div
                onClick={() => {
                    setActiveCategoryFunc('all')
                    setSearch("")
                }}
                className={activeCategory === 'all' ? styles.all__category__item + " " + styles.active : styles.all__category__item}>
                Все
            </div>
        </div>
    );
};

export default Category;