import { SimplePopup } from "@/shared/components/Popup"
import styles from "./ViscosityCalculator.module.scss"
import { useState, useEffect } from "react"
import { Input } from "@/shared/components/Input"
import { Button } from "@/shared/components/Button"

import { calculateViscosity, calculateIV, convertToSeconds, normalizeNumber } from "../lib/viscosty"
import { useThemeStore } from "@/app/store"
import clsx from "clsx"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/Select"
import { constansVisc } from "../constans/constans-visc"
import { useDebounce } from "@/shared/hooks/useDebounce"

export const ViscosityCalculator = () => {
  const theme = useThemeStore((state) => state.theme)

  const [time100, setTime100] = useState("")
  const [time40, setTime40] = useState("")
  const [const100, setConst100] = useState("")
  const [const40, setConst40] = useState("")
  const [data, setData] = useState("input")

  const [result100, setResult100] = useState<number | null>(null)
  const [result40, setResult40] = useState<number | null>(null)
  const [iv, setIV] = useState<number | null>(null)

  // Apply debounce to all input values
  const debouncedTime100 = useDebounce(time100, 500)
  const debouncedTime40 = useDebounce(time40, 500)
  const debouncedConst100 = useDebounce(const100, 500)
  const debouncedConst40 = useDebounce(const40, 500)
  const debouncedData = useDebounce(data, 100)

  const handleCalculate = () => {
    const t100 = convertToSeconds(debouncedTime100)
    const t40 = convertToSeconds(debouncedTime40)

    const c100 = normalizeNumber(debouncedConst100)
    const c40 = normalizeNumber(debouncedConst40)

    const v100 = calculateViscosity(t100, c100)
    const v40 = calculateViscosity(t40, c40)
    const ivValue = calculateIV(v100, v40)

    setResult100(v100)
    setResult40(v40)
    setIV(ivValue)
  }

  // Handle mode switch - reset constants when switching between input and select
  const handleDataModeChange = (newMode: string) => {
    setData(newMode)
    // Reset constants when switching modes to avoid stale data
    setConst100("")
    setConst40("")
  }

  // Trigger calculation when debounced values change
  useEffect(() => {
    handleCalculate()
  }, [debouncedTime100, debouncedTime40, debouncedConst100, debouncedConst40, debouncedData])

  const description = `Расчет происходит автоматически, выбрать способ ввода константы в Select data, 
необходимо ввести данные в поле Time и Constant или выбрать вискозиметр в Viscometr`

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Calculate GOST 33</h1>
        <SimplePopup description={description} />
      </div>
      <div className={clsx(styles.entityBlock, styles[`entityBlock--${theme}`])}>
        <div>
          <Select value={data} onValueChange={handleDataModeChange}>
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
          <div className={styles.viscosityBlock}>
            <Input label="Time 100°C" value={time100} onValueChange={setTime100} />

            {data === "input" ? (
              <Input
                key="const100-input" // Add key to force re-render
                label="Constant 100°C"
                value={const100}
                onValueChange={setConst100}
              />
            ) : (
              <div>
                <Select
                  key="const100-select" // Add key to force re-render
                  onValueChange={setConst100}
                  value={const100 || ""}
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

            <Button variant="add" onClick={() => {}}>
              +
            </Button>
          </div>

          <div className={styles.viscosityBlock}>
            <Input label="Time 40°C" value={time40} onValueChange={setTime40} />

            {data === "input" ? (
              <Input
                key="const40-input" // Add key to force re-render
                label="Constant 40°C"
                value={const40}
                onValueChange={setConst40}
              />
            ) : (
              <div>
                <Select
                  key="const40-select" // Add key to force re-render
                  onValueChange={setConst40}
                  value={const40 || ""}
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

            <Button variant="add" onClick={() => {}}>
              +
            </Button>
          </div>
        </div>

        <div>Result100: {result100 !== null && !isNaN(result100) ? result100 : ""}</div>
        <div>Result40: {result40 !== null && !isNaN(result40) ? result40 : ""}</div>
        <div>ResultIV: {iv !== null && !isNaN(iv) ? iv : ""}</div>
      </div>
      <Button variant="add" onClick={() => {}}>
        Add calc
      </Button>
    </div>
  )
}
