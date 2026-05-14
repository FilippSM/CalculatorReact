import { Button } from "@/shared/components/Button"
import { Input } from "@/shared/components/Input"
import { cleanNumericInput } from "@/features/density/lib"
import type { IndexViscosityGroup as IndexViscosityGroupType } from "../model/indexViscosityStore"
import styles from "./IndexViscosity.module.scss"

type Props = {
  group: IndexViscosityGroupType
  index: number
  groupIV: number | null
  totalGroups: number
  onV100Change: (groupId: string, value: string) => void
  onV40Change: (groupId: string, value: string) => void
  onAddGroup: () => void
  onRemoveGroup: (groupId: string) => void
}

export const IndexViscosityGroup = ({
  group,
  index,
  groupIV,
  totalGroups,
  onV100Change,
  onV40Change,
  onAddGroup,
  onRemoveGroup,
}: Props) => {
  return (
    <div className={styles["inputs-group"]}>
      <Input
        label="Viscosity 100 °C, mm²/s"
        type="text"
        value={group.viscosity100}
        onChange={(e) => onV100Change(group.id, cleanNumericInput(e.currentTarget.value))}
      />
      <Input
        label="Viscosity 40 °C, mm²/s"
        type="text"
        value={group.viscosity40}
        onChange={(e) => onV40Change(group.id, cleanNumericInput(e.currentTarget.value))}
      />
      {groupIV !== null && totalGroups > 1 && (
        <div className={styles.groupResult}>
          <div>Result:</div>
          <div>{groupIV}</div>
        </div>
      )}
      {index === totalGroups - 1 && (
        <Button variant="outlined" className={styles.addButtonDen} onClick={onAddGroup}>
          +
        </Button>
      )}
      {totalGroups > 1 && (
        <Button variant="outlined" className={styles.delButtonDen} onClick={() => onRemoveGroup(group.id)}>
          X
        </Button>
      )}
    </div>
  )
}
