import { storiesOf } from '@storybook/html';

storiesOf('Trudvsem-theme / Text - Поле для ввода многострочного текста', module)
  .addParameters({
    readme: {
      sidebar: `
    <label class="text">
      <textarea class="text__control" type="text" value="" placeholder="{{placeholder}}"></textarea>
      <span class="text__label">{{label}}</label>
    </label>
    `,
    },
  })
  .add('Стандартное поле', () => `
    <label class="text">
        <textarea class="text__control" type="text" value="" placeholder="Плейсхолдер"></textarea>
        <span class="text__label">Лейбл</span>
    </label>
  `
      )
.addParameters({
    readme: {
        sidebar: `
    <label class="text">
      <textarea required class="text__control" type="text" value="" placeholder="{{placeholder}}"></textarea>
      <span class="text__label">{{label}}</span>
    </label>
    `,
    },
    })
.add('Обязательное поле', () => `
    <label class="text">
        <textarea required class="text__control" type="text" value="" placeholder="Плейсхолдер"></textarea>
        <span class="text__label">Лейбл</span>
    </label>
`
    )      
    .addParameters({
        readme: {
          sidebar: `
    <label class="text">
      <span class="text__prepend">{{pre}}</span>
      <textarea required class="text__control" type="text" value="" placeholder="Плейсхолдер"></textarea>
      <span class="text__label">{{label}}</span>
    </label>
          `,
        },
      })
      .add('Поле с левым бейджем', () => `
      <label class="text">
      <span class="text__prepend">$</span>
      <textarea required class="text__control" type="text" value="" placeholder="Плейсхолдер"></textarea>
      <span class="text__label">Лейбл</span> </label>`)

      .addParameters({
        readme: {
          sidebar: `
    <label class="text">
      <span class="text__append">{{post}}</span>
      <textarea required class="text__control" type="text" value="" placeholder="Плейсхолдер"></textarea>
      <span class="text__label">{{label}}</span>
    </label>
          `,
        },
      })
      .add('Поле с правым бейджем', () => `
      <label class="text">
      <span class="text__append">₽</span>
      <textarea required class="text__control" type="text" value="" placeholder="Плейсхолдер"></textarea>
      <span class="text__label">Лейбл</span>
      </label>`)

      .addParameters({
        readme: {
          sidebar: `
    <label class="text text_row">
      <textarea required class="text__control" type="text" value="" placeholder="Плейсхолдер"></textarea>
      <span class="text__label">{{label}}</span>
    </label>
          `,
        },
      })
      .add('Горизонтальное выравнивание', () => `
      <label class="text text_row">
      <textarea required class="text__control" type="text" value="" placeholder="Плейсхолдер"></textarea>
      <span class="text__label">Фамилия имя и отчество</span> 
      </label>`)
    
      .addParameters({
        readme: {
          sidebar: `
    <label class="text text_row-fix">
      <textarea class="text__control" type="text" value="" placeholder="Плейсхолдер"></textarea>
      <span class="text__label">{{label}}</span>
    </label>
          `,
        },
      })
      .add('Горизонтальное выравнивание с фиксированной шириной лейбла', () => `
      <label class="text text_row-fix"> 
        <textarea required class="text__control" type="text" value="" placeholder="Плейсхолдер"></textarea>
        <span class="text__label">Фамилия имя и отчество</span> 
      </label>
      `)