
import { storiesOf } from '@storybook/html';

storiesOf('Trudvsem-theme / Separator - разделитель (горизонтальная черта)', module)
  .addParameters({
    readme: {
      sidebar: `
    <hr class="separator" />
      `,
    },
  })
  .add('Separator', () => `<hr class="separator"> ` )
