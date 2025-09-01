import { useState } from "react"
import { useForm } from "react-hook-form"

export function CeateAuthForm() {
  const { register, handleSubmit } = useForm()
  const [data, setData] = useState("")

  const style = {
    form: { maxWidth: "400px", margin: "2rem auto", padding: "2rem" },
    field: { width: "100%", padding: "0.5rem", margin: "0.5rem 0", border: "1px solid #ccc" },
    button: { width: "100%", padding: "0.5rem", marginTop: "1rem" },
    data: { marginTop: "1rem", padding: "1rem", background: "#f5f5f5" },
  }

  return (
    <form style={style.form} onSubmit={handleSubmit((data) => setData(JSON.stringify(data)))}>
      <input {...register("firstName")} placeholder="First name" style={style.field} />
      <select {...register("category", { required: true })} style={style.field}>
        <option value="">Select...</option>
        <option value="A">Option A</option>
        <option value="B">Option B</option>
      </select>
      <textarea {...register("aboutYou")} placeholder="About you" style={style.field} />
      <input type="submit" style={style.button} />
      {data && <p style={style.data}>{data}</p>}
    </form>
  )
}
