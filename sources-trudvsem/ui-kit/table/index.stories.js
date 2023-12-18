
import { storiesOf } from '@storybook/html';

storiesOf('Trudvsem-theme / Table - Таблица', module)
  .addParameters({
    readme: {
      sidebar: `
    <div class="table__wrapper">
        <table class="table">
            <thead class="table__header">
            <tr class="table__head">
                <th class="table__title">{{title}}</th>
                <th class="table__title">
                <button class="table__sorting" data-column-code="{{sorting-name}}">{{title}}</button>
                </th>
            </tr>
            </thead>
            <tbody class="table__body">
            <tr class="table__item">
                <td class="table__cell">{{content}}</td>
                <td class="table__cell" data-content="{{sorting-name}}">{{content}}</td>
            </tr>
            </tbody>
        </table>
    </div>
        `,
    },
  })
  .add('Default', () => `
  <div class="table__wrapper">
    <table class="table">
        <thead class="table__header">
            <tr class="table__head">
                <th class="table__title">Заголовок</th>
                <th class="table__title"><button class="table__sorting" data-column-code="col">Сортируемый заголовок</button></th>
            </tr>
        </thead>
        <tbody class="table__body">
            <tr class="table__item">
                <td class="table__cell">контент</td>
                <td class="table__cell">контент</td>
            </tr>
        </tbody>
    </table>
  </div>`
      )

  .addParameters({
        readme: {
            sidebar: `
    <div class="table__wrapper">
        <table class="table table_stripless">
            <thead class="table__header">
            <tr class="table__head">
                <th class="table__title">{{title}}</th>
                <th class="table__title">
                <button class="table__sorting" data-column-code="{{sorting-name}}">{{title}}</button>
                </th>
            </tr>
            </thead>
            <tbody class="table__body">
            <tr class="table__item">
                <td class="table__cell">{{content}}</td>
                <td class="table__cell" data-content="{{sorting-name}}">{{content}}</td>
            </tr>
            </tbody>
        </table>
    </div>
        `,
        },
    })
  .add('Stripless', () => `
  <div class="table__wrapper">
    <table class="table table_stripless">
        <thead class="table__header">
            <tr class="table__head">
                <th class="table__title">Заголовок</th>
                <th class="table__title"><button class="table__sorting" data-column-code="col">Сортируемый заголовок</button></th>
            </tr>
        </thead>
        <tbody class="table__body">
            <tr class="table__item">
                <td class="table__cell">контент</td>
                <td class="table__cell">контент</td>
            </tr>
        </tbody>
    </table>
  </div>`
    )