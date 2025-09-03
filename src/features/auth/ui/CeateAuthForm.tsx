import { useForm, type SubmitHandler} from "react-hook-form"
import styles from "./CreateAuthForm.module.css"
import { useSaveAuthMutation } from "../api/authApi"
import type { AuthFormData } from "./CeateAuthForm.types"

export function CreateAuthForm() {
  const { register, handleSubmit, reset } = useForm<AuthFormData>()

  const [createLogin] = useSaveAuthMutation()

  const onSubmit: SubmitHandler<AuthFormData> = data => {
    createLogin(data)
    .then(() => {
      reset()
    })
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <input {...register("login")} placeholder="login" className={styles.field} />
      <input {...register("password")} placeholder="password" className={styles.field} />
      <button className={styles.button}>Кнопка</button>
    </form>
  )
}
