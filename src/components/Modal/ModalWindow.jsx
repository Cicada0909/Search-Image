import styles from './ModalWindow.module.scss'

export const ModalWindow = ({ img, btnClose }) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.items}>
                <img src={img} alt="preview" />
                <h3 onClick={btnClose}>X</h3>
            </div>
        </div>
    )
}
