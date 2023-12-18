import { storiesOf } from '@storybook/html';

storiesOf('Trudvsem-theme / Button - Кнопки', module)
  .addParameters({
    readme: {
      sidebar: `
    <button class="button">{{item}}</button>
        `,
    },
  })
  .add('Обычная кнопка', () => '<button class="button">Обычная кнопка</button>')
  .addParameters({
    readme: {
      sidebar: `
    <button class="button_blue">{{item}}</button>
      `,
    },
  })
  .add('Синяя кнопка', () => '<button class="button_blue">Синяя кнопка</button>')
  .addParameters({
    readme: {
      sidebar: `
    <button class="button_white">{{item}}</button>
      `,
    },
  })
  .add('Белая кнопка', () => '<div style="padding: 20px; background-color: #555;"><button class="button_white">Белая кнопка</button></div>')

