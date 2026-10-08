import { Routing } from "./app/routing/routes"
import { Header } from "./widgets/header"
import { ParticlesBackground } from "./widgets/particles-background"
import styles from "./App.module.scss"

function App() {
  return (
    <>
      <ParticlesBackground />
      <div className={styles.content}>
        <Header />
        <Routing />
      </div>
    </>
  )
}

export default App
