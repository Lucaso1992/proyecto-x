import styles from "./Home.module.css";

const Home = () => {

  return (
    <div className={styles.home_container}>
      <h1 className={styles.title}><strong>ShowApp</strong></h1>
      <h2> <strong>F#ck Instagram + No adds</strong></h2>
    </div>
  )
}

export default Home;