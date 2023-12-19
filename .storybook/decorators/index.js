export const maxWidth = (maxWidth) => (Story) =>
    (
        <div style={{ maxWidth }}>
            <Story />
        </div>
    );
