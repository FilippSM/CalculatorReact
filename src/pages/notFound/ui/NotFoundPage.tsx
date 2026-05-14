import { Path } from "@/app/routing"
import { Button } from "@mui/material"
import { Link } from "react-router"

export const NotFound = () => {
  return (
    <>
      <h1>Not found. Error: 404</h1>
      <Button component={Link} to={Path.Tests} variant="contained">
        Вернуться на главную
      </Button>
    </>
  )
}
