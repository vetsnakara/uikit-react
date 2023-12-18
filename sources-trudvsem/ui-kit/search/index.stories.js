import { storiesOf } from '@storybook/html';

storiesOf('Trudvsem-theme / Поиск', module)
  .addParameters({
    readme: {
      sidebar: `
    <div class="search">
      <input type="search" placeholder="Поиск" class="search__input">
      <div class="search__label">{{label}}</div>
      <button class="search__submit"></button>        
    </div>`,
    },
  })
  .add('Поиск', () => `
    <div class="search">
        <input type="search" placeholder="Поиск" class="search__input">
        <div class="search__label">Поиск</div>
        <button class="search__submit"></button>        
    </div>
  `)


