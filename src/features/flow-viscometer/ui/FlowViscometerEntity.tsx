import { Button } from "@/shared/components/Button"
import { Input } from "@/shared/components/Input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/Select"
import { cleanNumericInput } from "@/features/density/lib"
import { useThemeStore } from "@/app/store"
import clsx from "clsx"
import { useFlowViscometerStore, type FlowViscometerEntityProps } from "../model/flowViscometerStore"
import { useFlowViscometerMatches } from "../model/useFlowViscometerMatches"
import type { FlowViscometerCalibrationFilter } from "../lib/flowViscometerCalc"
import styles from "./FlowViscometer.module.scss"

type Props = {
  entity: FlowViscometerEntityProps
}

const rowKey = (item: { id: number; diameter: number; constant: number }) =>
  `${item.id}-${item.diameter}-${item.constant}`

export const FlowViscometerEntity = ({ entity }: Props) => {
  const theme = useThemeStore((state) => state.theme)
  const { removeEntity, clearEntity, updateCalibrationFilter, updateMinFlowTimeSec, updateEstimatedViscosity } =
    useFlowViscometerStore()
  const entitiesCount = useFlowViscometerStore((state) => state.entities.length)

  const matches = useFlowViscometerMatches(entity)

  return (
    <div className={clsx(styles.entityBlock, styles[`entityBlock--${theme}`])}>
      <div className={styles.controls}>
        <div className={styles.selectBlock}>
          <Select
            value={entity.calibrationFilter}
            onValueChange={(v) => updateCalibrationFilter(entity.id, v as FlowViscometerCalibrationFilter)}
          >
            <SelectTrigger className="w-full max-w-[320px]" label="Viscometers">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="calibrated">Calibrated</SelectItem>
              <SelectItem value="nonCalibrated">Uncalibrated</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Input
          label="Flow time, s"
          type="text"
          value={entity.minFlowTimeSec}
          onChange={(e) => updateMinFlowTimeSec(entity.id, cleanNumericInput(e.currentTarget.value))}
        />
        <Input
          label="Estimated viscosity, mm²/s"
          type="text"
          value={entity.estimatedViscosity}
          onChange={(e) => updateEstimatedViscosity(entity.id, cleanNumericInput(e.currentTarget.value))}
        />
      </div>

      {matches.length > 0 && (
        <div className={styles.results}>
          <div className={styles.resultsTitle}>Viscometers:</div>
          {matches.map((item) => (
            <div key={rowKey(item)} className={styles.resultLine}>
              No. {item.id} d={item.diameter}, efflux time: {item.flowTime.toFixed(2)}
              {item.calibration ? ", calibrated" : ""}
            </div>
          ))}
        </div>
      )}

      {entitiesCount > 1 && (
        <div className={styles.delGroupButton}>
          <Button variant="outlined" className={styles.delButton} onClick={() => removeEntity(entity.id)}>
            X
          </Button>
          <Button variant="outlined" onClick={() => clearEntity(entity.id)}>
            Clear
          </Button>
        </div>
      )}
    </div>
  )
}
