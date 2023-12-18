
import { storiesOf } from '@storybook/html';

storiesOf('Trudvsem-theme / Step - Шаги', module)
  .addParameters({
    readme: {
      sidebar: `
    <div class="step-container">
      <div class="step">{{ content }}</div>
    </div>
      `,
    },
  })
  .add('Default', () => `
    <div class="step__container">
      <div class="step">{{ content }}</div>
      <div class="step">{{ content }}</div>
      <div class="step">{{ content }}</div>     
    </div>
  `)