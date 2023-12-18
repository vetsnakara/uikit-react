import { storiesOf } from '@storybook/html';

storiesOf('Trudvsem-theme / Выравние контента', module)
.addParameters({
    readme: {
      sidebar: ` 
    <div class="row">{{content}}</div> 
        `,
    },
  })
  .add('Сверху', () => '<div class="card row" style="height: 500px">Содержимое</div>')
  .addParameters({
    readme: {
      sidebar: ` 
    <div class="row row_middle">{{content}}</div> 
        `,
    },
  })
  .add('По центру', () => '<div class="card row row_middle" style="height: 500px">Содержимое</div>')

  .addParameters({
    readme: {
      sidebar: ` 
    <div class="row row_bottom">{{content}}</div> 
        `,
    },
  })
  .add('Снизу', () => '<div class="card row row_bottom" style="height: 500px">Содержимое</div>')
 