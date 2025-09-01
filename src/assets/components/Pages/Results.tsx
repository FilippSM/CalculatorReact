import { Button } from "@mui/material"
import { useDeleteDensityMutation, useGetDensityQuery} from "../../../features/api/densityApi"
import { Container } from "../Container/Container"
import type { Density20 } from "../../../features/api/densityApi.types"
import styles from "./Results.module.css"

export const Results = () => {
  const { data: densitys20, isLoading } = useGetDensityQuery()
  const [deleteDensity] = useDeleteDensityMutation()

  const handleDelete = (id: number) => {
    deleteDensity(id)
  }

  return (
    <Container>
      <h1>Results</h1>
      {isLoading ? <h1>Loading....</h1> : <ul>
        {densitys20?.data?.map((density20: Density20) => {
          return (
            <li key={density20.id} className={styles.resultsList}>
              {`Плотность при 20 °C: ${density20.densityFor20}`}
              <Button variant="contained" color="error" onClick={() => handleDelete(density20.id)}>
                X
              </Button>
            </li>
          )
        })}
      </ul>}
      
    </Container>
  )
}
