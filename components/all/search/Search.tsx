import React, {useState} from 'react';
import styles from '../../../styles/page/shop.module.scss'

interface IProps {
    setSearch: (str: string) => void
}

const Search = ({setSearch}: IProps) => {
    const [value, setValue] = useState("")

    const onChangeInput = (e: any) => {
        setValue(e.target.value)
        setSearch(e.target.value)
    }

    return (
        <div className={styles.search}>
            <div>
                <input
                    type="text"
                    value={value}
                    onChange={onChangeInput}
                    placeholder="Поиск..."
                />
            </div>
        </div>
    )
};

export default Search;