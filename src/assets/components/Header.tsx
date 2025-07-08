import { NavLink } from "react-router"
import { Path } from "../Route/Routing"
import { Container } from "./Container/Container"


export const Header = () => {
  return (
    <>
      <Container>
        <NavLink to={Path.Density}>Density</NavLink>
        <NavLink to={Path.Login}>Login</NavLink>
        <NavLink to={Path.Main}>Main</NavLink>
      </Container>
    </>
  )
}
