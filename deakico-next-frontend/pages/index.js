import Head from 'next/head'
import styles from './styles/Home.module.css'

export default function Home() {

  // Para navegar rapido a todas las paginas sera removido y reemplazado luego  

  return (
    <div className={styles.container}>
      <Head>
        <title>Home</title>
      </Head>

      <main className={styles.main}>

        <div className={styles.grid}>
          <a
            href="/login"
            className={styles.card}
          >
            <h3>Log in &rarr;</h3>
            <p>
              link to mock log in page
            </p>
          </a>
          <a
            href="/signup"
            className={styles.card}
          >
            <h3>Sign Up &rarr;</h3>
            <p>
              link to mock sign uplog in page
            </p>
          </a>
        </div>
      </main>
    </div>
  )
}
