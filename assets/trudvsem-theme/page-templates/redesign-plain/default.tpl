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
  <body class="no-narrow">
    <div th:replace="fragments/iblocks :: list(*{iblocks})"></div>
    <th:block th:utext="${@view.getMetrika('ff841f60-2b5a-11e8-a142-3da98a0a212b')}"></th:block>
    <th:block th:replace="fragments/resources :: resources"></th:block>
    <th:block th:replace="fragments/cssdebug"></th:block>
  </body>
</html>
