
import { storiesOf } from '@storybook/html';

storiesOf('Trudvsem-theme / Pagination - Пагинация', module)
  .addParameters({
    readme: {
      sidebar: `
    <div class="pagination">
        <div class="pagination__item pagination__item_previous pagination__item_disabled">назад</div>
        <div class="pagination__item pagination__item_active">1</div>
        <div class="pagination__item">2</div>
        <div class="pagination__item pagination__item_next">вперед</div>
    </div>
        `,
    },
  })
  .add('Pagination', () => `
    <div class="pagination">
        <div class="pagination__item pagination__item_previous pagination__item_disabled">назад</div>
        <div class="pagination__item pagination__item_active">1</div>
        <div class="pagination__item">2</div>
        <div class="pagination__item">3</div>
        <div class="pagination__item">4</div>
        <div class="pagination__item">5</div>        
        <div class="pagination__item pagination__item_next">вперед</div>
    </div>`
      )
