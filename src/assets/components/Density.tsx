import { TextField } from "@mui/material";
import "../../App.css";
import { useState, type ChangeEvent } from "react";

export const Density = () => {
  const [data, setData] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Разрешаем: цифры, пробелы и слеши
    const cleaned = value.replace(/[^0-9 ]/g, "");
    setData(cleaned);
  };

  return (
    <>
      <TextField
        id="outlined-basic"
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
        id="outlined-basic"
        label="Temperature"
        variant="outlined" 
        value={data}      
      />
    </>
  );
};
