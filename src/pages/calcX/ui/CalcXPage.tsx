import { Container } from "@/shared/components/Container"
import { CalcXProtocol } from "@/widgets/calc-x-protocol"
import styles from "./CalcXPage.module.scss"

export const CalcX = () => {
  return (
    <Container className={styles.pageContainer}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Calculation protocol data</h1>
        </div>

        <CalcXProtocol />
      </div>
    </Container>
  )
}
