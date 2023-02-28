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
    return (
        <div className={styles.all__category}>
            {category.map((item, i) => {
                return (
                    <div
                        key={i}
                        className={activeCategory === item.category_type ? styles.all__category__item + " " + styles.active : styles.all__category__item}
                        onClick={() => setActiveCategoryFunc(item.category_type)}
                    >
                        {item.category_type}
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