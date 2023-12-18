
import { storiesOf } from '@storybook/html';

storiesOf('Trudvsem-theme / String - Поле для ввода текста', module)

  .addParameters({
    readme: {
      sidebar: `
    <label class="string">
      <input class="string__control" type="text" value="" placeholder="{{placeholder}}" />
      <span class="string__label">{{label}}</span>
    </label>
      `,
    },
  })
  .add('Стандартное поле', () => `<label class="string"> <input class="string__control" type="text" value="" placeholder="Плейсхолдер"> <span class="string__label">Лейбл</span> </label>`)

  .addParameters({
    readme: {
      sidebar: `
    <label class="string">
      <input required="" class="string__control" type="text" value="" placeholder="{{placeholder}}" />
      <span class="string__label">{{label}}</span>
    </label>
      `,
    },
  })
  .add('Обязательное поле', () => `<label class="string"> <input required="" class="string__control" type="text" value="" placeholder="Плейсхолдер"> <span class="string__label">Лейбл</span> </label>`)

  .addParameters({
    readme: {
      sidebar: `
    <label class="string">
      <span class="string__prepend">{{pre}}</span>
      <input class="string__control" type="text" value="" placeholder="{{placeholder}}" />
      <span class="string__label">{{label}}</span>
    </label>
      `,
    },
  })
  .add('Поле с левым бейджем', () => `<label class="string"> <span class="string__prepend">$</span> <input class="string__control" type="text" value="" placeholder="Плейсхолдер"> <span class="string__label">Лейбл</span> </label>`)

  .addParameters({
    readme: {
      sidebar: `
    <label class="string">
      <span class="string__append">{{post}}</span>
      <input class="string__control" type="text" value="" placeholder="{{placeholder}}" />
      <span class="string__label">{{label}}</span>
    </label>
      `,
    },
  })
  .add('Поле с правым бейджем', () => `<label class="string"> <span class="string__append">₽</span> <input class="string__control" type="text" value="" placeholder="Плейсхолдер"> <span class="string__label">Лейбл</span> </label>`)


  .addParameters({
    readme: {
      sidebar: `
    <label class="string string_row">
      <input class="string__control" type="text" value="" placeholder="{{placeholder}}" />
      <span class="string__label">{{label}}</span>
    </label>
      `,
    },
  })
  .add('Горзионтальное выравнивание', () => `
  <label class="string string_row">
  <input class="string__control" type="text" value="" placeholder="Плейсхолдер"> 
  <span class="string__label">Лейбл</span> 
  </label>`)

  .addParameters({
    readme: {
      sidebar: `
    <label class="string string_row-fix">
      <input class="string__control" type="text" value="" placeholder="{{placeholder}}" />
      <span class="string__label">{{label}}</span>
    </label>
      `,
    },
  })
  .add('Горзионтальное выравнивание с фиксированной шириной лейбла', () => `
  <label class="string string_row-fix"> 

  <input class="string__control" type="text" value="" placeholder="Плейсхолдер"> 
  <span class="string__label">Лейбл</span> 
  </label>`)


  .addParameters({
    readme: {
      sidebar: `
    <label class="string string_date">
      <input 
        class="string__control" 
        type="text" 
        value="" 
        placeholder="{{placeholder}}" />
      <span class="string__label">{{label}}</span>
    </label>
      `,
    },
  })
  .add('Поле с датой', () => `
  <label class="string string_date">
    <input class="string__control" type="text" value="" placeholder="{{placeholder}}" />
    <span class="string__label">Лейбл</span>
  </label>
  `)

  .addParameters({
    readme: {
      sidebar: `
    <label class="string string_date">
      <input 
        class="string__control" 
        type="text" 
        value="" 
        placeholder="{{placeholder}}" 
        data-range="true" 
        data-multiple-dates-separator=" - "/>
      <span class="string__label">{{label}}</span>
    </label>
      `,
    },
  })
  .add('Поле с диапазоном дат', () => `
  <label class="string string_date">
    <input 
      class="string__control" 
      type="text"
      value="" 
      
      placeholder="{{placeholder}}" 
      data-range="true" 
      data-multiple-dates-separator=" - "/>
    <span class="string__label">Лейбл</span>
  </label>
  `)