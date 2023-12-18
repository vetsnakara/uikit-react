
import { storiesOf } from '@storybook/html';

storiesOf('Trudvsem-theme / Навигационная панель', module)
  .addParameters({
    readme: {
      sidebar: `
    <div class="buttons-panel">
        <div class="buttons-panel__wrapper">
            <a class="buttons-panel__item buttons-panel__item_active">{{title}}</a>
        </div>
        <div class="buttons-panel__wrapper">
            <a class="buttons-panel__item">{{title}}</a>
        </div>
    </div>
        `,
    },
  })
  .add('Навигационная панель', () => `
  <div class="buttons-panel">
    <div class="buttons-panel__wrapper"><a class="buttons-panel__item buttons-panel__item_active">Активный пункт</a></div>
    <div class="buttons-panel__wrapper"><a class="buttons-panel__item">Неактивный пункт</a></div>
  </div>
  `
)
