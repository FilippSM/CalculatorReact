import { useCallback, useState } from "react"
import { Checkbox } from "@/shared/components/Checkbox"
import clsx from "clsx"
import {
  testVisibilityConfig,
  type TestVisibilityKey,
} from "../model/calcXTestVisibilityConfig"
import styles from "./CalcXProtocol.module.scss"

type Props = {
  visibleTests: Record<TestVisibilityKey, boolean>
  setVisibleTests: (update: Record<TestVisibilityKey, boolean>) => void
}

const ALL_IDS = testVisibilityConfig.map(({ id }) => id)

const GROUPS = {
  selectAll: { label: "Выбрать все испытания", members: [] },
  deselectAll: { label: "Отменить все испытания", members: [] },
  trtsWithoutAdd: {
    label: "Испытания по ТР ТС 020/2012 для масел без присадок",
    members: ["flashPoint", "mechanicalImpurities"],
  },
  trtsWithAdd: {
    label: "Испытания по ТР ТС 020/2012 для масел с присадками",
    members: ["flashPoint", "mechanicalImpurities", "waterContent"],
  },
  accreditation: {
    label: "Испытания согласно области аккредитации для масел",
    members: [
      "flashPoint",
      "mechanicalImpurities",
      "densityAt20",
      "kinematicViscosity100",
      "kinematicViscosity40",
      "waterContent",
      "pourPoint",
      "freezingPoint",
    ],
  },
  accreditationVI: {
    label:
      "Испытания согласно области аккредитации + индекс вязкости для масел",
    members: [
      "flashPoint",
      "mechanicalImpurities",
      "densityAt20",
      "kinematicViscosity100",
      "kinematicViscosity40",
      "viscosityIndex",
      "waterContent",
      "pourPoint",
      "freezingPoint",
    ],
  },
} as const

type GroupId = keyof typeof GROUPS

const GROUP_ORDER: GroupId[] = [
  "selectAll",
  "deselectAll",
  "trtsWithoutAdd",
  "trtsWithAdd",
  "accreditation",
  "accreditationVI",
]

const CONTENT_GROUPS: GroupId[] = [
  "trtsWithoutAdd",
  "trtsWithAdd",
  "accreditation",
  "accreditationVI",
]

const makeAllTrue = () =>
  Object.fromEntries(ALL_IDS.map((id) => [id, true])) as Record<
    TestVisibilityKey,
    boolean
  >

const makeFromMembers = (members: readonly string[]) =>
  Object.fromEntries(
    ALL_IDS.map((id) => [id, members.includes(id)]),
  ) as Record<TestVisibilityKey, boolean>

const resolveActiveGroup = (
  visibleTests: Record<TestVisibilityKey, boolean>,
): GroupId | null => {
  const checkedIds = ALL_IDS.filter((id) => visibleTests[id])

  if (checkedIds.length === ALL_IDS.length) return "selectAll"

  for (const groupId of CONTENT_GROUPS) {
    const members = GROUPS[groupId].members
    if (
      checkedIds.length === members.length &&
      checkedIds.every((id) => members.includes(id))
    ) {
      return groupId
    }
  }

  return null
}

export const CalcXTestVisibilitySelector = ({
  visibleTests,
  setVisibleTests,
}: Props) => {
  const [activeGroup, setActiveGroup] = useState<GroupId | null>(null)

  let activeIndex = 0

  const handleGroupChange = useCallback(
    (groupId: GroupId, checked: boolean) => {
      if (!checked) {
        setActiveGroup(null)
        return
      }

      setActiveGroup(groupId)

      switch (groupId) {
        case "selectAll":
          setVisibleTests(makeAllTrue())
          break
        case "deselectAll":
          setVisibleTests(
            Object.fromEntries(ALL_IDS.map((id) => [id, false])) as Record<
              TestVisibilityKey,
              boolean
            >,
          )
          break
        default:
          setVisibleTests(makeFromMembers(GROUPS[groupId].members))
      }
    },
    [setVisibleTests],
  )

  const handleIndicatorChange = useCallback(
    (indicatorId: TestVisibilityKey, checked: boolean) => {
      const next = { ...visibleTests, [indicatorId]: checked }
      setVisibleTests(next)
      setActiveGroup(resolveActiveGroup(next))
    },
    [visibleTests, setVisibleTests],
  )

  return (
    <div className={styles.section}>
      <h2>Показатели</h2>
      <div className={styles.groupFilters}>
        {GROUP_ORDER.map((groupId) => (
          <Checkbox
            key={groupId}
            checked={activeGroup === groupId}
            label={GROUPS[groupId].label}
            onValueChange={(checked) => handleGroupChange(groupId, checked)}
          />
        ))}
      </div>
      <div className={styles.testFilters}>
        {testVisibilityConfig.map(({ id, label }) => {
          const isActive = visibleTests[id]
          const number = isActive ? ++activeIndex : null

          return (
            <Checkbox
              key={id}
              checked={isActive}
              className={clsx(
                styles.testFilterItem,
                !isActive && styles.testFilterItemInactive,
              )}
              label={number !== null ? `${number}. ${label}` : label}
              onValueChange={(checked) => handleIndicatorChange(id, checked)}
            />
          )
        })}
      </div>
    </div>
  )
}
