
import { storiesOf } from "@storybook/html";

storiesOf('Trudvsem-theme / Модальные окна', module)
  .addParameters({
    readme: {
      sidebar: `
    <a data-toggle="modal" data-target="#{{modal-ID}}" class="button">{{title-link}}</a>
    <div id="{{modal-ID}}" class="modal" role="dialog" aria-hidden="true" tabindex="-1">
        <div class="modal__header">
            <h2>Заголовок</h2>
            <button class="modal__close" type="button" data-dismiss="modal"></button>
        </div>
        <div class="modal__body" role="document">
            {{content}}
        </div>
        <div class="modal__footer">
            <div class="group-container group-container_align-right">               
               <button class="button group-container__item" data-dismiss="modal" title="Действие диалога">{{footer-action-title}}</button>
            </div>            
        </div>
    </div>
        `,
    },
  })
  .add('Default', () => `
  <a data-toggle="modal" data-target="#modalKit1" class="button">вызов диалога</a>
  <div id="modalKit1" class="modal" role="dialog" tabindex="-1" aria-hidden="true">
    <div class="modal__header">
    <h2>Заголовок</h2>
    <button class="modal__close" type="button" data-dismiss="modal"></button></div>
    <div class="modal__body" role="document">Содержимое</div>
    <div class="modal__footer">
      <div class="group-container group-container_align-right">       
       <button class="button group-container__item" data-dismiss="modal" title="Действия диалога">Какое-то действие</button>
      </div>
      
    </div>
    </div>
  `)
