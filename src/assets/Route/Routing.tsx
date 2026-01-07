import { Route, Routes } from "react-router"
import { Login } from "../components/Pages/Login"
import { Main } from "../components/Pages/Main"
import { NotFound } from "../components/Pages/NotFound"
import { Results } from "../components/Pages/Results"
import { Density } from "@/features/density/ui/Density"

export const Path = {
  Density: "/",
  Login: "/Login",
  Main: "/Main",
  Results: "/Results",
  NotFound: "*",
} as const

export const Routing = () => {
  return (
    <Routes>
      <Route path={Path.Density} element={<Density />} />
      <Route path={Path.Login} element={<Login />} />
      <Route path={Path.Main} element={<Main />} />
      <Route path={Path.Results} element={<Results />} />
      <Route path={Path.NotFound} element={<NotFound />} />
    </Routes>
  )
}
