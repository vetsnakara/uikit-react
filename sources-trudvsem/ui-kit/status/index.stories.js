
import { storiesOf } from '@storybook/html';

storiesOf('Trudvsem-theme / Status - Статусы', module)
  .addParameters({
    readme: {
      sidebar: `
    <div class="status">{{ content }}</div>
      `,
    },
  })
  .add('Default', () => `
    <div class="status">Контент</div>
  `)

  .addParameters({
    readme: {
      sidebar: `
    <div class="status">{{ content }}</div>
      `,
    },
  })
  .add('Muted', () => `
    <div class="status status_muted">Контент</div>
  `)

  .addParameters({
    readme: {
      sidebar: `
    <div class="status">{{ content }}</div>
      `,
    },
  })
  .add('Success', () => `
    <div class="status status_success">Контент</div>
  `)  

  .addParameters({
    readme: {
      sidebar: `
    <div class="status">{{ content }}</div>
      `,
    },
  })
  .add('Warning', () => `
    <div class="status status_warning">Контент</div>
  `)  

  .addParameters({
    readme: {
      sidebar: `
    <div class="status">{{ content }}</div>
      `,
    },
  })
  .add('Danger', () => `
    <div class="status status_danger">Контент</div>
  `)    