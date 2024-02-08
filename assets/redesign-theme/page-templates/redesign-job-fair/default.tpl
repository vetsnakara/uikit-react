<!DOCTYPE html>
<html lang="ru" th:with="
  _cookie=${@view.getCookie('lowVisHTML')?.value},
  theme=${_cookie == null || _cookie == 'false' ? 'common' : _cookie == 'true' ? 'blind' : _cookie}
  ">
  <head th:attr="data-path=${@ResourceProcessor.wrap('/assets/redesign-theme/uikit/')}">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <th:block th:replace="fragments/head :: seo(${view})"></th:block>
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32">
    <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16">
    <link rel="manifest" href="/manifest.json">
    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#e64920">
    <meta name="apple-mobile-web-app-title" content="Работа России">
    <meta name="application-name" content="Работа России">
    <!-- Libraries -->
    <script th:src="${@ResourceProcessor.wrap('/assets/redesign-theme/scripts/jquery.js')}"></script>
    <script th:src="${@ResourceProcessor.wrap('/assets/redesign-theme/scripts/utils.js')}"></script>
    <script th:src="${@ResourceProcessor.wrap('/assets/redesign-theme/scripts/dayjs.js')}"></script>
    <script th:src="${@ResourceProcessor.wrap('/assets/redesign-theme/scripts/underscore.js')}"></script>
    <!-- UI kit -->
    <script th:src="${@ResourceProcessor.wrap('/assets/redesign-theme/scripts/uikit.js')}"></script>
    <script th:src="${@ResourceProcessor.wrap('/assets/redesign-theme/scripts/fallbacks.js')}" nomodule="true"></script>
    <script th:src="${@ResourceProcessor.wrap('/assets/redesign-theme/scripts/common.js')}"></script>
    <!-- UI kit styles -->
    <link class="theme-link" th:href="${@ResourceProcessor.wrap('/assets/redesign-theme/uikit/' + theme + '.css')}" rel="stylesheet" />
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
    [( ${@iblock.show([[${view.getSiteCode()}]], "divolte_lib")} )]
  </head>
  <body class="no-narrow job-fair">
    <header class="job-fair__header">
        <nav class="job-fair__nav">
            <div class="main__wrapper">
                <ul class="job-fair__menu">
                    <li><a href="#program" data-href="program" class="job-fair__menu-item">ПРОГРАММА</a></li>
                    <li><a href="#form" data-href="form" class="job-fair__menu-item">Заявка на посещение</a></li>
                    <li><a href="#contacts" data-href="contacts" class="job-fair__menu-item">КОНТАКТЫ</a></li>
                </ul>
            </div>
        </nav>
    </header>
    <div th:replace="fragments/iblocks :: list(*{iblocks})"></div>
    <footer class="job-fair__footer" id="contacts">
       <div class="main__wrapper">
          <h2 class="job-fair__subtitle job-fair__footer-subtitle mb-3">Контакты</h2>
          <a class="job-fair__footer-link" href="https://vk.com/mintrudrf" target="_blank">
             <svg class="icon icon_b mr-5">
                <use href="/assets/redesign-theme/uikit/icon/icons.svg#vk"></use>
             </svg>
          </a>
          <a class="job-fair__footer-link" href="https://ok.ru/mintrudrf" target="_blank">
             <svg class="icon icon_b">
                <use href="/assets/redesign-theme/uikit/icon/icons.svg#ok"></use>
             </svg>
          </a>
          <p class="job-fair__paragraph mt-2 mb-5">
             Электронная почта: <a href="mailto:rabota2023@mintrud.gov.ru" class="job-fair__footer-link job-fair__footer-link_decor">rabota2023@mintrud.gov.ru</a>
          </p>
          <div class="job-fair__footer-copyright content_smaller">
             ©&nbsp;Федеральная служба по труду и занятости —
             <a class="job-fair__footer-link job-fair__footer-link_decor" href="https://rostrud.gov.ru/" target="_blank" rel="noopener">rostrud.ru</a>. При копировании информации – ссылка на
             <a class="job-fair__footer-link job-fair__footer-link_decor" href="https://trudvsem.ru/" target="_blank" rel="noopener">trudvsem.ru</a> обязательна
          </div>
       </div>
    </footer>
    <th:block th:utext="${@view.getMetrika('ff841f60-2b5a-11e8-a142-3da98a0a212b')}"></th:block>
    <th:block th:replace="fragments/resources :: resources"></th:block>
    <th:block th:replace="fragments/cssdebug"></th:block>
    <script>
        const url = (new URL(document.location)).pathname;
        if(url ==='/job_fair' || url ==='/job_fair/') {
            $('[data-href="program"]').attr('href', '#program');
            $('[data-href="form"]').attr('href', '#form');
            $('[data-href="contacts"]').attr('href', '#contacts');
        } else {
            $('[data-href="program"]').attr('href', '/job_fair/#program');
            $('[data-href="form"]').attr('href', '/job_fair/#form');
            $('[data-href="contacts"]').attr('href', '/job_fair/#contacts');
        }
    </script>
  </body>
</html>
