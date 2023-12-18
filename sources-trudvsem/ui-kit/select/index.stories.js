
import { storiesOf } from "@storybook/html";

storiesOf('Trudvsem-theme / Select - Выпадающий список', module)
  .addParameters({
    readme: {
      sidebar: `
    <label class="select">
      <select class="select__control">
        <option value="{{option}}">{{value}}</option>
      </select>
      <span class="select__label">{{label}}</span>
    </label>
        `,
    },
  })
  .add('Одиночный', () => `
  <label class="select">
    <select class="select__control">
      <option>Значение 1</option>
      <option>Значение 2</option>
      <option>Значение 3</option>
    </select>
    <span class="select__label">Лейбл</span>
  </label>
  `)

  .addParameters({
    readme: {
      sidebar: `
    <label class="select">
      <select class="select__control" multiple>
        <option value="{{option}}">{{value}}</option>
      </select>
      <span class="select__label">{{label}}</span>
    </label>
        `,
    },
  })
  .add('Множественный', () => `
    <label class="select">
    <select class="select__control" multiple>
      <option>Значение 1</option>
      <option>Значение 2</option>
      <option>Значение 3</option>
    </select>
    <span class="select__label">Лейбл</span>
  </label>
  `)

  .addParameters({
    readme: {
      sidebar: `
    <label class="select">
      <select required class="select__control">
        <option value="{{option}}">{{value}}</option>
      </select>
      <span class="select__label">{{label}}</span>
    </label>
        `,
    },
  })
  .add('Обязательный', () => `
  <label class="select">
    <select required class="select__control">
      <option>Значение 1</option>
      <option>Значение 2</option>
      <option>Значение 3</option>
    </select>
    <span class="select__label">Лейбл</span>
  </label>
  `)