import { storiesOf } from '@storybook/html';

storiesOf('Trudvsem-theme / Frame', module)
  .addParameters({
    readme: {
      sidebar: `
    <div class="frame">
      <h3 class="frame__header">{{title}}}</h3>
      <a href="#" class="frame__section">{{link}}</a> 
    </div>
      `,
    },
  })
  .add('Default', () => `
  <div class="frame">
    <h3 class="frame__header">{{title}}}</h3>
    <a href="#" class="frame__section">{{link}}</a> 
  </div>
  `)

  .addParameters({
    readme: {
      sidebar: `
    <div class="frame frame_red">
      <h3 class="frame__header">{{title}}}</h3>
      <span class="frame__item">{{link}}</span> 
    </div>
      `,
    },
  })
  .add('Красный', () => `
  <div class="frame frame_red">
    <h3 class="frame__header">{{title}}}</h3>
    <span href="#" class="frame__item">{{item}}</span> 
    <a href="#" class="frame__section">{{link}}</a> 
  </div>
  `)

