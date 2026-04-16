import { SimplePopup } from "@/shared/components/Popup"
import styles from "./ViscosityCalculator.module.scss"
import { useEffect, useState } from "react"
import { Input } from "@/shared/components/Input"
import { Button } from "@/shared/components/Button"

import { calculateViscosity, calculateIV, convertToSeconds, normalizeNumber } from "../lib/viscosty"
import { useThemeStore } from "@/app/store"
import clsx from "clsx"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/Select"
import { constansVisc } from "../constans/constans-visc"
import { useDebounce } from "@/shared/hooks/useDebounce"
import { useViscosityStore, type ViscosityEntity } from "../model/storeViscosityCalculator"

type ViscosityCalculatorEntityProps = {
  entityId: string
}

const ViscosityCalculatorEntity = ({ entityId }: ViscosityCalculatorEntityProps) => {
  const theme = useThemeStore((state) => state.theme)

  const entitiesCount = useViscosityStore((s) => s.entities.length)
  const entity = useViscosityStore((s) => s.entities.find((e) => e.id === entityId))
  const { setDataMode, updateGroup100, updateGroup40, addGroup100, addGroup40, removeGroup100, removeGroup40, removeEntity, clearEntity } =
    useViscosityStore()

  const data = entity?.dataMode ?? "input"
  const groups100 = entity?.groups100 ?? []
  const groups40 = entity?.groups40 ?? []

  const [result100, setResult100] = useState<number | null>(null)
  const [result40, setResult40] = useState<number | null>(null)
  const [iv, setIV] = useState<number | null>(null)

  const debouncedGroups100 = useDebounce(groups100, 500)
  const debouncedGroups40 = useDebounce(groups40, 500)
  const debouncedData = useDebounce(data, 100)

  const calculate = () => {
    const viscosityValues100 = debouncedGroups100
      .map((group) => {
        const t100 = convertToSeconds(group.time)
        const c100 = normalizeNumber(group.constant)
        return calculateViscosity(t100, c100)
      })
      .filter((value) => !isNaN(value))

    const viscosityValues40 = debouncedGroups40
      .map((group) => {
        const t40 = convertToSeconds(group.time)
        const c40 = normalizeNumber(group.constant)
        return calculateViscosity(t40, c40)
      })
      .filter((value) => !isNaN(value))

    const v100 =
      viscosityValues100.length > 0 ? viscosityValues100.reduce((sum, value) => sum + value, 0) / viscosityValues100.length : NaN

    const v40 =
      viscosityValues40.length > 0 ? viscosityValues40.reduce((sum, value) => sum + value, 0) / viscosityValues40.length : NaN

    const ivValue = calculateIV(v100, v40)

    setResult100(v100)
    setResult40(v40)
    setIV(ivValue)
  }

  useEffect(() => {
    calculate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedGroups100, debouncedGroups40, debouncedData])

  const dataMode: ViscosityEntity["dataMode"] = data as ViscosityEntity["dataMode"]

  if (!entity) return null

  return (
    <div className={clsx(styles.entityBlock, styles[`entityBlock--${theme}`])}>
      <div>
        <Select value={dataMode} onValueChange={(v) => setDataMode(entityId, v as ViscosityEntity["dataMode"])}>
          <SelectTrigger className="w-[180px]" label={"Select data"}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={"input"}>input</SelectItem>
            <SelectItem value={"select"}>select</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className={styles.viscositysBlock}>
        {groups100.map((group, index) => (
          <div key={group.id} className={styles.viscosityBlock}>
            <Input label="Time 100°C" value={group.time} onValueChange={(value) => updateGroup100(entityId, group.id, "time", value)} />

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
                  <SelectTrigger className="w-[180px]" label={"Viscometer 100°C"}>
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
            <Input label="Time 40°C" value={group.time} onValueChange={(value) => updateGroup40(entityId, group.id, "time", value)} />

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
                  <SelectTrigger className="w-[180px]" label={"Viscometer 40°C"}>
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

      <div>Result100: {result100 !== null && !isNaN(result100) ? result100 : ""}</div>
      <div>Result40: {result40 !== null && !isNaN(result40) ? result40 : ""}</div>
      <div>ResultIV: {iv !== null && !isNaN(iv) ? iv : ""}</div>

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
  const description = `Расчет происходит автоматически, выбрать способ ввода константы в Select data,
необходимо ввести данные в поле Time и Constant или выбрать вискозиметр в Viscometr`

  const entities = useViscosityStore((s) => s.entities)
  const addEntity = useViscosityStore((s) => s.addEntity)
  const clearStore = useViscosityStore((s) => s.clearStore)

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Calculate GOST 33</h1>
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
