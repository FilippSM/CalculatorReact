import { useState } from "react"
import { useForm } from "react-hook-form"
import styles from "./CreateAuthForm.module.css"

export function CreateAuthForm() {
  const { register, handleSubmit } = useForm()
  const [data, setData] = useState("")

  return (
    <form className={styles.form} onSubmit={handleSubmit((data) => setData(JSON.stringify(data)))}>
      <input {...register("login")} placeholder="login" className={styles.field} />
      <input {...register("password")} placeholder="password" className={styles.field} />
      <button className={styles.button}>Кнопка</button>
      {data && <p className={styles.data}>{data}</p>}
    </form>
  )
}
