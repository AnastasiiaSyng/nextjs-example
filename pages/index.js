import Head from 'next/head'
import styles from '../styles/Home.module.css';
import axios from 'axios'

export default function Home() {

 const checkLogin = () => {
   axios.post('/api/v2/auth', {username: 'admin', password: 'FirstLogin1'})
     .then((data) => console.log(data, 'response'))
     .catch((e) => console.log(e, 'error'))
   }
 
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <p>Try to code with login stuff</p>
    <div>
    <form onSubmit={() => checkLogin()}>
        <input type='text' />
        <input type='text' />
        <button type='submit'>submit</button>
      </form>
    </div>
   

    

  </div>

     
  )
}
