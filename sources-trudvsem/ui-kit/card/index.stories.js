import { storiesOf } from '@storybook/html';

storiesOf('Trudvsem-theme / Card - Карточка', module)
  .addParameters({
    readme: {
      sidebar: `
    <div class="card">{{content}}</div>
    `,
    },
  })
  .add('Обычная', () => '<div class="card">Контент</div>')
  
  .addParameters({
    readme: {
      sidebar: `
    <div class="card card_grey">{{content}}</div>
    `,
    },
  })
  .add('Серая', () => '<div class="card card_grey">Контент</div>')

  .addParameters({
    readme: {
      sidebar: `
    <div class="card card_code">{{content}}</div>
    `,
    },
  })
  .add('С кодом', () => '<div class="card card_code">Контент</div>')  

  .addParameters({
    readme: {
      sidebar: `
    <blockquote class="card card_quotes">{{content}}</blockquote>
    `,
    },
  })
  .add('Цитата', () => '<blockquote class="card card_quotes">Контент</blockquote>')  

