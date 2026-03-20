import { Route, Routes } from "react-router"
import { Login } from "../../pages/login/ui/LoginPage"
import { Main } from "@/pages/main"
import { Results } from "@/pages/results"
import { NotFound } from "@/pages/notFound"
import { Tests } from "@/pages/tests"

export const Path = {
  Tests: "/",
  Login: "/LoginPage",
  Main: "/MainPage",
  Results: "/ResultsPage",
  NotFound: "*",
} as const

export const Routing = () => {
  return (
    <Routes>
      <Route path={Path.Tests} element={<Tests />} />
      <Route path={Path.Login} element={<Login />} />
      <Route path={Path.Main} element={<Main />} />
      <Route path={Path.Results} element={<Results />} />
      <Route path={Path.NotFound} element={<NotFound />} />
    </Routes>
  )
}
