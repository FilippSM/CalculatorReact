import { useCallback, useEffect, useState } from "react";
import { calculateDensity } from "../lib/calculateDensity";
import type { DensityGroup } from "./densityStore";

export const useDensityCalculations = (groups: DensityGroup[], unit: string, correction: string) => {
  const [post, setPost] = useState<string | null>(null);
  const [convertStatus, setConvertStatus] = useState<string>("");

  const calcDensityForGroup = useCallback((density: string, temperature: string): number | null => {
    return calculateDensity(density, temperature, unit, correction);
  }, [unit, correction]);

  useEffect(() => {
    const results = groups
      .map((group) => calcDensityForGroup(group.density, group.temperature))
      .filter((result): result is number => result !== null);

    if (results.length > 0) {
      const sum = results.reduce((acc, val) => acc + val, 0);
      const average = sum / results.length;
      const formattedResult = unit === "кг/м³" ? average.toFixed(1) : average.toFixed(4);
      setPost(formattedResult);
    } else {
      setPost(null);
    }
  }, [groups, correction, unit, calcDensityForGroup]);

  return {
    post,
    convertStatus,
    calcDensityForGroup,
    setPost,
    setConvertStatus
  };
};
