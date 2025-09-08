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
import { useState } from "react"

export const Results = () => {
  const [densityId, setDensityId] = useState<number | null>(null)


  const { data: densitys20, isLoading } = useGetDensityQuery()
  const [deleteDensity] = useDeleteDensityMutation()
  const [changeDensity] = useChangeDensityMutation()

  const { register, handleSubmit, reset } = useForm<Density20>()

  const onSubmit: SubmitHandler<Density20> = data => {
    if(!densityId) return
    
    changeDensity({
      id: densityId,
      densityData: {
        density: data.densityFor20,
      },
    }).then(() => {
      setDensityId(null) //закрытие формы
    })
  }

  const handleDelete = (id: number) => {
    if (confirm("Are you sure tou want to delete the density data?")) {
      deleteDensity(id)
    }
  }

  const editHandleChange = (density20: Density20 | null) => {
    if (density20) {
      setDensityId(density20.id)
      reset({
        densityFor20: density20.densityFor20
      })
    } else {
      setDensityId(null)
    }
  }

  
  return (
    <Container>
      <h1>Results</h1>
      {isLoading ? (
        <h1>Loading....</h1>
      ) : (
        <ul>
          {densitys20?.data?.map((density20: Density20) => {

            const isEditing = density20.id === densityId

            return (
              <li key={density20.id} className={styles.resultsList}>
                {
                  isEditing ?
                  <form onSubmit={handleSubmit(onSubmit)} className={styles.resultsForm}>
                      <input {...register("densityFor20")} placeholder="density" />
                      <Button type={"submit"} variant="contained" color="success">save</Button>
                      <Button type={"button"} variant="contained" color="error" onClick={() => editHandleChange(null)}>cancel</Button>
                  </form> :
                  <>
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
                      onClick={() => editHandleChange(density20)}
                    >
                      Change
                    </Button>
                  </>
                }           
              </li>
            )
          })}
        </ul>
      )}
    </Container>
  )
}
