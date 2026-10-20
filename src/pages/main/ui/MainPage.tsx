import { Container } from "@/shared/components/Container"
import styles from "./MainPage.module.css"

export const Main = () => {
  return (
    <Container>
      <div className={styles.hero}>
        <h1 className={styles.title}>Система управления лабораторной информацией</h1>
        <img
          className={styles.image}
          src={`${import.meta.env.BASE_URL}mainPicture.png`}
          alt="Производственный процесс: от сырья до готовой продукции"
        />
      </div>
    </Container>
  )
}
