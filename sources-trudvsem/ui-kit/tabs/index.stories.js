import { storiesOf } from '@storybook/html';


storiesOf('Trudvsem-theme / Tabs - Вкладки', module)
  .addParameters({
    readme: {
      sidebar: `
    <div class="tabs">
      <button 
        class="tabs__item tabs_active" 
        data-toggle="tab" 
        role="tab" 
        href="#{{tab-ID}}" 
        aria-selected="true">{{tab-title}}</button>
      <button 
        class="tabs__item" 
        data-toggle="tab" 
        role="tab" 
        href="#{{tab-ID}}" 
        aria-selected="false">{{tab-title}}</button>
    </div>
    <div class="tabs__content tabs_active" id="{{tab-ID}}">{{content}}</div>
    <div class="tabs__content" id="{{tab-ID}}">{{content}}</div>
        `,
    },
  })
  .add('Вкладки', () => `
  <div class="tabs">
    <button class="tabs__item tabs_active" data-toggle="tab" role="tab" href="#tabs-content-1" aria-selected="true">Таб 1</button> 
    <button class="tabs__item" data-toggle="tab" role="tab" href="#tabs-content-2" aria-selected="false">Таб 2</button>
  </div>
  <div class="tabs__content tabs_active" id="tabs-content-1">Контент 1</div>
  <div class="tabs__content" id="tabs-content-2">Контент 2</div>

  `
      )
