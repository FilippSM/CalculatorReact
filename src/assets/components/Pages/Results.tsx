import { Button } from "@mui/material"
import { Container } from "../Container/Container"
import styles from "./Results.module.css"
import type { Density20 } from "../../../features/density/api/densityApi.types"
import {
  useChangeDensityMutation,
  useDeleteDensityMutation,
  useGetDensityQuery,
} from "../../../features/density/api/densityApi"
import { useForm, type SubmitHandler } from "react-hook-form"

export const Results = () => {
  const { data: densitys20, isLoading } = useGetDensityQuery()
  const [deleteDensity] = useDeleteDensityMutation()
  const [changeDensity] = useChangeDensityMutation()

  const { register, handleSubmit, reset } = useForm<AuthFormData>()

  const onSubmit: SubmitHandler<AuthFormData> = data => {
      createLogin(data)
      .then(() => {
        reset()
      })
    }

  const handleDelete = (id: number) => {
    if (confirm("Are you sure tou want to delete the density data?")) {
      deleteDensity(id)
    }
  }

  const handleChange = (id: number, newDensity: string) => {
    changeDensity({
      id: id,
      densityData: {
        density: newDensity,
      },
    })
  }

  return (
    <Container>
      <h1>Results</h1>
      {isLoading ? (
        <h1>Loading....</h1>
      ) : (
        <ul>
          {densitys20?.data?.map((density20: Density20) => {
            return (
              <li key={density20.id} className={styles.resultsList}>
                <div>
                  {`Плотность при 20 °C: ${density20.densityFor20}`}
                  <Button variant="contained" color="error" onClick={() => handleDelete(density20.id)}>
                    X
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#ff9800",
                      "&:hover": {
                        backgroundColor: "#f57c00",
                      },
                    }}
                    onClick={() => handleChange(1, "666666")}
                  >
                    Change
                  </Button>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <input {...register("density")} placeholder="density" />
                  <button type={"submit"}>save</button>
                  <button type={"button"} onClick={() => {}}>
                    cancel
                  </button>
                </form>
              </li>
            )
          })}
        </ul>
      )}
    </Container>
  )
}
