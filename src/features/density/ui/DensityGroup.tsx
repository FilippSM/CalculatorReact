import { Button } from "@/shared/components/Button";
import { Input } from "@/shared/components/Input";
import styles from "./Density.module.scss";
import { cleanNumericInput } from "../lib";


type Props = {
  group: {
    id: string;
    density: string;
    temperature: string;
  };
  index: number;
  unit: string;
  groupResult: number | null;
  totalGroups: number;
  onDensityChange: (id: string, value: string) => void;
  onTemperatureChange: (id: string, value: string) => void;
  onAddGroup: () => void;
  onRemoveGroup: (id: string) => void;
}

export const DensityGroup = ({
  group,
  index,
  unit,
  groupResult,
  totalGroups,
  onDensityChange,
  onTemperatureChange,
  onAddGroup,
  onRemoveGroup
}: Props) => {
  return (
    <div key={group.id} className={styles["inputs-group"]}>
      <Input
        label={`Density, ${unit === "кг/м³" ? "kg/m³" : "g/cm³"}`}
        type="text"
        value={group.density}
        onChange={(e) => onDensityChange(group.id, cleanNumericInput(e.currentTarget.value))}
      />
      <Input
        label="Temperature, °C"
        type="text"
        value={group.temperature}
        onChange={(e) => onTemperatureChange(group.id, e.currentTarget.value.replace(/[^0-9,. ]/g, ""))}
      />
      {groupResult !== null && totalGroups > 1 && (
        <div className={styles.groupResult}>
          <div>{`Result, ${unit === "кг/м³" ? "kg/m³" : "g/cm³"}:`}</div>
          <div>{groupResult.toFixed(unit === "кг/м³" ? 1 : 4)}</div>
        </div>
      )}
      {index === totalGroups - 1 && (
        <Button variant="outlined" onClick={onAddGroup}>
          +
        </Button>
      )}
      {totalGroups > 1 && (
        <Button variant="outlined" onClick={() => onRemoveGroup(group.id)}>
          X
        </Button>
      )}
    </div>
  );
};