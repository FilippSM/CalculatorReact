import { createRoot } from "react-dom/client"
import { HashRouter } from "react-router"
import App from "./App.tsx"
import "./shared/styles/main.scss"
import { Provider } from "react-redux"
import { store } from "./app/store/store.ts"
import "@fontsource-variable/roboto"

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
)
