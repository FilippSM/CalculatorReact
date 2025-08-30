import { Button } from "@mui/material"
import { useDeleteDensityMutation, useGetDensityQuery, type Density20 } from "../../../features/api/densityApi"
import { Container } from "../Container/Container"

export const Results = () => {
  const { data: densitys20 } = useGetDensityQuery()
  const [deleteDensity] = useDeleteDensityMutation()

  const handleDelete = (id: number) => {
    deleteDensity(id)
  }

  return (
    <Container>
      <h1>Results</h1>
      <ul>
        {densitys20?.data?.map((density20: Density20) => {
          return (
            <ul key={density20.id}>
              {`Плотность при 20 °C: ${density20.densityFor20}`}
              <Button variant="contained" color="error" onClick={() => handleDelete(density20.id)}>
                X
              </Button>
            </ul>
          )
        })}
      </ul>
    </Container>
  )
}
