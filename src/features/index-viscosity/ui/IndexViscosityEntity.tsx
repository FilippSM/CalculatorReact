import { Button } from "@/shared/components/Button"
import { useDebounce } from "@/shared/hooks/useDebounce"
import { useThemeStore } from "@/app/store"
import clsx from "clsx"
import { useIndexViscosityStore, type IndexViscosityEntityProps } from "../model/indexViscosityStore"
import { useIndexViscosityCalculations } from "../model/useIndexViscosityCalculations"
import { IndexViscosityGroup } from "./IndexViscosityGroup"
import styles from "./IndexViscosity.module.scss"

type Props = {
  entity: IndexViscosityEntityProps
}

export const IndexViscosityEntity = ({ entity }: Props) => {
  const theme = useThemeStore((state) => state.theme)
  const { removeEntity, clearEntity, addGroup, removeGroup, updateViscosity100, updateViscosity40 } =
    useIndexViscosityStore()

  const entitiesCount = useIndexViscosityStore((state) => state.entities.length)

  const debouncedGroups = useDebounce(entity.groups, 300)
  const { calcIVForGroup, entityIV } = useIndexViscosityCalculations(debouncedGroups)

  return (
    <div className={clsx(styles.entityBlock, styles[`entityBlock--${theme}`])}>
      {entity.groups.map((group, index) => (
        <IndexViscosityGroup
          key={group.id}
          group={group}
          index={index}
          totalGroups={entity.groups.length}
          groupIV={calcIVForGroup(group.viscosity100, group.viscosity40)}
          onV100Change={(groupId, value) => updateViscosity100(entity.id, groupId, value)}
          onV40Change={(groupId, value) => updateViscosity40(entity.id, groupId, value)}
          onAddGroup={() => addGroup(entity.id)}
          onRemoveGroup={(groupId) => removeGroup(entity.id, groupId)}
        />
      ))}

      {entityIV !== null && (
        <div className={styles.entitySummary}>
          <div>Average result: {entityIV}</div>
        </div>
      )}

      {entitiesCount > 1 && (
        <div className={styles.delGroupButton}>
          <Button variant="outlined" className={styles.delButton} onClick={() => removeEntity(entity.id)}>
            X
          </Button>
          <Button variant="outlined" onClick={() => clearEntity(entity.id)}>
            Clear
          </Button>
        </div>
      )}
    </div>
  )
}
