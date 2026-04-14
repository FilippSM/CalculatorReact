import { Button } from "@/shared/components/Button"
import { SimplePopup } from "@/shared/components/Popup"

import { useDensityStore } from "../model/densityStore"
import { DensityEntity } from "./DensityEntity"

import styles from "./Density.module.scss"

export const Density = () => {
  const { entities, addEntity } = useDensityStore()

  const description = 'Расчет происходит автоматически, необходимо ввести данные в поле Density и Temperature'

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Calculate GOST 3900</h1>
        <SimplePopup description={description}/>
      </div>

      {entities.map((entity) => (
        <DensityEntity key={entity.id} entity={entity} />
      ))}

      <Button variant="add" onClick={addEntity}>
        Add calc
      </Button>
    </div>
  )
}
