<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <!-- UI kit styles -->
    <link th:href="${@ResourceProcessor.wrap('/assets/redesign-theme/uikit/common.css')}" rel="stylesheet">
  </head>
  <body>
    <div class="main__wrapper">
      <div class="row">
        <div class="col-sm-6 col-12 order-sm-1 mb-2 mb-sm-0">
            <img class="image mx-auto" src="/information/resources/upload/error/resume-not-found.png" alt="">
        </div>
        <div class="col-sm-6 col-12">
          <div class="content">
            <h1 class="content__title">Вакансия была скрыта или удалена работодателем</h1>
            <div class="content__paragraph">Попробуйте поискать <a class="link" href="/vacancy/search">другие вакансии</a> на нашем портале или посетите полезные страницы:</div>
            <div class="content__paragraph"><a href="/about/candidate" class="link">Возможности портала</a></div>
            <div class="content__paragraph"><a href="/auth/manager/vacancies/new" class="link">Добавить вакансию</a></div>
            <div class="content__paragraph"><a href="/help/faq-candidate" class="link">Частые вопросы</a></div>
            <div class="content__paragraph mt-3">
              По вопросам работы портала вы можете обратиться в <a href="mailto:support_portal@rostrud.ru" class="link">техническую поддержку</a>
              </div>
          </div>
        </div>
      </div>
    </div>

  </body>
</html>