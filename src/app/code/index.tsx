import Container from "./container";
import Content, { Props } from "./content";

export default function Code(props: Props) {
  return (
    <Container highlit={!!props.highlight}>
      <Content {...props} />
    </Container>
  );
}
