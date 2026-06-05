import { Button } from "@/shared/components/Button"
import { SimplePopup } from "@/shared/components/Popup"
import { useIndexViscosityStore } from "../model/indexViscosityStore"
import { IndexViscosityEntity } from "./IndexViscosityEntity"
import styles from "./IndexViscosity.module.scss"

export const IndexViscosity = () => {
  const { entities, addEntity, clearStore } = useIndexViscosityStore()

  const description =
    "Расчет выполняется автоматически: введите значения в поля Viscosity 100 °C и Viscosity 40 °C. " +
    "Кнопка + добавляет расчет по нескольким параллельным измерениям, а кнопка Add calc добавляет независимый калькулятор для отдельного расчета."

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Calculation of viscosity index GOST 25371</h1>
        <SimplePopup description={description} />
      </div>

      {entities.map((entity) => (
        <IndexViscosityEntity key={entity.id} entity={entity} />
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
