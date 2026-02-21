import { Container } from "@/shared/components/Container/Container"
import { Button } from "@/shared/components/Button"
import { SimplePopup } from "@/shared/components/Popup"

import { useDensityStore } from "../model/densityStore"
import { DensityEntity } from "./DensityEntity"

import styles from "./Density.module.scss"

export const Density = () => {
  const { entities, addEntity } = useDensityStore()

  return (
    <Container>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Расчет плотности по ГОСТ 3900 № 1</h1>
          <SimplePopup />
        </div>

        {entities.map((entity) => (
          <DensityEntity key={entity.id} entity={entity} />
        ))}

        <Button variant="add" onClick={addEntity}>
          Add calc
        </Button>
      </div>
    </Container>
  )
}
