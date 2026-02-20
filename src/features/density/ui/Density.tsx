import { useState } from "react";
import styles from "./Density.module.scss";
import { useDensityStore } from "@/features/density/model/densityStore";
import { Button } from "@/shared/components/Button";
import { Container } from "@/shared/components/Container/Container";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { SimplePopup } from "@/shared/components/Popup";
import { useSaveDensityMutation } from "../api/densityApi";
import { useDensityCalculations } from "../model/useDensityCalculations";
import { DensitySelects } from "./DensitySelects";
import { DensityGroup } from "./DensityGroup";
import { DensityResult } from "./DensityResult";

export const Density = () => {
  const [correction, setCorrection] = useState<string>("0.0014");
  const [unit, setUnit] = useState<string>("кг/м³");
  
  const { groups, addGroup, removeGroup, updateGroupDensity, updateGroupTemperature } = useDensityStore();
  const debouncedGroups = useDebounce(groups, 300);
  const [saveDensity] = useSaveDensityMutation();
  
  const { 
    post, 
    convertStatus, 
    calcDensityForGroup,
    setPost,
    setConvertStatus 
  } = useDensityCalculations(debouncedGroups, unit, correction);

  const handleSave = async () => {
    if (!post) return;

    try {
      await saveDensity({ density: post });
      groups.forEach((group) => {
        updateGroupDensity(group.id, "");
        updateGroupTemperature(group.id, "");
      });
      setPost(null);
      setConvertStatus("");
    } catch (error) {
      console.error("Ошибка сохранения:", error);
    }
  };

  return (
    <Container>
      <div className={styles.container}>
        <div className={styles["header-dencity"]}>
          <h1>Расчет плотности по ГОСТ 3900 № 1</h1>
          <SimplePopup />
        </div>
        
        <div className={styles.inputs}>
          <DensitySelects
            correction={correction}
            unit={unit}
            onCorrectionChange={setCorrection}
            onUnitChange={setUnit}
          />

          {groups.map((group, index) => (
            <DensityGroup
              key={group.id}
              group={group}
              index={index}
              unit={unit}
              groupResult={calcDensityForGroup(group.density, group.temperature)}
              totalGroups={groups.length}
              onDensityChange={updateGroupDensity}
              onTemperatureChange={updateGroupTemperature}
              onAddGroup={addGroup}
              onRemoveGroup={removeGroup}
            />
          ))}
        </div>

        <DensityResult
          post={post}
          convertStatus={convertStatus}
          unit={unit}
        />
        
        <Button className={styles.buttonSave} variant="primary" onClick={handleSave}>
          Save
        </Button>
        <Button variant="outlined" fullWidth={false} className={styles.addInputsGroup} onClick={() => {}}>
          ++
        </Button>
      </div>
    </Container>
  );
};