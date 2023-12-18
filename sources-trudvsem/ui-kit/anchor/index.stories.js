import { storiesOf } from '@storybook/html';

storiesOf('Trudvsem-theme / Anchor - ссылка в рамках текущей страницы', module)
  .addParameters({
    readme: {
      sidebar: `
    <a class="anchor" href="#{{anchor}}}">{{title}}</a>
      `,
    },
  })
  .add('Anchor', () => `
  <div style="position: sticky; top: 0;background-color: #fff;">
    <p>Целевой блок должен быть блочным по умолчанию: div, main, section, etc</p>
    <a class="anchor" href="#point-1">Ancor 1</a><br>
    <a class="anchor" href="#point-2">Ancor 2</a><br>
    <a class="anchor" href="#point-3">Ancor 3</a><br></div>

  <div name="point-1" style="margin: 350px 0; padding: 70px 0;">
  point-1
  </div>
  <div name="point-2" style="margin: 350px 0; padding: 70px 0;">
  point-2
  </div>
  <div name="point-3" style="margin: 350px 0; padding: 70px 0;">
  point-3
  </div>    
  
  `
      )
