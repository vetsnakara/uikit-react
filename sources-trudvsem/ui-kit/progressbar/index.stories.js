
import { storiesOf } from '@storybook/html';

storiesOf('Trudvsem-theme / Progressbar - Индикатор прогресса', module)
  .addParameters({
    readme: {
      sidebar: `
    <div
        class="progressbar"
        role="progressbar"
        style="animation-delay: -{{percent}}s;">
    </div>
        `,
    },
  })
  .add('Progressbar', () => `
  <p class="mb-1">Индикатор прогресса (10%)</p>
  <div class="progressbar" role="progressbar" style="animation-delay: -10s;"></div>
    `
      )
