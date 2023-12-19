import { maxWidth } from "../../../.storybook/decorators";
import { VStack } from "../Stack";
import { Card } from "./Card";

export default {
  title: "uikit/Card",
  decorators: [maxWidth(500)],
};

// todo: don't use inline styles

export const Default = () => (
  <VStack gap={1}>
    <Card style={{ width: "100%" }}>Default</Card>
    {/* todo: use constant for theme */}
    <Card style={{ width: "100%" }} theme="muted">
      Muted
    </Card>
  </VStack>
);

export const WithFooter = () => (
  <Card>
    Content
    <Card.Footer>Footer</Card.Footer>
  </Card>
);
