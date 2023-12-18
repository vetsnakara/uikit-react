import { storiesOf } from '@storybook/html';

storiesOf('Trudvsem-theme / Link - Ссылки', module)
  .addParameters({
    readme: {
      sidebar: `
    <a class="link" href="{{href}}">{{title}}</a>

      `,
    },
  })
  .add('Локальная', () => `<a class="link" href="#">Ссылка</a>`)

  .addParameters({
    readme: {
      sidebar: `
    <a class="link" href="//{{href}}">{{title}}</a>
      `,
    },
  })
  .add('Внешняя', () => `<a class="link" href="//google.com">Ссылка</a>`)

  .addParameters({
    readme: {
      sidebar: `
    <a class="link_bright" href="{{href}}">{{title}}</a>
    `,
    },
  })
  .add('Светлая', () => `<div style="padding: 20px; background: #555;"><a class="link_bright" href="#">Ссылка</a></div>`)  

  .addParameters({
    readme: {
      sidebar: `
    <a class="link_bright" href="//{{href}}">{{title}}</a>
    `,
    },
  })
  .add('Светлая (внешняя)', () => `<div style="padding: 20px; background: #555;"><a class="link_bright" href="//google.com">Ссылка</a></div>`)    