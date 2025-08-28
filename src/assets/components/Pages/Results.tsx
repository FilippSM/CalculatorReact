import { useGetDensityQuery, type Density20 } from "../../../features/api/densityApi"
import { Container } from "../Container/Container"

export const Results = () => {
  const { data: densitys20 } = useGetDensityQuery()

  return (
    <Container>
      <h1>Results</h1>
      <ul>
        {densitys20?.data?.map((density20: Density20) => {
          return <ul key={density20.id}>{`Плотность при 20 °C: ${density20.densityFor20}`}</ul>
        })}
      </ul>
    </Container>
  )
}
