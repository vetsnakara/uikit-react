import { storiesOf } from '@storybook/html';

storiesOf('Trudvsem-theme / Tooltip - Всплывающие подсказки', module)
  .addParameters({
    readme: {
      sidebar: `
    <span data-tooltip="{{tooltip-content}}">{{text}}</span>
    `,
    },
  })
  .add('Стандартный вид', () => `
  <span data-tooltip="контент" data-placement="right" class="">тултип</span>
  `
  )

  .addParameters({
    readme: {
      sidebar: `
    <span data-tooltip="{{tooltip-content}}" data-tooltip-toggle="">{{text}}</span>
    `,
    },
  })
  .add('По клику', () => `
  <span data-tooltip="контент" data-tooltip-container="#root" data-tooltip-toggle="" class="">тултип</span>
  <span data-tooltip="контент" data-tooltip-container="#root" data-tooltip-toggle="" class="">тултип</span>
  <span data-tooltip="контент" data-tooltip-container="#root" data-tooltip-toggle="" class="">тултип</span>
  `
  )

  .addParameters({
    readme: {
      sidebar: `
    <span data-tooltip-theme="dark" data-tooltip="{{tooltip-content}}">{{text}}</span>
    `,
    },
  })
  .add('На темном фоне', () => `
  <span data-tooltip-theme="dark" data-tooltip="контент" class="">тултип</span>
  `
  ) 
  
  .addParameters({
    readme: {
      sidebar: `
    <span class="tooltip__handler" data-tooltip="{{tooltip-content}}"></span>
    `,
    },
  })
  .add('Handler', () => `
  <span class="tooltip__handler" data-tooltip="контент"></span>
  `
  ) 
$("#root").css({
  "padding" : 90
})
