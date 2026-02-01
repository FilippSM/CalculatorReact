import { CreateAuthForm } from "@/features/auth/ui"
import { Container } from "@/shared/components/Container"

export const Login = () => {
  return (
    <Container>
      <h1>Login</h1>
      <CreateAuthForm />
    </Container>
  )
}
