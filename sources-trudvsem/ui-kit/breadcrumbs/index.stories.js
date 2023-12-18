
import { storiesOf } from '@storybook/html';

storiesOf('Trudvsem-theme / Breadcrumbs - хлебные крошки', module)
  .addParameters({
    readme: {
      sidebar: `
    <div class="breadcrumbs">
        <a class="breadcrumbs__item" href="{{link}}">{{item}}</a>
        <span class="breadcrumbs__item_active">{{item}}</span>
    </div>
        `,
    },
  })
  .add('Breadcrumbs', () => `
      <div class="breadcrumbs">
        <a class="breadcrumbs__item" href="">Ссылка</a>
        <a class="breadcrumbs__item" href="">Ссылка</a>
        <span class="breadcrumbs__item_active">Ссылка</span>
      </div>`
      )
