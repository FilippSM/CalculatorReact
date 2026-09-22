import { SimplePopup } from "@/shared/components/Popup"
import styles from "./ViscosityCalculator.module.scss"
import { useMemo } from "react"
import { Input } from "@/shared/components/Input"
import { Button } from "@/shared/components/Button"

import {
  VISCOSITY_AVERAGE_SIGNIFICANT_DIGITS,
  calculateIV,
  calculateViscosity,
  convertToSeconds,
  normalizeNumber,
  roundToSignificantFigures,
} from "../lib/viscosty"
import { useThemeStore } from "@/app/store"
import clsx from "clsx"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/Select"
import { constansVisc } from "../constans/constans-visc"
import { useViscosityStore, type ViscosityEntity, type ViscosityGroup } from "../model/storeViscosityCalculator"

const EMPTY_VISCOSITY_GROUPS: ViscosityGroup[] = []

type ViscosityCalculatorEntityProps = {
  entityId: string
}

const getGroupResult = (time: string, constant: string, flowTimeFormat: ViscosityEntity["flowTimeFormat"]) => {
  const t = flowTimeFormat === "sec" ? normalizeNumber(time) : convertToSeconds(time)
  const c = normalizeNumber(constant)
  const result = calculateViscosity(t, c)
  return isNaN(result) ? null : result
}

const getAverageResult = (values: Array<number | null>) => {
  const validValues = values.filter((value): value is number => value !== null)
  if (validValues.length === 0) return null
  const average = validValues.reduce((sum, value) => sum + value, 0) / validValues.length
  return roundToSignificantFigures(average, VISCOSITY_AVERAGE_SIGNIFICANT_DIGITS)
}

