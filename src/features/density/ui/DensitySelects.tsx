import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/Select";

type Props = {
  correction: string;
  unit: string;
  onCorrectionChange: (value: string) => void;
  onUnitChange: (value: string) => void;
}

export const DensitySelects = ({ correction, unit, onCorrectionChange, onUnitChange }: Props) => {
  return (
    <>
      <div>
        <Select value={correction} onValueChange={onCorrectionChange}>
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
        <Select value={unit} onValueChange={onUnitChange}>
          <SelectTrigger className="w-[180px]" label={"Unit"}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={"г/см³"}>г/см³</SelectItem>
            <SelectItem value={"кг/м³"}>кг/м³</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
};