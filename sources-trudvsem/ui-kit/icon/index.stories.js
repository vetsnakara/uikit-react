import { storiesOf } from "@storybook/html";
const src = require("../../../assets/trudvsem-theme/uikit/icon/icons.svg");
storiesOf("Trudvsem-theme / Icon - Иконка", module)
    .addParameters({
        readme: {
            sidebar: `
    <svg class="icon">
        <use href="{{src}}#{{icon}}"></use>
    </svg>
      `,
        },
    })
    .add(
        "Default",
        () => `
  <svg class="icon"><use href="${src}#question"></use></svg>
  <svg class="icon"><use href="${src}#calendar"></use></svg>
  <svg class="icon"><use href="${src}#done"></use></svg>
  <svg class="icon"><use href="${src}#colored-calendar"></use></svg>
  <svg class="icon"><use href="${src}#colored-checklist"></use></svg>
  <svg class="icon"><use href="${src}#colored-human"></use></svg>
  <svg class="icon"><use href="${src}#next"></use></svg>
  <svg class="icon"><use href="${src}#download"></use></svg>
  <svg class="icon"><use href="${src}#delete"></use></svg>
  <svg class="icon"><use href="${src}#copy"></use></svg>
  <svg class="icon"><use href="${src}#down"></use></svg>
  <svg class="icon"><use href="${src}#up"></use></svg>

  `
    )

    .addParameters({
        readme: {
            sidebar: `
    <svg class="icon icon_x05">
        <use href="{{src}}#{{icon}}"></use>
    </svg>
      `,
        },
    })
    .add("Уменьшенная (х05)", () => `<svg class="icon icon_x05"><use href="${src}#question"></use></svg>`)

    .addParameters({
        readme: {
            sidebar: `
    <svg class="icon icon_x2">
        <use href="{{src}}#{{icon}}"></use>
    </svg>
      `,
        },
    })
    .add("Увеличенная (х2)", () => `<svg class="icon icon_x2"><use href="${src}#question"></use></svg>`)

    .addParameters({
        readme: {
            sidebar: `
    <svg class="icon icon_brand">
        <use href="{{src}}#{{icon}}"></use>
    </svg>
      `,
        },
    })
    .add("Цвета бренда", () => `<svg class="icon icon_brand"><use href="${src}#question"></use></svg>`)

    .addParameters({
        readme: {
            sidebar: `
    <svg class="icon icon_good">
        <use href="{{src}}#{{icon}}"></use>
    </svg>
      `,
        },
    })
    .add("Зеленого цвета", () => `<svg class="icon icon_good"><use href="${src}#question"></use></svg>`);
