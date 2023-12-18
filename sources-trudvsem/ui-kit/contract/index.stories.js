import { storiesOf } from '@storybook/html';

storiesOf('Trudvsem-theme / Contract', module)
  .addParameters({
    readme: {
      sidebar: `
    <ul class="contract">
      <li class="contract__element contract__element_done">
        <div class="contract__icon"></div>
        <div class="contract__title">{{title}}</div>
        <div class="contract__date">{{date}}</div>
      </li>
      <li class="contract__element contract__element_inprogress">
        <div class="contract__icon"></div>
        <div class="contract__title">{{title}}</div>
      </li>
      <li class="contract__element">
        <div class="contract__icon"></div>
        <div class="contract__title">{{title}}</div>
      </li>
    </ul>
        `,
    },
  })
  .add('Заголовок', () => `
    <ul class="contract">
        <li class="contract__element contract__element_done">
            <div class="contract__icon"></div>
            <div class="contract__title">Стадия 1</div>
            <div class="contract__date">Дата</div>
        </li>
        <li class="contract__element contract__element_inprogress">
            <div class="contract__icon"></div>
            <div class="contract__title">Стадия 2</div>
        </li>
            <li class="contract__element">
            <div class="contract__icon"></div>
            <div class="contract__title">Стадия 3</div>
        </li>
    </ul>

`)