import { storiesOf } from '@storybook/html';

storiesOf('Trudvsem-theme / Превью файла', module)
    .addParameters({
        readme: {
            sidebar: `
    <div class="file-preview">{{file-name}}</div>
        `,
        },
    })
    .add('Default', () => `
    <div class="file-preview">Имя файла</div>
    `)

    .addParameters({
        readme: {
            sidebar: `
    <div class="file-preview" data-ext="doc">{{file-name}}</div>
        `,
        },
    })
    .add('DOC', () => `
    <div class="file-preview" data-ext="doc">Имя файла</div>
    `)

    .addParameters({
        readme: {
            sidebar: `

    <div class="file-preview" data-ext="zip">{{file-name}}</div>
   
        `,
        },
    })
    .add('ZIP', () => `

    <div class="file-preview" data-ext="zip">Имя файла</div>

    `)

    .addParameters({
        readme: {
            sidebar: `
    <div class="file-preview" data-ext="pdf">{{file-name}}</div>
        `,
        },
    })
    .add('PDF', () => `

    <div class="file-preview" data-ext="pdf">Имя файла</div>
    `)