import { useState, useEffect } from "react";
import { valuesDensity } from "../lib/bdDensity";

export const useDensityCalculations = (groups: any[], unit: string, correction: string) => {
  const [post, setPost] = useState<string | null>(null);
  const [convertStatus, setConvertStatus] = useState<string>("");

  const calcDensityForGroup = (density: string, temperature: string): number | null => {
    if (!density || !temperature) return null;

    try {
      let numDens = Number(density.replace(",", "."));

      if (unit === "кг/м³" && numDens > 1.11) {
        numDens = numDens / 1000;
      } else if (unit === "г/см³" && numDens > 1.11) {
        numDens = numDens / 1000;
      }

      const numTemp = temperature.replace(",", ".");
      const aroundNumDens = (Math.ceil(numDens * 100) / 100).toFixed(3);
      const densForTable = String(aroundNumDens).padEnd(6, "0");
      let tempForTable = numTemp;

      if (!numTemp.includes(".")) {
        tempForTable = tempForTable.padEnd(tempForTable.length + 2, ".0");
      }

      const correctionDensity = Number(aroundNumDens) - numDens;

      if (!valuesDensity[densForTable] || !valuesDensity[densForTable][tempForTable]) {
        return null;
      }

      const densInTable = valuesDensity[densForTable][tempForTable];
      let densityInTable = densInTable - correctionDensity + Number(correction);

      if (unit === "кг/м³") {
        densityInTable = densityInTable * 1000;
      }

      return densityInTable;
    } catch (error) {
      console.log("Error calculating density:", error);
      return null;
    }
  };

  useEffect(() => {
    const results = groups
      .map((group) => calcDensityForGroup(group.density, group.temperature))
      .filter((result): result is number => result !== null);

    // Логика для convertStatus (раскомментирована) убрать логику?
    /* const hasHighValue = groups.some((group) => {
      if (!group.density) return false;
      const numDens = Number(group.density.replace(",", "."));
      return (unit === "кг/м³" && numDens > 1.11) || (unit === "г/см³" && numDens > 1.11);
    });

    if (hasHighValue) {
      setConvertStatus(unit === "кг/м³" ? "density converting in kg/m³" : "density converting in g/cm³");
    } else {
      setConvertStatus("");
    } */

    if (results.length > 0) {
      const sum = results.reduce((acc, val) => acc + val, 0);
      const average = sum / results.length;
      const formattedResult = unit === "кг/м³" ? average.toFixed(1) : average.toFixed(4);
      setPost(formattedResult);
    } else {
      setPost(null);
    }
  }, [groups, correction, unit]);

  return {
    post,
    convertStatus,
    calcDensityForGroup,
    setPost, // Добавляем для очистки в handleSave
    setConvertStatus // Добавляем для очистки в handleSave
  };
};