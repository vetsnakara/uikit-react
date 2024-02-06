/**
 * Декоратор для ограничения максимальной ширины Story
 */
export const maxWidth = (maxWidth) => (Story) =>
  (
    <div style={{ maxWidth, margin: "0 auto" }}>
      <Story />
    </div>
  );
