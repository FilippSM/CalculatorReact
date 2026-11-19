import { Routing } from "./app/routing/routes"
import {
  ScrollToTopButton,
  useScrollToTop,
} from "./shared/components/ScrollToTopButton"
import { Footer } from "./widgets/footer"
import { Header } from "./widgets/header"
import { ParticlesBackground } from "./widgets/particles-background"
import styles from "./App.module.scss"

function App() {
  const { isVisible, scrollToTop } = useScrollToTop()

  return (
    <>
      <ParticlesBackground />
      <div className={styles.content}>
        <Header />
        <main className={styles.main}>
          <Routing />
        </main>
        <Footer />
        {isVisible && <ScrollToTopButton onClick={scrollToTop} />}
      </div>
    </>
  )
}

export default App
