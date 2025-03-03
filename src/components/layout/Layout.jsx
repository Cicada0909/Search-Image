import ImagesList from '../Images/ImagesList/ImagesList'
import styles from './Layout.module.css'

const Layout = () => {
    return (
        <div className={styles.wrapper}>
            <ImagesList />
        </div>
    )
}

export default Layout
