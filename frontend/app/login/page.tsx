import styles from './login.module.css'

export default function LoginPage() {
    return (
        <>
        <form>
            <div className={styles.login}>
                <input type='text' name='username' placeholder='Enter your username' required></input>
                <input type='text' name='username' placeholder='Enter your username' required></input>
            </div>
        </form>
        </>
    );
}