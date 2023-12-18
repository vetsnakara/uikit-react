
import { storiesOf } from "@storybook/html";

storiesOf('Trudvsem-theme / Graph - График', module)
  .addParameters({
    readme: {
      sidebar: `
      <div class="graph">
        <div class="graph__left">
            <div class="graph__column">
                <div class="graph__number graph__number-1">{{number-1}}</div>
                <div class="graph__value graph__value-1"></div>
            </div>
            <div class="graph__column">
                <div class="graph__number graph__number-2">{{number-2}}</div>
                <div class="graph__value graph__value-2"></div>
            </div>
            <div class="graph__column">
            <div class="graph__number graph__number-3">{{number-3}}</div>
            <div class="graph__value graph__value-3"></div>
        </div>
            <div class="graph__legend">
                <div class="graph__description">{{desc-1}}</div>
                <div class="graph__description">{{desc-2}}</div>
                <div class="graph__description">{{desc-3}}</div>
            </div>
        </div>
        <div class="graph__right">
            <div class="graph__column">
                <div class="graph__number graph__number-4">{{number-3}}</div>
                <div class="graph__value graph__value-4"></div>
            </div>
            <div class="graph__column">
                <div class="graph__number graph__number-5">{{number-4}}</div>
                <div class="graph__value graph__value-5"></div>
            </div>
            <div class="graph__column">
            <div class="graph__number graph__number-6">{{number-4}}</div>
            <div class="graph__value graph__value-6"></div>
        </div>
            <div class="graph__legend">
                <div class="graph__description">{{desc-4}}</div>
                <div class="graph__description">{{desc-5}}</div>
                <div class="graph__description">{{desc-6}}</div>
            </div>
        </div>
      </div>
        `,
    },
  })
  .add('Одиночный', () => `
<div class="graph">
    <div class="graph__left">
        <div class="graph__column">
            <div class="graph__number graph__number-1"></div>
            <div class="graph__value graph__value-1"></div>
        </div>
        <div class="graph__column">
            <div class="graph__number graph__number-2"></div>
            <div class="graph__value graph__value-2"></div>
        </div>
        <div class="graph__column">
            <div class="graph__number graph__number-3"></div>
            <div class="graph__value graph__value-3"></div>
        </div>
        <div class="graph__legend">
            <div class="graph__description">Зарегистрированных студентов</div>
            <div class="graph__description">Студентов проходят практику или стажировку</div>
            <div class="graph__description">Студентов проходят практику или стажировку</div>
        </div>
    </div>
    <div class="graph__right">
        <div class="graph__column">
            <div class="graph__number graph__number-4"></div>
            <div class="graph__value graph__value-4"></div>
        </div>
        <div class="graph__column">
            <div class="graph__number graph__number-5"></div>
            <div class="graph__value graph__value-5"></div>
        </div>
        <div class="graph__column">
            <div class="graph__number graph__number-6"></div>
            <div class="graph__value graph__value-6"></div>
        </div>
        <div class="graph__legend">
            <div class="graph__description">Зарегистрированных выпускников</div>
            <div class="graph__description">Выпускников трудоустроено</div>
            <div class="graph__description">Выпускников трудоустроено</div>
        </div>
    </div>
</div>
  `)
