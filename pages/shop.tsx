import React, {useCallback, useEffect, useState} from 'react';
import {productAPI} from "@/api/api";
import {IProduct} from "@/models/IProduct";
import styles from '../styles/page/shop.module.scss'
import AllCard from "@/components/all/all-card/AllCard";
import Category from "@/components/all/category/Category";
import Search from "@/components/all/search/Search";
import Pagination from '@/components/all/pagination/Pagination'
import {useRouter} from "next/router";


export interface ICategoryType {
    categories: string
}


interface IProductType {
    limit: number
    page: number
    result: IProduct[]
    totalPage: number
    totalRows: number
}

interface IProps {
    products: IProductType
    category: ICategoryType[]
}

const Shop = ({products, category}: IProps) => {
    const [page, setPage] = useState(products.page)
    const [pages, setPages] = useState(products.totalPage)
    const [activeCategory, setActiveCategory] = useState<string | string[]>("all")

    const [search, setSearch] = useState("")

    const router = useRouter()

    const changePage = ({selected: selectedPage}: any) => {
        setPage(selectedPage)
        router.push({query: {...router.query, page: selectedPage}})
    }

    useEffect(() => {
        router.push({query: {...router.query, page: page}})
        setPage(+router.query.page + 1)
        setActiveCategory(router.query?.category ? router.query?.category : "all")
    }, [])

    useEffect(() => {
        setPages(products.totalPage)
    })

    // Отправляет запрос с задердкой в 500мс
    const updateSearchValue = useCallback((str: string) => {
        setSearch(str)
        setActiveCategory("all")

        router.push({query: {...router.query, search: str}})
    }, [])


    const setActiveCategoryFunc = (category: string) => {
        router.push({query: {category: category}})
        setActiveCategory(category)
    }

    return (
        <>
            <Search setSearch={updateSearchValue}/>
            <Category category={category} setSearch={updateSearchValue} setActiveCategoryFunc={setActiveCategoryFunc}
                      activeCategory={activeCategory}/>
            <div className={styles.all}>
                <AllCard products={products.result}/>
            </div>
            <Pagination pages={pages} changePage={changePage}/>
        </>
    );
};

export default Shop;


export const getServerSideProps = async ({query}: any) => {
    const category = await productAPI.getAllCategoryType()
    const result = await productAPI.getAllCategory(query.category, query.page, query.search)

    return {
        props: {
            products: result,
            category,
        }
    }
}