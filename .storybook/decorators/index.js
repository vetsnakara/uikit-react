/**
 * Декоратор для ограничения максимальной ширины Story
 */
export const maxWidth = (maxWidth) => (Story) => (
    <div style={{ maxWidth }}>
        <Story />
    </div>
);
