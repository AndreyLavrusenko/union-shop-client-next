import React from 'react'
import ReactPaginate from 'react-paginate'
import styles from '../../../styles/page/shop.module.scss'
import {useTranslation} from "next-i18next";

interface IProps {
    pages: number,
    changePage: (selectedItem: { selected: number; }) => void
}

const Pagination = ({pages, changePage}: IProps) => {

    const {t: translate} = useTranslation('common')

    return (
        <div className={styles.pagination}>
            <ReactPaginate
                previousLabel={translate("prev")}
                nextLabel={translate("next")}
                pageCount={pages}
                onPageChange={changePage}
                containerClassName={styles.pagination}
                previousLinkClassName={styles.pagination__link}
                nextLinkClassName={styles.pagination__link}
                disabledClassName={styles.pagination__link__disabled}
                activeClassName={styles.pagination__link__active}
            />
        </div>
    )
}

export default Pagination