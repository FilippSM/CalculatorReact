import { Container } from "../assets/components/Container/Container"
import * as Tooltip from "@radix-ui/react-tooltip"

export const Main = () => {
  return (
    <Container>
      <h1>Main</h1>

      <Tooltip.Provider>
        <Tooltip.Root>
          <Tooltip.Trigger>Наведите на меня</Tooltip.Trigger>
          <Tooltip.Content>Содержимое подсказки</Tooltip.Content>
        </Tooltip.Root>
      </Tooltip.Provider>
    </Container>
  )
}
