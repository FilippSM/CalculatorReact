import { Route, Routes } from "react-router"
import { Login } from "../../pages/login/ui/LoginPage"
import { Density } from "@/features/density/ui/Density"
import { Main } from "@/pages/main"
import { Results } from "@/pages/results"
import { NotFound } from "@/pages/notFound"

export const Path = {
  Density: "/",
  Login: "/LoginPage",
  Main: "/MainPage",
  Results: "/ResultsPage",
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
