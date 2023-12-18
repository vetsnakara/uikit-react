
import { storiesOf } from '@storybook/html';

storiesOf('Trudvsem-theme / Spoiler - Раскрывающийся блок с управляющей кнопкой', module)
.addParameters({
    readme: {
        sidebar: `
    <a class="spoiler__control" href="#{{spoiler-ID}}">{{title}}</a>
    <div id="{{spoiler-ID}}" class="spoiler">{{content}}</div>
        `, 
    },
    })
.add('Спойлер свернут', () => `<a class="spoiler__control mb-1" href="#description-0">Спойлер</a><div id="description-0" class="spoiler" style="">контент</div>` )

.addParameters({
    readme: {
        sidebar: `
    <a class="spoiler__control" href="#{{spoiler-ID}}" aria-expanded="true">{{title}}</a>
    <div id="{{spoiler-ID}}" class="spoiler spoiler_active">{{content}}</div>
        `,
    },
    })
.add('Спойлер раскрыт', () => `<a class="spoiler__control mb-1" href="#description-1" aria-expanded="true">Спойлер</a><div id="description-1" class="spoiler spoiler_active">контент</div>` )
