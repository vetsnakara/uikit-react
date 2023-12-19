<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <th:block th:replace="fragments/head :: seo(${view})"></th:block>
    <link rel="icon" th:href="${@ResourceProcessor.wrap('/assets/trudvsem-theme/images/favicon.ico')}" type="image/x-icon"/>
    <!-- Libraries -->
    <script th:src="${@ResourceProcessor.wrap('/assets/trudvsem-theme/scripts/jquery.js')}"></script>
    <script th:src="${@ResourceProcessor.wrap('/assets/trudvsem-theme/scripts/underscore.js')}"></script>
    <script th:src="${@ResourceProcessor.wrap('/assets/trudvsem-theme/scripts/dayjs.js')}"></script>
    <script th:src="${@ResourceProcessor.wrap('/assets/trudvsem-theme/scripts/dayjs_plugin_utc.min.js')}"></script>
    <script th:src="${@ResourceProcessor.wrap('/assets/trudvsem-theme/scripts/dayjs_plugin_timezone.min.js')}"></script>
    <script th:src="${@ResourceProcessor.wrap('/assets/trudvsem-theme/scripts/utils.js')}"></script>
    <script th:src="${@ResourceProcessor.wrap('/assets/trudvsem-theme/scripts/common.js')}"></script>
    <!-- UI kit -->
    <script th:src="${@ResourceProcessor.wrap('/assets/trudvsem-theme/scripts/uikit.js')}"></script>
    <script th:src="${@ResourceProcessor.wrap('/assets/trudvsem-theme/uikit/icon/index.js')}" nomodule="true"></script>
    <!-- UI kit styles -->
    <link th:href="${@ResourceProcessor.wrap('/assets/trudvsem-theme/uikit/common.css')}" rel="stylesheet">
    <!-- Auth data -->
    <script th:if="${@auth.isAuthorized()}">
      var isAuthorized = true;
      var userRoles = [(${ @parser.toString(@auth.getCurrentRoles()) })];
      var currentUser = [(${ @parser.toString(@auth.user()) })];
      var currentUserFull = [(${ @parser.toString(@view.user) })];
    </script>
    <script th:unless="${@auth.isAuthorized()}">
      var isAuthorized = false;
      var userRoles = null;
      var currentUser = null;
      var currentUserFull = null;
    </script>
  </head>
  <body class="for-gosbar">
    <div class="top-info-panel">
      <div class="important-info">
        <span class="important-info__text">Попробуйте новый дизайн портала «Работа России»</span>
        <a href="https://redesign.trudvsem.ru/" class="important-info__link important-info__link_blue">Попробовать</a>
      </div>
    </div>
    <header class="header container-fluid">
      <div class="container">
        <a href="/" title="Работа в России" class="header__logo"></a>
      </div>
    </header>
    <main class="container-fluid">
      <div th:replace="fragments/iblocks :: list(*{iblocks})"></div>
    </main>
    <footer class="footer mt-2" role="contentinfo">
      <div class="footer__projects container">
        <a class="footer__link link_bright" rel="external" href="http://www.rostrud.ru/" target="_blank">Роструд</a>
        <a class="footer__link link_bright" rel="external" href="http://www.rosmintrud.ru/" target="_blank">Минтруд России</a>
        <a class="footer__link link_bright" rel="external" href="http://gossluzhba.gov.ru/" target="_blank">Портал госслужбы</a>
        <a class="footer__link link_bright" rel="external" href="http://онлайнинспекция.рф/" target="_blank">Онлайнинспекция.рф</a>
        <a class="footer__link link_bright" rel="external" href="http://www.aiss.gov.ru/" target="_blank">Соотечественники</a>
        <a class="footer__link link_bright" rel="external" href="http://tpprf.ru/ru/" target="_blank">Торгово-промышленная палата РФ</a>
        <a class="footer__link link_bright" rel="external" href="http://zpp.rospotrebnadzor.ru/" target="_blank">Роспотребнадзор</a>
        <a class="footer__link link_bright" rel="external" href="https://nark.ru/services" target="_blank">Национальная система квалификаций</a>
        <a class="footer__link link_bright link-rb" rel="external" href="http://gsz.gov.by/" target="_blank">Государственная служба занятости Республики Беларусь</a>
      </div>
      <div class="footer__common container">
        <div class="row">
          <section class="footer__column col-12 col-sm-4 col-lg-2">
            <img alt="Логотип" th:src="${@ResourceProcessor.wrap('/assets/trudvsem-theme/images/logo-prime.png')}">
          </section>
          <section class="footer__column col-12 col-sm-8 col-lg-4">
            <div>
              <h5 class="footer__title">Мобильное приложение</h5>
              <a class="appstore" href="https://apps.apple.com/ru/app/rabota-v-rossii/id1080627340?l=en" title="Доступно в App Store"></a>
              <a class="googleplay" href="https://play.google.com/store/apps/details?id=ru.trudvsem" title="Загрузите на Google play"></a>
            </div>
            <div>
              <h5 class="footer__title" style="visibility: hidden;">Важные ссылки</h5>
              <a class="footer__link link_bright link-security" href="/security">Меры безопасности</a>
              <a class="footer__link link_bright link-feedback" href="/information/about/help">Техническая поддержка</a>
              <a class="footer__link link_bright" href="/assets/doc/politic_personal_data.pdf" target="_blank">Политика обработки персональных данных</a>
            </div>
          </section>
          <section class="footer__column col-12 col-sm-4 col-lg-2">
            <h5 class="footer__title">Общая информация</h5>
            <ul class="footer__links-list">
              <li><a class="footer__link link_bright" href="/czn">Государственная служба занятости</a></li>
              <li><a class="footer__link link_bright" href="/opendata">Открытые данные</a></li>
              <li><a class="footer__link link_bright" href="/opendata/media-partners">Партнеры</a></li>
              <li><a class="footer__link link_bright" href="/information/about/help">Помощь</a></li>
            </ul>
          </section>
          <section class="footer__column col-12 col-sm-4 col-lg-2">
            <h5 class="footer__title">Соискатели</h5>
            <ul class="footer__links-list">
              <li><a class="footer__link link_bright" href="/vacancy/search">Найти работу</a></li>
              <li><a class="footer__link link_bright" href="/auth/candidate/cv/new">Добавить резюме</a></li>
              <li><a class="footer__link link_bright" href="/employers">Крупнейшие работодатели</a></li>
              <li><a class="footer__link link_bright" href="/special">Трудоустройство инвалидов</a></li>
              <li><a class="footer__link link_bright" href="/facilities/candidate">Впервые на сайте</a></li>
            </ul>
          </section>
          <section class="footer__column col-12 col-sm-4 col-lg-2">
            <h5 class="footer__title">Работодатели</h5>
            <ul class="footer__links-list">
              <li><a class="footer__link link_bright" href="/cv/search">Найти резюме</a></li>
              <li><a class="footer__link link_bright" href="/auth/manager/vacancy/new">Добавить вакансию</a></li>
              <li><a class="footer__link link_bright" href="/facilities/manager">Впервые на сайте</a></li>
            </ul>
          </section>
        </div>
        <div class="footer__copyright">
          <div class="container">
            <small>
              &copy; Федеральная служба по труду и занятости —
              <a class="footer__link link_bright" rel="external" href="http://rostrud.ru/" target="_blank">rostrud.ru</a>
            </small>
            <small>
              При копировании информации – ссылка на
              <a class="footer__link link_bright" rel="external" href="http://trudvsem.ru" target="_blank">trudvsem.ru</a>
              обязательна.
            </small>
          </div>
        </div>
      </div>
    </footer>

    <th:block th:utext="${@view.getMetrika('ff841f60-2b5a-11e8-a142-3da98a0a212b')}"></th:block>
    <th:block th:replace="fragments/resources :: resources"></th:block>
  </body>
</html>
