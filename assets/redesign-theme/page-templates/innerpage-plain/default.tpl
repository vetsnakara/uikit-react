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
  <body>
    <main class="container-fluid">
      <div th:replace="fragments/iblocks :: list(*{iblocks})"></div>
    </main>

    <th:block th:utext="${@view.getMetrika('ff841f60-2b5a-11e8-a142-3da98a0a212b')}"></th:block>
    <th:block th:replace="fragments/resources :: resources"></th:block>
  </body>
</html>
