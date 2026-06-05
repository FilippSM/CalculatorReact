import { Button } from "@/shared/components/Button"
import { SimplePopup } from "@/shared/components/Popup"
import { useFlowViscometerStore } from "../model/flowViscometerStore"
import { FlowViscometerEntity } from "./FlowViscometerEntity"
import styles from "./FlowViscometer.module.scss"

export const FlowViscometer = () => {
  const { entities, addEntity, clearStore } = useFlowViscometerStore()

  const description =
    "Расчет выполняется автоматически: выберите набор вискозиметров в поле Viscometers, введите минимальное время истечения в поле Flow time и предполагаемую вязкость в поле Estimated viscosity. " +
    "В списке отобразятся вискозиметры, у которых рассчитанное время истечения не меньше заданного значения. Кнопка Add calc добавляет независимый калькулятор для отдельного расчета."

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Selection of viscometers</h1>
        <SimplePopup description={description} />
      </div>

      {entities.map((entity) => (
        <FlowViscometerEntity key={entity.id} entity={entity} />
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
