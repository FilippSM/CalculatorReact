import { SimplePopup } from "@/shared/components/Popup"
import styles from "./ViscosityCalculator.module.scss"
import { useState } from "react"
import { Input } from "@/shared/components/Input"
import { Button } from "@/shared/components/Button"

import { calculateViscosity, calculateIV, convertToSeconds, normalizeNumber } from "../lib/viscosty"
import { useThemeStore } from "@/app/store"
import clsx from "clsx"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/Select"

export const ViscosityCalculator = () => {
  const theme = useThemeStore((state) => state.theme)

  const [time100, setTime100] = useState("")
  const [time40, setTime40] = useState("")
  const [const100, setConst100] = useState("")
  const [const40, setConst40] = useState("")

  const [result100, setResult100] = useState<number | null>(null)

  const [result40, setResult40] = useState<number | null>(null)

  const [iv, setIV] = useState<number | null>(null)

  const handleCalculate = () => {
    const t100 = convertToSeconds(time100)
    const t40 = convertToSeconds(time40)

    const c100 = normalizeNumber(const100)
    const c40 = normalizeNumber(const40)

    const v100 = calculateViscosity(t100, c100)

    const v40 = calculateViscosity(t40, c40)

    const ivValue = calculateIV(v100, v40)

    setResult100(v100)
    setResult40(v40)
    setIV(ivValue)
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Расчет вязкости по ГОСТ 33 № 2</h1>
        <SimplePopup />
      </div>
      <div className={clsx(styles.entityBlock, styles[`entityBlock--${theme}`])}>
        <div>
          <Input label="Time 100°C" value={time100} onValueChange={setTime100} />
          <Input label="Constant 100°C" value={const100} onValueChange={setConst100} />
          <Input label="Time 40°C" value={time40} onValueChange={setTime40} />
          <Input label="Constant 40°C" value={const40} onValueChange={setConst40} />
        </div>
        <div>
          <div>
            <Select onValueChange={() => {}}>
              <SelectTrigger className="w-[180px]" label={"Correction"}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={"0"}>-</SelectItem>
                <SelectItem value={"0.0014"}>{"1"}</SelectItem>
                <SelectItem value={"0.0007"}>{"2"}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Select onValueChange={() => {}}>
              <SelectTrigger className="w-[180px]" label={"Unit"}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={"г/см³"}>г/см³</SelectItem>
                <SelectItem value={"кг/м³"}>кг/м³</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button onClick={handleCalculate} fullWidth>
          Calculate
        </Button>

        <div>Result100: {result100 ?? ""}</div>
        <div>Result40: {result40 ?? ""}</div>
        <div>ResultIV: {iv ?? ""}</div>
      </div>
    </div>
  )
}
