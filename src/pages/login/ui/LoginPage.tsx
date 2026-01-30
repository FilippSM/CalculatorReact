import { CreateAuthForm } from "../../../features/auth/ui/CreateAuthForm"
import { Container } from "../../../shared/components/Container/Container"

export const Login = () => {
  return (
    <Container>
      <h1>Login</h1>
      <CreateAuthForm />
    </Container>
  )
}
