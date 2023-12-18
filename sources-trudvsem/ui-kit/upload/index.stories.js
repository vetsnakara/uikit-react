import { storiesOf } from '@storybook/html';

storiesOf('Trudvsem-theme / Загрузка файла', module)
  .addParameters({
    readme: {
      sidebar: `
    <label class="upload" data-change="false" data-name="{{input-label}}" data-document=""> 
      <span class="upload__file"></span> 
      <span class="upload__delete"></span>
      <input multiple  class="upload__control" type="file" name="TODO" hidden=""> 
      <span class="upload__label">{{label}}</span>
    </label>
    `,
    },
  })
  .add('Default', () => `
    <label class="upload" data-change="false" data-name="Выбрать" data-document=""> 
      <span class="upload__file"></span> 
      <span class="upload__delete"></span>
      <input multiple  class="upload__control" type="file" name="TODO" hidden=""> 
      <span class="upload__label">Лейбл</span>
    </label>
  `)
  .addParameters({
    readme: {
      sidebar: `
    <label class="upload" data-change="false" data-name="{{input-label}}" data-document=""> 
      <span class="upload__file"></span> 
      <span class="upload__delete"></span>
      <input required multiple class="upload__control" type="file" name="TODO" hidden=""> 
      <span class="upload__label">{{label}}</span>
    </label>
    `,
    },
  })
  .add('Обязательный', () => `
    <label class="upload" data-change="false" data-name="Выбрать" data-document=""> 
      <span class="upload__file"></span> 
      <span class="upload__delete"></span>
      <input required multiple  class="upload__control" type="file" name="TODO" hidden=""> 
      <span class="upload__label">Лейбл</span>
    </label>
  `)
