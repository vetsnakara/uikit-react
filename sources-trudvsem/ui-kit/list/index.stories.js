import { storiesOf } from '@storybook/html';

storiesOf('Trudvsem-theme / List - Список', module)
.addParameters({
    readme: {
    sidebar: `
    <ul class="list">
        <li class="list__item">{{text}}</li>
    </ul>
    `,
    },
})
.add('Default', () => `
    <ul class="list">
        <li class="list__item">элемент списка</li>
        <li class="list__item">элемент списка</li>
    </ul>
`)

.addParameters({
    readme: {
    sidebar: `
    <ol class="list list_ordered">
        <li class="list__item">{{text}}</li>
    </ol>
    `,
    },
})
.add('Нумерованый', () => `
    <ol class="list list_ordered">
        <li class="list__item">элемент списка</li>
        <li class="list__item">элемент списка</li>
    </ol>
    `)

.addParameters({
    readme: {
        sidebar: `
    <ol class="list list_leadzero">
        <li class="list__item">{{text}}</li>
    </ol>
    `,
    },
})
.add('С ведущим нулем', () => `
    <ol class="list list_leadzero">
        <li class="list__item">элемент списка</li>
        <li class="list__item">элемент списка</li>
    </ol>
    `)

.addParameters({
    readme: {
        sidebar: `
    <ol class="list list_greek">
        <li class="list__item">{{text}}</li>
    </ol>
    `,
    },
})
.add('Греческий', () => `
    <ol class="list list_greek">
        <li class="list__item">элемент списка</li>
        <li class="list__item">элемент списка</li>
    </ol>
    `)

.addParameters({
    readme: {
        sidebar: `
    <ol class="list list_russian">
        <li class="list__item">{{text}}</li>
    </ol>
    `,
    },
})
.add('Русский', () => `
    <ol class="list list_russian">
        <li class="list__item">элемент списка</li>
        <li class="list__item">элемент списка</li>
    </ol>
    `)
        