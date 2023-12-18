
import { storiesOf } from '@storybook/html';

storiesOf('Trudvsem-theme / Switch - Переключатели', module)
  .addParameters({
    readme: {
      sidebar: `
    <label class="switch">
        <input type="radio" checked class="switch__control" name="{{name}}"/>
        <span class="switch__description">{{content}}</span>
        <span class="switch__label">{{label}}</span>
    </label>
        `,
    },
  })
  .add('Радиобаттон', () => `
  <label class="switch mb-1"> 
    <input type="radio" checked="checked" class="switch__control" name="nameRadio"> 
    <span class="switch__description">Значение 1</span> 
    <span class="switch__label">Лейбл</span> 
  </label>
  <label class="switch mb-1"> 
      <input type="radio" class="switch__control" name="nameRadio"> 
      <span class="switch__description">Значение 2</span> 
  </label>
  `
      )
.addParameters({
    readme: {
        sidebar: `
    <label class="switch">
        <input type="checkbox" checked class="switch__control" name="{{name[]}}"/>
        <span class="switch__description">{{content}}</span>
        <span class="switch__label">{{label}}</span>
    </label>
        `,
    },
    })
.add('Чекбокс', () => `
    <label class="switch mb-1"> 
        <input type="checkbox" class="switch__control" name="nameCheckbox[]"> 
        <span class="switch__description">Значение 1</span> 
        <span class="switch__label">Лейбл</span> 
    </label> 
        <label class="switch mb-1"> 
        <input type="checkbox" class="switch__control" checked="checked" name="nameCheckbox[]"> 
        <span class="switch__description">Значение 2</span> 
    </label>
`
    )      
