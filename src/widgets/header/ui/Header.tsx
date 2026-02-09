import { NavLink } from "react-router"
import styles from "./Header.module.css"
import { Container } from "@/shared/components/Container"
import { Path } from "@/app/routing"
import { useThemeStore } from "@/app/store"
import { useEffect } from "react"

export const Header = () => {
  const { theme, toggleTheme } = useThemeStore()

  useEffect(() => {
    document.body.classList.remove("light", "dark")
    document.body.classList.add(theme)
  }, [theme])

  return (
    <>
      <Container>
        <nav className={styles.nav}>
          <NavLink
            to={Path.Density}
            end
            className={({ isActive }) => (isActive ? `${styles.link} ${styles.active}` : styles.link)}
          >
            Density
          </NavLink>
          <NavLink
            to={Path.Login}
            className={({ isActive }) => (isActive ? `${styles.link} ${styles.active}` : styles.link)}
          >
            Login
          </NavLink>
          <NavLink
            to={Path.Main}
            className={({ isActive }) => (isActive ? `${styles.link} ${styles.active}` : styles.link)}
          >
            Main
          </NavLink>
          <NavLink
            to={Path.Results}
            className={({ isActive }) => (isActive ? `${styles.link} ${styles.active}` : styles.link)}
          >
            Results
          </NavLink>
        </nav>

        <button onClick={toggleTheme}>Переключить тему</button>
      </Container>
    </>
  )
}
