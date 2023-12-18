import { storiesOf } from '@storybook/html';
storiesOf('Trudvsem-theme / notification', module)
  .addParameters({
    readme: {
      sidebar: `
      <div class="notification_open">
        <div class="notification__header">
          <h3 class="notification__title">{{title}}</h3>
          <div class="notification__counter">{{counter}}</div>
          <div class="notification__control"></div>
        </div>
        <div class="notification__item">{{item}}</div>
      </div>
      `,
    },
  })
  .add('Default', () => `
  <div class="notification_open">
  <div class="notification__header">
  <h3 class="notification__title">Новые</h3>
  <div class="notification__counter">2</div>
  <div class="notification__control"></div>
  </div>
  <div class="notification__item">Входящая заявка. ООО "Титан"</div>
  <div class="notification__item">Договор на проведение практики. ООО "Р-Тех", СПбГУАП</div>
  </div>
  `)