import React from 'react';
import styles from '../../styles/page/official.module.scss'

const Text = ({children}: React.PropsWithChildren<{}>) => {
    return (
        <div className={styles.text}>
            {children}
        </div>
    );
};

export default Text;