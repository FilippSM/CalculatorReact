import { Density } from "@/features/density/ui"
import { ViscosityCalculator } from "@/features/viscosity/ui/ViscosityCalculator"
import { Container } from "@/shared/components/Container"

export const Tests = () => {
  return (
    <Container>
      <Density />
      <ViscosityCalculator />
    </Container>
  )
}
