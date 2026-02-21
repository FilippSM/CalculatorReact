import { Button } from "@/shared/components/Button"
import { useDebounce } from "@/shared/hooks/useDebounce"
import { useSaveDensityMutation } from "../api/densityApi"
import { useDensityCalculations } from "../model/useDensityCalculations"

import { DensitySelects } from "./DensitySelects"
import { DensityGroup } from "./DensityGroup"
import { DensityResult } from "./DensityResult"

import { useDensityStore } from "../model/densityStore"

import styles from "./Density.module.scss"
import { useThemeStore } from "@/app/store"
import clsx from "clsx"

export const DensityEntity = ({ entity }) => {
  const theme = useThemeStore((state) => state.theme)
  const { removeEntity, addGroup, removeGroup, updateDensity, updateTemperature, updateCorrection, updateUnit } =
    useDensityStore()

  const entitiesCount = useDensityStore((state) => state.entities.length)

  const debouncedGroups = useDebounce(entity.groups, 300)

  const { post, convertStatus, calcDensityForGroup, setPost, setConvertStatus } = useDensityCalculations(
    debouncedGroups,
    entity.unit,
    entity.correction,
  )

  const [saveDensity] = useSaveDensityMutation()

  const handleSave = async () => {
    if (!post) return

    await saveDensity({ density: post })

    entity.groups.forEach((group) => {
      updateDensity(entity.id, group.id, "")
      updateTemperature(entity.id, group.id, "")
    })

    setPost(null)
    setConvertStatus("")
  }

  return (
    <div className={clsx(styles.entityBlock, styles[`entityBlock--${theme}`])}>
      <DensitySelects
        correction={entity.correction}
        unit={entity.unit}
        onCorrectionChange={(v) => updateCorrection(entity.id, v)}
        onUnitChange={(v) => updateUnit(entity.id, v)}
      />

      {entity.groups.map((group, index) => (
        <DensityGroup
          key={group.id}
          group={group}
          index={index}
          unit={entity.unit}
          totalGroups={entity.groups.length}
          groupResult={calcDensityForGroup(group.density, group.temperature)}
          onDensityChange={(groupId, value) => updateDensity(entity.id, groupId, value)}
          onTemperatureChange={(groupId, value) => updateTemperature(entity.id, groupId, value)}
          onAddGroup={() => addGroup(entity.id)}
          onRemoveGroup={(groupId) => removeGroup(entity.id, groupId)}
        />
      ))}

      <DensityResult post={post} convertStatus={convertStatus} unit={entity.unit} />

      <Button variant="primary" className={styles.buttonSave} onClick={handleSave}>
        Save
      </Button>
      {entitiesCount > 1 && (
        <div className={styles.delGroupButton}>
          <Button variant="outlined" className={styles.delButton} onClick={() => removeEntity(entity.id)}>
            X
          </Button>
        </div>
      )}
    </div>
  )
}
