import { Routing } from "./app/routing/routes"
import { Footer } from "./widgets/footer"
import { Header } from "./widgets/header"
import { ParticlesBackground } from "./widgets/particles-background"
import styles from "./App.module.scss"

function App() {
  return (
    <>
      <ParticlesBackground />
      <div className={styles.content}>
        <Header />
        <main className={styles.main}>
          <Routing />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default App