const ViscosityCalculatorEntity = ({ entityId }: ViscosityCalculatorEntityProps) => {
  const theme = useThemeStore((state) => state.theme)

  const entitiesCount = useViscosityStore((s) => s.entities.length)
  const entity = useViscosityStore((s) => s.entities.find((e) => e.id === entityId))
  const {
    setDataMode,
    setFlowTimeFormat,
    updateGroup100,
    updateGroup40,
    addGroup100,
    addGroup40,
    removeGroup100,
    removeGroup40,
    removeEntity,
    clearEntity,
  } = useViscosityStore()

  const data = entity?.dataMode ?? "input"
  const timeFormat = entity?.flowTimeFormat ?? "sec"
  const groups100 = entity?.groups100 ?? EMPTY_VISCOSITY_GROUPS
  const groups40 = entity?.groups40 ?? EMPTY_VISCOSITY_GROUPS

  const groupResults100 = useMemo(
    () => groups100.map((group) => getGroupResult(group.time, group.constant, timeFormat)),
    [groups100, timeFormat],
  )
  const groupResults40 = useMemo(
    () => groups40.map((group) => getGroupResult(group.time, group.constant, timeFormat)),
    [groups40, timeFormat],
  )

  const result100 = useMemo(() => getAverageResult(groupResults100), [groupResults100])
  const result40 = useMemo(() => getAverageResult(groupResults40), [groupResults40])

  const iv = useMemo(() => {
    if (result100 === null || result40 === null) return null
    const value = calculateIV(result100, result40)
    return isNaN(value) ? null : value
  }, [result100, result40])

  const dataMode: ViscosityEntity["dataMode"] = data as ViscosityEntity["dataMode"]
  const flowTimeFormat: ViscosityEntity["flowTimeFormat"] = timeFormat as ViscosityEntity["flowTimeFormat"]

  if (!entity) return null

  return (
    <div className={clsx(styles.entityBlock, styles[`entityBlock--${theme}`])}>
      <div>
        <Select value={dataMode} onValueChange={(v) => setDataMode(entityId, v as ViscosityEntity["dataMode"])}>
          <SelectTrigger label={"Select data"}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={"input"}>input</SelectItem>
            <SelectItem value={"select"}>select</SelectItem>
          </SelectContent>
        </Select>
        <div className={styles.flowTimeFormatSelect}>
          <Select
            value={flowTimeFormat}
            onValueChange={(v) => setFlowTimeFormat(entityId, v as ViscosityEntity["flowTimeFormat"])}
          >
            <SelectTrigger className={styles.flowTimeFormatTrigger} label={"Select format flow time"}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={"sec"}>sec</SelectItem>
              <SelectItem value={"timer"}>min:sec:millisec</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className={styles.viscositysBlock}>
        {groups100.map((group, index) => (
          <div key={group.id} className={styles.viscosityBlock}>
            <Input label="Flow time 100°C, s" value={group.time} onValueChange={(value) => updateGroup100(entityId, group.id, "time", value)} />

            {dataMode === "input" ? (
              <Input
                key={`const100-input-${group.id}`}
                label="Constant 100°C"
                value={group.constant}
                onValueChange={(value) => updateGroup100(entityId, group.id, "constant", value)}
              />
            ) : (
              <div>
                <Select
                  key={`const100-select-${group.id}`}
                  onValueChange={(value) => updateGroup100(entityId, group.id, "constant", value)}
                  value={group.constant || ""}
                >
                  <SelectTrigger className={styles.viscometerTrigger} label={"Viscometer 100°C"}>
                    <SelectValue placeholder="Select viscometer" />
                  </SelectTrigger>
                  <SelectContent>
                    {constansVisc.map((item) => (
                      <SelectItem key={item.id} value={item.constant.toString()}>
                        {item.id}, diameter: {item.diameter}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            {groups100.length > 1 && groupResults100[index] !== null && (
              <div className={styles.groupResult}>
                <div>Result 100°C:</div>
                <div>{groupResults100[index]}</div>
              </div>
            )}

            {index === groups100.length - 1 && (
              <Button variant="add" onClick={() => addGroup100(entityId)}>
                +
              </Button>
            )}
            {groups100.length > 1 && (
              <Button variant="outlined" className={styles.delButtonVisc} onClick={() => removeGroup100(entityId, group.id)}>
                X
              </Button>
            )}
          </div>
        ))}

        {groups40.map((group, index) => (
          <div key={group.id} className={styles.viscosityBlock}>
            <Input label="Flow time 40°C, s" value={group.time} onValueChange={(value) => updateGroup40(entityId, group.id, "time", value)} />

            {dataMode === "input" ? (
              <Input
                key={`const40-input-${group.id}`}
                label="Constant 40°C"
                value={group.constant}
                onValueChange={(value) => updateGroup40(entityId, group.id, "constant", value)}
              />
            ) : (
              <div>
                <Select
                  key={`const40-select-${group.id}`}
                  onValueChange={(value) => updateGroup40(entityId, group.id, "constant", value)}
                  value={group.constant || ""}
                >
                  <SelectTrigger className={styles.viscometerTrigger} label={"Viscometer 40°C"}>
                    <SelectValue placeholder="Select viscometer" />
                  </SelectTrigger>
                  <SelectContent>
                    {constansVisc.map((item) => (
                      <SelectItem key={item.id} value={item.constant.toString()}>
                        {item.id}, diameter: {item.diameter}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            {groups40.length > 1 && groupResults40[index] !== null && (
              <div className={styles.groupResult}>
                <div>Result 40°C:</div>
                <div>{groupResults40[index]}</div>
              </div>
            )}

            {index === groups40.length - 1 && (
              <Button variant="add" onClick={() => addGroup40(entityId)}>
                +
              </Button>
            )}
            {groups40.length > 1 && (
              <Button variant="outlined" className={styles.delButtonVisc} onClick={() => removeGroup40(entityId, group.id)}>
                X
              </Button>
            )}
          </div>
        ))}
      </div>

      {(result100 !== null || result40 !== null || iv !== null) && (
        <div className={styles.entitySummary}>
          {result100 !== null && <div>Average result 100°C: {result100}</div>}
          {result40 !== null && <div>Average result 40°C: {result40}</div>}
          {iv !== null && <div>Average viscosity index: {iv}</div>}
        </div>
      )}

      {entitiesCount > 1 && (
        <div className={styles.delEntityButton}>
          <Button variant="outlined" className={styles.delButtonVisc} onClick={() => removeEntity(entityId)}>
            X
          </Button>
          <Button variant="outlined" onClick={() => clearEntity(entityId)}>
            Clear
          </Button>
        </div>
      )}
    </div>
  )
}

export const ViscosityCalculator = () => {
  const description = `Расчет выполняется автоматически: выберите способ ввода данных в поле Select data и формат времени истечения в поле Select format flow time. Для Flow time можно выбрать ввод в секундах, например 321.01, или формат секундомера min:sec:millisec, например 5:21:01. В режиме input введите Constant, а в режиме select выберите вискозиметр в поле Viscometer. Кнопка + добавляет расчет по нескольким параллельным измерениям, а кнопка Add calc добавляет независимый калькулятор для отдельного расчета.`

  const entities = useViscosityStore((s) => s.entities)
  const addEntity = useViscosityStore((s) => s.addEntity)
  const clearStore = useViscosityStore((s) => s.clearStore)

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Calculation of viscosity GOST 33</h1>
        <SimplePopup description={description} />
      </div>

      {entities.map((entity) => (
        <ViscosityCalculatorEntity key={entity.id} entityId={entity.id} />
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
