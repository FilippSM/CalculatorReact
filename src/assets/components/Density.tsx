import { FormControl, InputLabel, MenuItem, Select, TextField, type SelectChangeEvent } from "@mui/material"
import { useEffect, useState, type ChangeEvent } from "react"
import styles from "./Density.module.css"
import { valuesDensity } from "./bdDensity"
import { SimplePopup } from "./SimplePopup"
import { useDebounce } from "../utils/useDebounce"

export const Density = () => {
  const [correction, setCorrection] = useState<string>("0.0014")
  const [unit, setUnit] = useState<string>("кг/м³")
  const [data, setData] = useState<string>("")
  const [dataTemperature, setDataTemperature] = useState<string>("")
  const [post, setPost] = useState<string | null>(null)
  const [convertStatus, setConvertStatus] = useState<string>("")

  const debouncedData = useDebounce(data, 300);
  const debouncedTemperature = useDebounce(dataTemperature, 300);

  const handleChangeCorrection = (e: SelectChangeEvent<string>) => {
    setCorrection(e.target.value)
  }

  const handleChangeUnit = (e: SelectChangeEvent<string>) => {
    setUnit(e.target.value)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    // Разрешаем: цифры и ..
    const cleaned = value.replace(/[^0-9,. ]/g, "")
    setData(cleaned)
  }
  const handleTemprerature = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    // Разрешаем: цифры и ..
    const cleaned = value.replace(/[^0-9,. ]/g, "")
    setDataTemperature(cleaned)
  }

  const calcDensity20 = () => {
    try {
      let numDens = Number(data.replace(",", "."))

      //для "кг/м3"
      if (unit === "кг/м³" && numDens > 1.11) {
        numDens = numDens / 1000
        setConvertStatus("")
      } else if (unit === "кг/м³" && numDens < 1.11) {
        numDens = numDens
        setConvertStatus("density converting in kg/m³")
      } else if (unit === "г/см³" && numDens > 1.11) {
        numDens = numDens / 1000
        setConvertStatus("density converting in g/cm³")
      } else if (unit === "г/см³" && numDens < 1.11) {
        setConvertStatus("")
      }

      const numTemp = dataTemperature.replace(",", ".")
      const aroundNumDens = (Math.ceil(numDens * 100) / 100).toFixed(3)
      const densForTable = String(aroundNumDens).padEnd(6, "0")
      let tempForTable = numTemp

      if (!numTemp.includes(".")) {
        tempForTable = tempForTable.padEnd(tempForTable.length + 2, ".0") // Добавляем ".0"
      }

      const correctionDensity = Number(aroundNumDens) - numDens
      const densInTable = valuesDensity[densForTable][tempForTable]

      let densityInTable = densInTable - correctionDensity + Number(correction)

      //для "кг/м3"
      if (unit === "кг/м³") {
        densityInTable = densityInTable * 1000
        return densityInTable.toFixed(1)
      } else {
        return densityInTable.toFixed(4)
      }
    } catch (error) {
      console.log("Invalid Syntaxis")
      setPost("Invalid Syntaxis")
    }
  }

  useEffect(() => {
    if (debouncedData === "" || debouncedTemperature === "") {
      setPost(null);
      return;
    }

    const density = calcDensity20();
    if (density) {
      setPost(density);
    }
  }, [debouncedData, debouncedTemperature, correction]);


  return (
    <div className={styles.container}>
      <div className={styles.headerDencity}>
        <h4>Расчет плотности по ГОСТ 3900</h4>
        <SimplePopup />
      </div>
      <div className={styles.inputs}>
        <FormControl sx={{ minWidth: 70, maxWidth: 100 }}>
          <InputLabel>correction</InputLabel>
          <Select
            value={correction} // Устанавливаем значение
            label="Correction"
            onChange={handleChangeCorrection} // Обработчик изменения
          >
            <MenuItem value={"0"}>-</MenuItem>
            <MenuItem value={"0.0014"}>{unit === "кг/м³" ? "1.4" : "0.0014"}</MenuItem>
            <MenuItem value={"0.0007"}>{unit === "кг/м³" ? "0.7" : "0.0007"}</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 70, maxWidth: 100 }}>
          <InputLabel>unit</InputLabel>
          <Select
            value={unit} // Устанавливаем значение
            label="Unit"
            onChange={handleChangeUnit} // Обработчик изменения
          >
            <MenuItem value={"г/см³"}>г/см³</MenuItem>
            <MenuItem value={"кг/м³"}>кг/м³</MenuItem>
          </Select>
        </FormControl>
        <div className={styles.inputsGroup}>
          <TextField
            label={`Density, ${unit === "кг/м³" ? "kg/m³" : "g/cm³"}`}
            variant="outlined"
            value={data}
            onChange={handleChange}
            // Дополнительные параметры для лучшего UX
            slotProps={{
              input: {
                inputMode: "numeric",
              },
            }}
          />
          {/* <div>Введенное значение: {data}</div> */}
          <TextField
            label="Temperature, °C"
            variant="outlined"
            value={dataTemperature}
            onChange={handleTemprerature}
            slotProps={{
              input: {
                inputMode: "numeric",
              },
            }}
          />
        </div>
      </div>

      <div className={styles.result}>
        <p>{convertStatus}</p>

        {`Result: ${post !== null ? post : ""}${post !== null ? ` ${unit === "кг/м³" ? "kg/m³" : "g/cm³"}` : ""}`}
      </div>
    </div>
  )
}
