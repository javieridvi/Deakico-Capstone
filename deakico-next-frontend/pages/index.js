import Head from 'next/head'
import Header from '../deakicomponents/Header'
import styles from './styles/Home.module.css'

export default function Home() {


  // Para navegar rapido a todas las paginas sera removido y reemplazado luego  

  return (
    <div className={styles.container}>
      <Head>
        <title>Home</title>
      </Head>

      <main className={styles.main}>
        <Header />
        <h1>Home landing page missing</h1>

      </main>
    </div>
  )
}
