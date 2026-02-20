import styles from "./Density.module.css";

type Props = {
  post: string | null;
  convertStatus: string;
  unit: string;
}

export const DensityResult = ({ post, convertStatus, unit }: Props) => {
  return (
    <div className={styles.result}>
      <p>{convertStatus}</p>
      {post !== null ? (
        <>{`Average result: ${post} ${unit === "кг/м³" ? "kg/m³" : "g/cm³"}`}</>
      ) : (
        "Введите значения плотности и температуры"
      )}
    </div>
  );
};