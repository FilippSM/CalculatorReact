import { Route, Routes } from "react-router"
import { Density } from "../components/Density"
import { Login } from "../components/Pages/Login"
import { Main } from "../components/Pages/Main"
import { NotFound } from "../components/Pages/NotFound"

export const Path = {
  Density: "/CalculatorReact/",
  Login: "/CalculatorReact/Login",
  Main: "/CalculatorReact/Main",
  NotFound: "*",
} as const

export const Routing = () => {
  return (
    <Routes>
      <Route path={Path.Density} element={<Density />} />
      <Route path={Path.Login} element={<Login />} />
      <Route path={Path.Main} element={<Main />} />
      <Route path={Path.NotFound} element={<NotFound />} />
    </Routes>
  )
}
