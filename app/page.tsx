import Card from "./components/Card"
import Container from "./components/Container"
import EasingEditor from "./components/EasingEditor"

export default function Home() {
  return (
    <Container>
      <Card cardHeight={600} cardWidth={300}>
        <EasingEditor height={300} width={300} />
      </Card>
    </Container>
  )
}
