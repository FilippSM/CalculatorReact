import { useEffect, useState, type ChangeEvent } from "react"
import styles from "./Density.module.css"

import { useDebounce } from "@/shared/hooks/useDebounce"
import { useSaveDensityMutation } from "../api/densityApi"
import { valuesDensity } from "../lib/bdDensity"
import { Container } from "@/shared/components/Container/Container"
import { SimplePopup } from "../../../shared/components/Popup"
import { Input } from "@/shared/components/Input"
import { Button } from "@/shared/components/Button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/Select"
import { useDensityStore } from "@/app/store/densityStore"

// Импортируем хранилище


export const cleanNumericInput = (value: string): string => {
  return value.replace(/[^0-9,. ]/g, "")
}

export const Density = () => {
  const [correction, setCorrection] = useState<string>("0.0014")
  const [unit, setUnit] = useState<string>("кг/м³")
  const [post, setPost] = useState<string | null>(null)
  const [convertStatus, setConvertStatus] = useState<string>("")
  
  // Используем Zustand store
  const { groups, addGroup, updateGroupDensity, updateGroupTemperature } = useDensityStore()

  const debouncedGroups = useDebounce(groups, 300)

  const [saveDensity] = useSaveDensityMutation()

  const handleSave = async () => {
    if (!post) return

    const densityData = { density: post }

    try {
      await saveDensity(densityData)
      // Очищаем все группы
      groups.forEach(group => {
        updateGroupDensity(group.id, "")
        updateGroupTemperature(group.id, "")
      })
      setPost(null)
      setConvertStatus("")
    } catch (error) {
      console.error("Ошибка сохранения:", error)
    }
  }

  const handleChangeCorrection = (value: string) => {
    setCorrection(value)
  }

  const handleChangeUnit = (value: string) => {
    setUnit(value)
  }

  const calcDensityForGroup = (density: string, temperature: string): number | null => {
    if (!density || !temperature) return null

    try {
      let numDens = Number(density.replace(",", "."))

      // Для "кг/м3"
      if (unit === "кг/м³" && numDens > 1.11) {
        numDens = numDens / 1000
      } else if (unit === "г/см³" && numDens > 1.11) {
        numDens = numDens / 1000
      }

      const numTemp = temperature.replace(",", ".")
      const aroundNumDens = (Math.ceil(numDens * 100) / 100).toFixed(3)
      const densForTable = String(aroundNumDens).padEnd(6, "0")
      let tempForTable = numTemp

      if (!numTemp.includes(".")) {
        tempForTable = tempForTable.padEnd(tempForTable.length + 2, ".0")
      }

      const correctionDensity = Number(aroundNumDens) - numDens
      
      // Проверяем существует ли значение в таблице
      if (!valuesDensity[densForTable] || !valuesDensity[densForTable][tempForTable]) {
        return null
      }
      
      const densInTable = valuesDensity[densForTable][tempForTable]

      let densityInTable = densInTable - correctionDensity + Number(correction)

      // Для "кг/м3"
      if (unit === "кг/м³") {
        densityInTable = densityInTable * 1000
      }

      return densityInTable
    } catch (error) {
      console.log("Error calculating density:", error)
      return null
    }
  }

  useEffect(() => {
    // Рассчитываем результат для каждой группы
    const results = groups.map(group => 
      calcDensityForGroup(group.density, group.temperature)
    ).filter((result): result is number => result !== null)

    // Устанавливаем статус конвертации для отображения
    const hasHighValue = groups.some(group => {
      if (!group.density) return false
      const numDens = Number(group.density.replace(",", "."))
      return (unit === "кг/м³" && numDens > 1.11) || (unit === "г/см³" && numDens > 1.11)
    })

    if (hasHighValue) {
      setConvertStatus(unit === "кг/м³" ? "density converting in kg/m³" : "density converting in g/cm³")
    } else {
      setConvertStatus("")
    }

    // Рассчитываем средний результат
    if (results.length > 0) {
      const sum = results.reduce((acc, val) => acc + val, 0)
      const average = sum / results.length
      
      // Форматируем результат в зависимости от единиц измерения
      const formattedResult = unit === "кг/м³" ? average.toFixed(1) : average.toFixed(4)
      setPost(formattedResult)
      console.log("Results:", results, "Average:", formattedResult) // Для отладки
    } else {
      setPost(null)
    }

  }, [debouncedGroups, correction, unit])

  return (
    <Container>
      <div className={styles.container}>
        <div className={styles["header-dencity"]}>
          <h1>Расчет плотности по ГОСТ 3900 № 1</h1>
          <SimplePopup />
        </div>
        <div className={styles.inputs}>
          <div>
            <Select value={correction} onValueChange={handleChangeCorrection}>
              <SelectTrigger className="w-[180px]" label={"Correction"}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={"0"}>-</SelectItem>
                <SelectItem value={"0.0014"}>{unit === "кг/м³" ? "1.4" : "0.0014"}</SelectItem>
                <SelectItem value={"0.0007"}>{unit === "кг/м³" ? "0.7" : "0.0007"}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Select value={unit} onValueChange={handleChangeUnit}>
              <SelectTrigger className="w-[180px]" label={"Unit"}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={"г/см³"}>г/см³</SelectItem>
                <SelectItem value={"кг/м³"}>кг/м³</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Отрисовка групп полей из Zustand store */}
          {groups.map((group, index) => {
            const groupResult = calcDensityForGroup(group.density, group.temperature)
            
            return (
              <div key={group.id} className={styles["inputs-group"]}>
                <Input
                  label={`Density, ${unit === "кг/м³" ? "kg/m³" : "g/cm³"}`}
                  type="text"
                  value={group.density}
                  onChange={(e) => updateGroupDensity(group.id, cleanNumericInput(e.currentTarget.value))}
                />
                <Input 
                  label="Temperature, °C" 
                  type="text" 
                  value={group.temperature}
                  onChange={(e) => updateGroupTemperature(group.id, e.currentTarget.value.replace(/[^0-9,. ]/g, ""))}
                />
                {/* Отображаем результат для каждой группы */}
                {groupResult !== null && (
                  <span className={styles.groupResult}>
                    {groupResult.toFixed(unit === "кг/м³" ? 1 : 4)}
                  </span>
                )}
                {/* Кнопка "+" только для последней группы */}
                {index === groups.length - 1 && (
                  <Button variant="outlined" onClick={addGroup}>+</Button>
                )}
              </div>
            )
          })}
        </div>

        <div className={styles.result}>
          <p>{convertStatus}</p>
          {post !== null ? (
            <>
              {`Средний результат: ${post} ${unit === "кг/м³" ? "kg/m³" : "g/cm³"}`}
            </>
          ) : (
            "Введите значения плотности и температуры"
          )}
        </div>
        <Button className={styles.buttonSave} variant="primary" onClick={handleSave}>
          Save
        </Button>
      </div>
    </Container>
  )
}