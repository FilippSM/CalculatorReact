import { Button } from "@/shared/components/Button"
import { SimplePopup } from "@/shared/components/Popup"
import { useIndexViscosityStore } from "../model/indexViscosityStore"
import { IndexViscosityEntity } from "./IndexViscosityEntity"
import styles from "./IndexViscosity.module.scss"

export const IndexViscosity = () => {
  const { entities, addEntity, clearStore } = useIndexViscosityStore()

  const description =
    "Расчёт выполняется автоматически. Введите кинематическую вязкость при 100 °C и 40 °C (мм²/с). " +
    "У каждого отдельного расчёта (кнопка Add calc) свой набор данных и свой индекс вязкости. " +
    "При нескольких строках в расчёт итогового индекса входят только полностью заполненные строки (оба поля); " +
    "по ним усредняются вязкости, затем вычисляется индекс вязкости (как в калькуляторе вязкости по ГОСТ 33)."

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Viscosity index</h1>
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
