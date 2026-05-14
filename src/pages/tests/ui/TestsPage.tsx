import { Density } from "@/features/density/ui"
import { ViscosityCalculator } from "@/features/viscosity/ui/ViscosityCalculator"
import { IndexViscosity } from "@/features/index-viscosity/ui/indexViscosity"
import { FlowViscometer } from "@/features/flow-viscometer/ui/flowViscometer"
import { Container } from "@/shared/components/Container"

export const Tests = () => {
  return (
    <Container>
      <Density />
      <ViscosityCalculator />
      <IndexViscosity />
      <FlowViscometer />
    </Container>
  )
}
