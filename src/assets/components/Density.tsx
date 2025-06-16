import { TextField } from "@mui/material";
import "../../App.css";
import { useEffect, useState, type ChangeEvent } from "react";
import styles from "./Density.module.css";
import { valuesDensity } from "./bdDensity";

export const Density = () => {
  const [data, setData] = useState<string>("");
  const [dataTemperature, setDataTemperature] = useState<string>("");
  const [post, setPost] = useState<number | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Разрешаем: цифры и ..
    const cleaned = value.replace(/[^0-9,. ]/g, "");
    setData(cleaned);
  };
  const handleTemprerature = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Разрешаем: цифры и ..
    const cleaned = value.replace(/[^0-9,. ]/g, "");
    setDataTemperature(cleaned);
  };

  const calcDensity20 = () => {
    const numDens = Number(data.replace(",", "."));
    const numTemp = dataTemperature.replace(",", ".");

    const aroundNumDens = (Math.ceil(numDens * 100) / 100).toFixed(3);

    const densForTable = String(aroundNumDens).padEnd(6, "0");
    let tempForTable = numTemp;

    if (!numTemp.includes(".")) {
      tempForTable = tempForTable.padEnd(tempForTable.length + 2, ".0"); // Добавляем ".0"
    }

    const densityInTable = valuesDensity[densForTable][tempForTable];
    console.log(densityInTable);

    return densityInTable;
  };

  useEffect(() => {
    if (data === "" || dataTemperature === "") {
      setPost(null);
      return;
    }

    const density = Number(calcDensity20());
    setPost(density);
  }, [data, dataTemperature]);

  return (
    <div className={styles.container}>
      <h4>Расчет плотности по ГОСТ 3900</h4>
      <div className={styles.inputs}>
        <TextField
          label="Density"
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
          label="Temperature"
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

      <div className={styles.result}>{
      `Result: ${post !== null ? post : ""} ${post !== null ? "г/см*куб" : ""}`}
      </div>
    </div>
  );
};
