import { Button } from "@/shared/components/Button"
import { SimplePopup } from "@/shared/components/Popup"
import { useFlowViscometerStore } from "../model/flowViscometerStore"
import { FlowViscometerEntity } from "./FlowViscometerEntity"
import styles from "./FlowViscometer.module.scss"

export const FlowViscometer = () => {
  const { entities, addEntity, clearStore } = useFlowViscometerStore()

  const description =
    "Расчёт выполняется сразу при вводе значений. Выберите набор вискозиметров (все, только с калибровкой или без), " +
    "задайте минимальное время истечения, с, и предполагаемую вязкость, сПа. " +
    "Для каждого вискозиметра считается время истечения как отношение предполагаемой вязкости к константе прибора; " +
    "в списке остаются только те, у кого это время не меньше заданного порога. " +
    "Кнопка «Add calc» добавляет отдельный блок расчёта; данные сохраняются при перезагрузке страницы (сессия браузера)."

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Viscometer selection by efflux</h1>
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
