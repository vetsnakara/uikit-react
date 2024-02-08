<!DOCTYPE html>
<html lang="ru" th:with="
  _cookie=${@view.getCookie('lowVisHTML')?.value},
  theme=${_cookie == null || _cookie == 'false' ? 'common' : _cookie == 'true' ? 'blind-black-small-image' : _cookie}
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
    </th:block>
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
    <header class="header">
      <div class="header__wrapper">
        <div class="header__logo-link">
          <svg class="header__logo" viewBox="0 0 276 107" width="142" height="55" aria-label="Логотип">
            <path class="coloring_fill-brand2-dark-back" d="M124.374 95.179v-1.955h1.737v3.149h1.9v1.737h-1.9v4.886c0 .326.108.652.326.869.217.217.488.325.814.325.163 0 .271 0 .434-.054.163-.054.272-.054.38-.108l.163-.055v1.738c-.38.108-.814.217-1.357.217-1.792 0-2.714-.977-2.66-2.932V98.11h-1.737v-1.737h.977c.597 0 .923-.38.923-1.194zM135.72 98.056c-.272-.054-.543-.109-.869-.109-.705 0-1.303.218-1.737.706-.434.489-.651 1.14-.651 2.009v5.103h-1.901v-9.446h1.901v.977l.108-.109c.054-.054.163-.163.38-.271.163-.109.38-.272.597-.38.217-.109.489-.217.76-.272a5.39 5.39 0 0 1 .978-.108h.488v1.9h-.054zM143.755 105.819v-.977l-.109.108a2.031 2.031 0 0 1-.326.272c-.162.108-.38.271-.597.38a3.098 3.098 0 0 1-.76.271c-.325.109-.651.109-.977.109-1.14 0-2.009-.38-2.714-1.14-.706-.76-1.032-1.737-1.032-2.986v-5.483h1.9v5.483c0 .652.217 1.249.652 1.683.434.434.923.651 1.574.651.706 0 1.303-.217 1.737-.705.435-.489.652-1.14.652-2.009v-5.103h1.9v9.446h-1.9zM152.441 96.156c.325 0 .705.054 1.031.108.326.109.597.218.814.326.218.109.435.272.598.38.162.109.325.217.38.326l.108.163V92.03h1.9v13.735h-1.9v-1.086l-.38.38c-.163.163-.488.326-1.031.597-.543.272-1.032.326-1.575.326-1.194 0-2.28-.489-3.148-1.411-.869-.978-1.358-2.118-1.358-3.475 0-1.357.435-2.497 1.358-3.474.922-.978 1.954-1.466 3.203-1.466zm-1.738 7.166c.543.597 1.195.923 1.955.923.705 0 1.357-.326 1.954-.923a3.26 3.26 0 0 0 .869-2.226c0-.869-.272-1.629-.869-2.226-.543-.597-1.194-.923-1.954-.923-.706 0-1.357.326-1.955.923a3.259 3.259 0 0 0-.868 2.226c0 .869.271 1.629.868 2.226zM164.764 105.819h-1.9l-3.746-9.446h2.009l2.714 6.895 2.715-6.895h2.008l-3.8 9.446zM175.893 97.459l-1.249 1.248a57.111 57.111 0 0 0-.217-.217c-.108-.108-.271-.217-.597-.38a1.918 1.918 0 0 0-.923-.217c-.434 0-.76.109-.977.272-.217.217-.38.434-.38.705 0 .272.108.489.326.706.217.163.543.326.868.434.326.109.706.217 1.14.38l1.14.489c.38.163.652.434.869.814.217.38.326.815.326 1.357 0 .815-.326 1.52-.978 2.063-.651.543-1.465.869-2.497.869a5.34 5.34 0 0 1-1.303-.163 3.655 3.655 0 0 1-1.031-.434 7.844 7.844 0 0 1-.706-.489c-.217-.163-.326-.326-.434-.434l-.163-.163 1.249-1.249c.054.109.162.218.271.326.109.109.38.326.814.543.38.217.815.326 1.249.326.489 0 .923-.109 1.14-.326.271-.217.38-.489.38-.869 0-.271-.109-.488-.326-.705a3.259 3.259 0 0 0-.868-.435c-.326-.108-.706-.217-1.14-.38l-1.14-.488c-.38-.163-.652-.435-.869-.815-.217-.38-.326-.814-.326-1.357 0-.706.326-1.357.923-1.9.597-.543 1.412-.814 2.335-.814.38 0 .705.054 1.085.108.38.055.652.218.869.326.217.109.434.272.597.38.163.109.271.217.38.326l.163.163zM186.968 101.802h-7.22c.108.651.434 1.248.977 1.737.543.489 1.194.706 1.954.706.543 0 1.032-.109 1.52-.38.489-.272.815-.489.977-.706l.272-.38 1.248 1.249a.738.738 0 0 0-.162.217c-.055.108-.272.271-.489.488a7.676 7.676 0 0 1-.814.598c-.272.162-.652.325-1.14.488-.435.163-.923.217-1.412.217-1.303 0-2.443-.488-3.366-1.465-.923-.978-1.411-2.172-1.411-3.529 0-1.303.488-2.443 1.411-3.42.923-.923 2.009-1.412 3.312-1.412s2.389.434 3.257 1.303c.869.869 1.303 1.954 1.303 3.312l-.217.977zm-4.452-3.963c-.705 0-1.303.217-1.737.651-.434.434-.814.977-.977 1.629h5.32c-.108-.652-.38-1.195-.868-1.629-.489-.434-1.032-.651-1.738-.651zM201.083 105.819v-5.483c0-.76-.163-1.357-.543-1.737-.326-.38-.815-.597-1.412-.597s-1.086.271-1.52.76c-.38.488-.597 1.14-.597 2.008v5.103h-1.9v-5.483c0-.76-.163-1.357-.543-1.737-.326-.38-.814-.597-1.412-.597-.597 0-1.085.271-1.52.76-.38.489-.597 1.14-.597 2.009v5.103h-1.9v-9.446h1.9v.977c.055-.109.163-.217.326-.326.109-.108.434-.326.869-.543a2.94 2.94 0 0 1 1.357-.326c.38 0 .706.055 1.031.163.326.109.597.217.815.38.217.163.38.326.542.489.163.163.272.271.326.38l.109.163c0-.055.054-.109.108-.163.055-.054.163-.217.38-.38l.652-.489c.217-.163.543-.271.868-.38.38-.108.76-.163 1.14-.163 1.086 0 1.901.326 2.552 1.032.597.706.923 1.737.923 3.094v5.483h-1.954v-.054zM207.543 103.81c.271.272.38.543.38.923 0 .326-.109.652-.38.869-.271.271-.543.38-.869.38-.325 0-.651-.109-.868-.38-.272-.272-.38-.543-.38-.869 0-.325.108-.651.38-.923.271-.271.543-.38.868-.38.326 0 .598.163.869.38zM215.306 98.056a4.215 4.215 0 0 0-.868-.109c-.706 0-1.303.218-1.738.706-.434.489-.651 1.14-.651 2.009v5.103h-1.9v-9.446h1.9v.977l.109-.109a1.33 1.33 0 0 1 .38-.271c.162-.109.38-.272.597-.38.217-.109.488-.217.76-.272.271-.054.651-.108.977-.108h.489v1.9h-.055zM223.395 105.819v-.977l-.109.108a2.058 2.058 0 0 1-.325.272c-.163.108-.38.271-.598.38a3.098 3.098 0 0 1-.76.271c-.325.109-.651.109-.977.109-1.14 0-2.008-.38-2.714-1.14-.706-.76-1.032-1.737-1.032-2.986v-5.483h1.9v5.483c0 .652.218 1.249.652 1.683.434.434.923.651 1.574.651.706 0 1.303-.217 1.737-.705.435-.489.652-1.14.652-2.009v-5.103h1.9v9.446h-1.9z"></path>
            <path class="coloring_fill-brand3-dark-back" d="M33.062 68.143v34.527c0 2.118 2.28 3.421 4.125 2.335l28.665-17.264c1.737-1.031 1.737-3.583 0-4.614L37.187 65.863c-1.791-1.086-4.125.217-4.125 2.28zM33.062 2.672v34.527c0 2.117 2.28 3.42 4.125 2.334L65.852 22.27c1.737-1.032 1.737-3.583 0-4.614L37.187.392c-1.791-1.086-4.125.217-4.125 2.28zM0 35.408v34.527c0 2.117 2.28 3.42 4.126 2.334L32.79 55.006c1.737-1.032 1.737-3.583 0-4.615L4.126 33.127C2.28 32.042 0 33.346 0 35.407zM66.177 35.408v34.527c0 2.117 2.28 3.42 4.126 2.334l28.664-17.263c1.737-1.032 1.737-3.583 0-4.615L70.303 33.127c-1.846-1.085-4.126.218-4.126 2.28z"></path>
            <path class="coloring_fill-brand-dark-back" d="M138.38 23.41c1.466.76 2.606 1.791 3.42 3.203.815 1.357 1.195 2.986 1.195 4.886 0 1.846-.38 3.474-1.195 4.886-.814 1.411-1.954 2.443-3.42 3.203-1.466.76-3.257 1.085-5.266 1.085h-4.56v6.95h-5.266V22.323h9.88c2.009-.054 3.746.326 5.212 1.086zm-1.954 11.292c.814-.76 1.248-1.846 1.248-3.257 0-1.412-.434-2.498-1.248-3.258-.815-.76-2.009-1.14-3.638-1.14H128.5v8.795h4.288c1.629 0 2.823-.38 3.638-1.14zM161.561 42.14h-10.586l-2.009 5.428h-5.374l10.152-25.298h5.211l10.206 25.298h-5.537l-2.063-5.429zm-1.629-4.452l-3.583-9.664-3.583 9.664h7.166zM172.961 22.27h18.35v4.669h-13.138v5.211h6.297c2.769 0 4.832.652 6.298 1.9 1.466 1.303 2.171 3.095 2.171 5.538 0 2.551-.814 4.506-2.388 5.863-1.629 1.411-3.855 2.117-6.786 2.117h-10.804V22.27zm10.478 20.955c1.357 0 2.389-.271 3.094-.869.706-.597 1.086-1.465 1.086-2.605 0-2.226-1.411-3.312-4.18-3.312h-5.266v6.786h5.266zM202.223 46.32c-1.9-1.14-3.366-2.715-4.452-4.67-1.086-2.008-1.628-4.234-1.628-6.677 0-2.443.542-4.723 1.628-6.677 1.086-2.009 2.552-3.529 4.452-4.669 1.9-1.14 4.017-1.683 6.406-1.683 2.388 0 4.506.543 6.352 1.683a12.689 12.689 0 0 1 4.451 4.669c1.086 2.009 1.629 4.234 1.629 6.677 0 2.443-.543 4.723-1.629 6.678-1.086 2.008-2.551 3.528-4.451 4.668-1.901 1.14-4.018 1.683-6.352 1.683-2.389 0-4.506-.597-6.406-1.683zm10.043-4.343c1.086-.706 1.954-1.63 2.552-2.878.597-1.248.923-2.606.923-4.18 0-1.574-.326-2.986-.923-4.18-.598-1.249-1.466-2.172-2.552-2.877-1.086-.706-2.28-1.032-3.637-1.032-1.357 0-2.552.326-3.637 1.032-1.086.705-1.955 1.628-2.552 2.877-.597 1.248-.923 2.606-.923 4.18 0 1.574.326 2.986.923 4.18.597 1.249 1.466 2.172 2.552 2.878 1.085.705 2.28 1.03 3.637 1.03 1.303 0 2.551-.325 3.637-1.03zM242.993 27.047h-7.274v20.521h-5.212v-20.52h-7.275V22.27h19.761v4.777zM261.179 42.14h-10.586l-2.009 5.428h-5.374l10.152-25.298h5.211l10.207 25.298h-5.538l-2.063-5.429zm-1.683-4.452l-3.583-9.664-3.583 9.664h7.166zM138.217 58.914c1.466.76 2.606 1.792 3.42 3.203.815 1.358 1.195 2.986 1.195 4.886 0 1.846-.38 3.475-1.195 4.886-.814 1.412-1.954 2.443-3.42 3.203-1.466.76-3.257 1.086-5.266 1.086h-4.56v6.949h-5.266V57.829h9.88c2.009 0 3.746.325 5.212 1.085zm-1.9 11.292c.814-.76 1.249-1.846 1.249-3.257 0-1.412-.435-2.497-1.249-3.257-.814-.76-2.009-1.14-3.637-1.14h-4.289v8.794h4.289c1.574 0 2.768-.38 3.637-1.14zM152.603 81.824c-1.9-1.14-3.366-2.715-4.451-4.669-1.086-2.009-1.629-4.234-1.629-6.677 0-2.498.543-4.723 1.629-6.678 1.085-2.008 2.551-3.528 4.451-4.668 1.9-1.14 4.018-1.683 6.406-1.683 2.389 0 4.506.542 6.352 1.683 1.9 1.14 3.366 2.714 4.451 4.668 1.086 2.009 1.629 4.235 1.629 6.678 0 2.497-.543 4.723-1.629 6.677-1.085 2.009-2.551 3.529-4.451 4.669-1.9 1.14-4.017 1.683-6.352 1.683-2.388 0-4.506-.543-6.406-1.683zm10.043-4.289c1.086-.706 1.955-1.629 2.552-2.877.597-1.249.923-2.606.923-4.18 0-1.575-.326-2.986-.923-4.18-.597-1.25-1.466-2.172-2.552-2.878-1.085-.706-2.28-1.031-3.637-1.031-1.357 0-2.551.325-3.637 1.031-1.086.706-1.954 1.629-2.552 2.877-.597 1.25-.923 2.606-.923 4.18 0 1.575.326 2.986.923 4.18.598 1.25 1.466 2.172 2.552 2.878s2.28 1.032 3.637 1.032c1.303 0 2.552-.38 3.637-1.032zM181.43 81.878c-1.9-1.14-3.366-2.66-4.397-4.669-1.086-2.008-1.629-4.234-1.629-6.731 0-2.498.543-4.778 1.629-6.732 1.086-2.009 2.551-3.529 4.397-4.669 1.9-1.14 3.963-1.683 6.352-1.683 1.954 0 3.746.38 5.374 1.14 1.575.76 2.932 1.9 4.018 3.312l-3.366 3.474c-1.52-1.954-3.475-2.985-5.7-2.985-1.412 0-2.66.325-3.746 1.03a7.44 7.44 0 0 0-2.606 2.878c-.597 1.249-.923 2.606-.923 4.18 0 1.575.326 2.986.923 4.18.597 1.25 1.466 2.172 2.606 2.878 1.086.706 2.388 1.031 3.746 1.031 2.28 0 4.18-.977 5.7-2.986l3.366 3.475c-1.086 1.466-2.443 2.606-4.018 3.366-1.628.76-3.42 1.14-5.374 1.14-2.389 0-4.506-.543-6.352-1.629zM206.24 81.878c-1.9-1.14-3.366-2.66-4.397-4.669-1.086-2.008-1.629-4.234-1.629-6.731 0-2.498.543-4.778 1.629-6.732 1.085-2.009 2.551-3.529 4.397-4.669 1.9-1.14 3.963-1.683 6.352-1.683 1.954 0 3.745.38 5.374 1.14 1.574.76 2.932 1.9 4.017 3.312l-3.365 3.474c-1.521-1.954-3.475-2.985-5.701-2.985-1.411 0-2.66.325-3.746 1.03a7.445 7.445 0 0 0-2.605 2.878c-.598 1.249-.923 2.606-.923 4.18 0 1.575.325 2.986.923 4.18.597 1.25 1.465 2.172 2.605 2.878 1.086.706 2.389 1.031 3.746 1.031 2.28 0 4.18-.977 5.701-2.986l3.365 3.475c-1.085 1.466-2.443 2.606-4.017 3.366-1.629.76-3.42 1.14-5.374 1.14-2.389 0-4.506-.543-6.352-1.629zM226.815 57.829h5.212v16.503l10.857-16.503h4.94v25.298h-5.157v-16.45l-10.858 16.45h-4.994V57.829zM254.99 57.829h5.212v16.503L271.06 57.83H276v25.298h-5.212v-16.45l-10.857 16.45h-4.995V57.829h.054z"></path>
          </svg>
        </div>
        <!--  <div class="search-content header__search">
          <input class="search-content__input" type="text">
          <select class="search-content__select" autocomplete="off">
            <option value="VACANCY_NAME">по названию вакансии</option>
            <option value="VACANCY_DESCRIPTION" >по описанию вакансии</option>
            <option value="COMPANY_NAME" >по названию компании</option>
          </select>
          <button class="search-content__button">
            <span class="d-none d-md-block">
              Найти
            </span>
            <span class="d-md-none">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M20.9999 21L16.6499 16.65" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
          </button>
        </div>-->
        <div class="search-content header__search" data-name="search-content"><!-- Обертка в виде div только для шаблона поисковой выдачи, нужно для фронта -->
          <label class="input search-content__input">
            <input class="search-content__input-control input__control" type="search" name="search">
            <button class="button-close button_icon search-content__close-button d-none" data-action="title-search-clear" type="button" aria-label="Очистить">
              <svg class="icon button__icon search-content__close-icon">
                <use href="/assets/redesign-theme/uikit/icon/icons.svg#close"></use>
              </svg>
            </button>
          </label>
          <label class="search-content__select select">
            <select class="select__control" name="titleType" th:if="${@auth.isAuthorized() and #strings.indexOf( @parser.toString( @view.user.roles ), 'Работодатель' ) > -1}">
              <option value="CV_ALL" selected="">по всему резюме</option>
              <option value="CV_NAME">по названию резюме</option>
              <option value="CV_DESCRIPTION">по описанию резюме</option>
            </select>
            <select class="select__control" name="titleType" th:unless="${@auth.isAuthorized() and #strings.indexOf( @parser.toString( @view.user.roles ), 'Работодатель' ) > -1}">
              <option value="VACANCY_NAME" selected>по названию вакансии</option>
              <option value="VACANCY_DESCRIPTION">по описанию вакансии</option>
              <option value="COMPANY_NAME">по названию компании</option>
            </select>
          </label>
          <button class="search-content__button" data-action="title-search-search" type="submit">
            Найти
          </button>
        </div>
        <div class="search-content__mobile-container">
          <button class="search-content__mobile-button" type="button" data-name="search-button">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
              <path d="M20.9999 21L16.6499 16.65" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
          </button>
          <button class="search-content__burger burger" type="button" data-name="burger-button">
            <span class="burger__box">
              <span class="burger__inner"></span>
            </span>
          </button>
        </div>
      </div>
      <div class="header__wrapper d-none d-lg-block">
        <div class="search-panel mt-2" data-content="search-filter">
          <div class="search-panel__no-filters d-none"> <!-- выводится если нет фильтров-->
            Нажмите <b>"Все фильтры"</b> и задайте необходимые условия для отбора вакансий
          </div>
          <div class="search-panel__no-filters d-none"> <!-- выводится если нет фильтров при поиске курсов-->
            Нажмите <b>"Все фильтры"</b> и выберите необходимые параметры для учебных курсов.
          </div>
          <div class="search-panel__buttons">
            <button class="button button_plain search-panel__button" type="button">Сбросить фильтры</button>
            <button class="button button_plain button_icontext search-panel__button" data-tooltip="Добавить в автопоиски" type="button"><svg class="icon button__icon"><use href="/assets/redesign-theme/uikit/icon/icons.svg#loupe-like"></use></svg></button>
            <button data-toggle="modal" data-target="#all-filters" class="button button_secondary button_icontext search-panel__button" type="button"><svg class="icon button__icon"><use href="/assets/redesign-theme/uikit/icon/icons.svg#filter"></use></svg>Все фильтры</button>
          </div>
          <div class="search-panel__item">
            <label class="select select_closeable">
                <select class="select__control">
                    <option>Санкт-Петербург</option>
                </select>
                <button class="button button_plain select__close">
                  <svg class="icon icon_s"><use href="/assets/redesign-theme/uikit/icon/icons.svg#close"></use></svg>
                </button>
            </label>
          </div>
          <div class="search-panel__item">
            <label class="select select_closeable">
                <select class="select__control">
                    <option>Весь регион</option>
                </select>
                <button class="button button_plain select__close">
                  <svg class="icon icon_s"><use href="/assets/redesign-theme/uikit/icon/icons.svg#close"></use></svg>
                </button>
            </label>
          </div>
          <div class="search-panel__item">
            <label class="select">
                <select class="select__control">
                    <option>Весь регион</option>
                </select>
            </label>
          </div>
          <div class="search-panel__item">
            <label class="select select_closeable">
                <select class="select__control">
                    <option>Зарплата</option>
                </select>
                <button class="button button_plain select__close">
                  <svg class="icon icon_s"><use href="/assets/redesign-theme/uikit/icon/icons.svg#close"></use></svg>
                </button>
            </label>
          </div>
          <div class="search-panel__item">
            <label class="select select_closeable">
                <select class="select__control">
                    <option>График работы</option>
                </select>
                <button class="button button_plain select__close">
                  <svg class="icon icon_s"><use href="/assets/redesign-theme/uikit/icon/icons.svg#close"></use></svg>
                </button>
            </label>
          </div>
          <div class="search-panel__item">
            <label class="select select_closeable">
                <select class="select__control">
                    <option>Кадровое агенство</option>
                </select>
                <button class="button button_plain select__close">
                  <svg class="icon icon_s"><use href="/assets/redesign-theme/uikit/icon/icons.svg#close"></use></svg>
                </button>
            </label>
          </div>
          <div class="search-panel__item">
            <label class="select select_closeable">
                <select class="select__control">
                    <option>Маркетинг</option>
                </select>
                <button class="button button_plain select__close">
                  <svg class="icon icon_s"><use href="/assets/redesign-theme/uikit/icon/icons.svg#close"></use></svg>
                </button>
            </label>
          </div>
          <button class="button search-panel__button-light search-panel__item" type="button">еще 4</button>
          <button class="button search-panel__button-light search-panel__item" type="button">Показать меньше</button>
        </div>
      </div>
    </header>

    <main class="main">

      <div th:replace="fragments/iblocks :: list(*{iblocks})"></div>
    </main>

    <th:block th:utext="${@view.getMetrika('ff841f60-2b5a-11e8-a142-3da98a0a212b')}"></th:block>
    <th:block th:replace="fragments/resources :: resources"></th:block>
    <th:block th:replace="fragments/cssdebug"></th:block>
  </body>
</html>
