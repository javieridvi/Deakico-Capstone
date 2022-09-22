import Head from 'next/head'
import styles from './styles/LogIn.module.css'

export default function logIn (){


    return (
    <div className={styles.container}>
        <Head>
            <title>Log in</title>
        </Head>
        <div className={styles.login}>
            <section>
                <img src="/Coqui.PNG" className={styles.img} />
                <p className={styles.name}>
                    Deakico
                </p>
                <p className={styles.LogInText} >
                    Log In to Dashboard
                </p>
                <p className={styles.enterText} >Enter your email and password below</p>
            </section>
            <section>
                <form>
                    <div className={styles.email}>
                    <input type={'email'} id='email' placeholder='Email address'/>
                    <label for='email'>Email</label>
                    </div>
                    <div className={styles.password}>
                    <input type={'password'} id='password' placeholder='Password'/>
                    <label for='password'>Password</label>    
                    </div>
                    
                    <button type='submit' className={styles.button}>Log In</button>
                </form>
            </section>
            <div className={styles.signUp} >Don't have an account? <a href=''>Sign up</a></div>
           


        </div>
    </div>)
}