import { Path } from "@/app/routing"
import { useThemeStore } from "@/app/store"
import { Button } from "@/shared/components/Button"
import { Container } from "@/shared/components/Container"
import { useEffect } from "react"
import { Link } from "react-router"
import styles from "./Header.module.css"

export const Header = () => {
  const { theme, toggleTheme } = useThemeStore()

  useEffect(() => {
    document.body.classList.remove("light", "dark")
    document.body.classList.add(theme)
  }, [theme])

  return (
    <>
      <Container className={styles.container}>
        <nav className={styles.nav}>
          <Button asChild variant="secondary">
            <Link to={Path.Tests}>Test</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link to={Path.Login}>Login</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link to={Path.Main}>Main</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link to={Path.Results}>Results</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link to={Path.Calc}>Calc</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link to={Path.CalcX}>CalcX</Link>
          </Button>
        </nav>

        <Button onClick={toggleTheme} variant="theme" themeMode={theme}>
          {theme === "light" ? "Light Mode" : "Dark Mode"}
        </Button>
      </Container>
    </>
  )
}
