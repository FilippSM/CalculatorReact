import { Routing } from "./app/routing/routes"
import { Header } from "./widgets/header"
import { ParticlesBackground } from "./widgets/particles-background"

function App() {
  return (
    <>
      <ParticlesBackground />
      <Header />
      <Routing />
    </>
  )
}

export default App
