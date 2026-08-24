import { Input } from "@/shared/components/Input"
import clsx from "clsx"
import {
  protocolMetaSections,
  type ProtocolFieldWidth,
} from "../model/calcXProtocolConfig"
import type { InitialTestData } from "../model/initialTestData"
import styles from "./CalcXProtocol.module.scss"

type Props = {
  formData: InitialTestData
  updateTestData: (field: keyof InitialTestData, value: string) => void
  theme: "light" | "dark"
}

const widthClassName = (width: ProtocolFieldWidth | undefined) => {
  if (width === "wide") {
    return styles.wideInput
  }

  if (width === "full") {
    return styles.fullWidthInput
  }

  return undefined
}

export const CalcXProtocolMetaSection = ({ formData, updateTestData, theme }: Props) => (
  <section className={clsx(styles.entityBlock, styles[`entityBlock--${theme}`])}>
    {protocolMetaSections.map((section, sectionIndex) => {
      const fields = section.fields.map((fieldConfig) => (
        <Input
          key={fieldConfig.field}
          label={fieldConfig.label}
          className={widthClassName(fieldConfig.width)}
          value={formData[fieldConfig.field]}
          onValueChange={(value) => updateTestData(fieldConfig.field, value)}
        />
      ))

      if (!section.title) {
        return (
          <div key={`meta-section-${sectionIndex}`} className={styles.inputsGroup}>
            {fields}
          </div>
        )
      }

      return (
        <div key={section.title} className={styles.section}>
          <h2>{section.title}</h2>
          {section.layout === "row" ? <div className={styles.paramsRow}>{fields}</div> : fields}
        </div>
      )
    })}
  </section>
)
