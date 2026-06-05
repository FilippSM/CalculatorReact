import { Button } from "@/shared/components/Button"
import { SimplePopup } from "@/shared/components/Popup"

import { useDensityStore } from "../model/densityStore"
import { DensityEntity } from "./DensityEntity"

import styles from "./Density.module.scss"

export const Density = () => {
  const { entities, addEntity, clearStore } = useDensityStore()

  const description = 'Расчет выполняется автоматически: введите значения в поля Density и Temperature. Кнопка + добавляет расчет по нескольким параллельным измерениям, а кнопка Add calc добавляет независимый калькулятор для отдельного расчета.'

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Calculation of density GOST 3900</h1>
        <SimplePopup description={description}/>
      </div>

      {entities.map((entity) => (
        <DensityEntity key={entity.id} entity={entity} />
      ))}

      <Button variant="add" onClick={addEntity}>
        Add calc
      </Button>
      <Button variant="outlined" onClick={clearStore}>
        Clear
      </Button>
    </div>
  )
}
