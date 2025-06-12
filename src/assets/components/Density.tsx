import { TextField } from "@mui/material";
import "../../App.css";
import { useState, type ChangeEvent } from "react";
import styles from "./Density.module.css";
import { valuesDensity } from "./bdDensity";

export const Density = () => {
  const [data, setData] = useState<string>("");
  const [dataTemperature, setDataTemperature] = useState<string>("");

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

  const mathDensity20 = () => {
    const density = "0.5600".padEnd(6, "0");
    const temerature = "24.0";

    
    const densityInTable = valuesDensity[density];
    return densityInTable;
  };

  console.log(mathDensity20());

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

      <div className={styles.result}>{`Result: ${data + dataTemperature}`}</div>
    </div>
  );
};
