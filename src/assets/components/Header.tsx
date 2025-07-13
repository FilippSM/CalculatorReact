import { NavLink } from "react-router"
import { Path } from "../Route/Routing"
import { Container } from "./Container/Container"
import styles from "./Header.module.css"

export const Header = () => {
  return (
    <>
      <Container>
        <nav className={styles.nav}>
          <NavLink 
            to={Path.Density}
            className={({ isActive }) => 
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Density
          </NavLink>
          <NavLink 
            to={Path.Login}
            className={({ isActive }) => 
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Login
          </NavLink>
          <NavLink 
            to={Path.Main}
            className={({ isActive }) => 
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Main
          </NavLink>
        </nav>
      </Container>
    </>
  )
}
