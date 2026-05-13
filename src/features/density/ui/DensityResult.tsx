import styles from "./Density.module.scss"

type Props = {
  post: string | null
  convertStatus: string
  unit: string
}

export const DensityResult = ({ post, convertStatus, unit }: Props) => {
  const hasStatus = convertStatus.trim().length > 0
  if (post === null && !hasStatus) return null

  return (
    <div className={styles.result}>
      {hasStatus && <p>{convertStatus}</p>}
      {post !== null && (
        <div className={styles.entitySummary}>
          <div>{`Average result: ${post} ${unit === "кг/м³" ? "kg/m³" : "g/cm³"}`}</div>
        </div>
      )}
    </div>
  )
}
