import { createRoot } from "react-dom/client"
import { HashRouter } from "react-router"
import App from "./App.tsx"
import "./styles/global.css"
import { Provider } from "react-redux"
import { store } from "./app/store.ts"

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
)
