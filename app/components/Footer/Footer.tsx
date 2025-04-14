import styles from './Footer.module.css'

const Footer = () => {
    return (
        <footer className={styles.container}>
            <div className={styles.background}>
                <div className={styles.gradient} />
            </div>
            <div className={styles.copyright}>
                <p>© 2025 LOVIGIN LTD. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer