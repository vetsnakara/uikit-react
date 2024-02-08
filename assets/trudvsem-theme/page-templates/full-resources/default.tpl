<!DOCTYPE html>
<html lang="ru" data-th-with="cwh=${@view.getCookie('lowVisHTML')}" data-th-classappend="${null!=cwh?(' '+T(java.net.URLDecoder).decode(cwh.value)):''}">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
		<meta http-equiv="X-UA-Compatible" content="IE=edge"/>

		<th:block th:replace="fragments/head :: seo(${view})"></th:block>

		<link th:href="${@ResourceProcessor.wrap('/assets/default-theme/css/bootstrap.min.css')}" rel="stylesheet">
		<link th:href="${@ResourceProcessor.wrap('/assets/default-theme/css/font-awesome.min.css')}" rel="stylesheet">
		<link th:href="${@ResourceProcessor.wrap('/assets/default-theme/css/bootstrap-datepicker.min.css')}" rel="stylesheet">
		<link th:href="${@ResourceProcessor.wrap('/assets/default-theme/css/bootstrap-select.css')}" rel="stylesheet">
		<link th:href="${@ResourceProcessor.wrap('/assets/default-theme/css/billboard.min.css')}" rel="stylesheet">
		<link th:href="${@ResourceProcessor.wrap('/assets/default-theme/css/theme.css')}" rel="stylesheet">
		<link th:href="${@ResourceProcessor.wrap('/assets/default-theme/css/temp.css')}" rel="stylesheet">
		<link th:href="${@ResourceProcessor.wrap('/assets/default-theme/css/static-pages.css')}" rel="stylesheet">
		<link th:href="${@ResourceProcessor.wrap('/assets/default-theme/css/datatables.min.css')}" rel="stylesheet">
		<link th:href="${@ResourceProcessor.wrap('/assets/default-theme/css/datatables_custom.css')}" rel="stylesheet">

        <link th:href="${@ResourceProcessor.wrap('/assets/default-theme/palette/palette.css')}" rel="stylesheet">
        <link th:href="${@ResourceProcessor.wrap('/assets/default-theme/palette/pp-editor.css')}" rel="stylesheet">
		<link th:href="${@ResourceProcessor.wrap('/assets/default-theme/css/infoblocks.css')}" rel="stylesheet">
		<link th:href="${@ResourceProcessor.wrap('/assets/main-theme/css/infoblocks.css')}" rel="stylesheet">
		<link th:href="${@ResourceProcessor.wrap('/assets/default-theme/css/professiogram.css')}" rel="stylesheet">
		<link th:href="${@ResourceProcessor.wrap('/assets/default-theme/css/selectize.bootstrap3.css')}" rel="stylesheet">
		<link th:href="${@ResourceProcessor.wrap('/assets/default-theme/css/important-info.css')}" rel="stylesheet">

		<script th:src="${@ResourceProcessor.wrap('/assets/default-theme/scripts/moment.min.js')}"></script>
		<script th:src="${@ResourceProcessor.wrap('/assets/default-theme/scripts/jquery.min.js')}"></script>
		<script th:src="${@ResourceProcessor.wrap('/assets/default-theme/scripts/device.js')}"></script>
		<script th:src="${@ResourceProcessor.wrap('/assets/default-theme/scripts/bootstrap-datepicker.min.js')}"></script>
		<script th:src="${@ResourceProcessor.wrap('/assets/default-theme/scripts/bootstrap-datepicker.ru.min.js')}"></script>
		<script th:src="${@ResourceProcessor.wrap('/assets/default-theme/scripts/bootstrap-select.min.js')}"></script>
		<script th:src="${@ResourceProcessor.wrap('/assets/default-theme/scripts/bootstrap.min.js')}"></script>
		<script th:src="${@ResourceProcessor.wrap('/assets/default-theme/scripts/underscore-min.js')}"></script>
		<script th:src="${@ResourceProcessor.wrap('/assets/default-theme/scripts/d3.v4.min.js')}"></script>
		<script th:src="${@ResourceProcessor.wrap('/assets/default-theme/scripts/d3-tip.js')}"></script>
		<script th:src="${@ResourceProcessor.wrap('/assets/default-theme/scripts/hogan.min.js')}"></script>
		<script th:src="${@ResourceProcessor.wrap('/assets/default-theme/scripts/billboard.min.js')}"></script>
		<script th:src="${@ResourceProcessor.wrap('/assets/default-theme/scripts/share.js')}"></script>
		<script th:src="${@ResourceProcessor.wrap('/assets/default-theme/scripts/common.js')}"></script>
		<script th:src="${@ResourceProcessor.wrap('/assets/default-theme/scripts/plugins.js')}"></script>
		<script th:src="${@ResourceProcessor.wrap('/assets/default-theme/scripts/main.js')}"></script>


		<meta name="author" content="Роструд - Федеральная служба по труду и занятости РФ"/>
        <meta name="copyright" content="Федеральная служба по труду и занятости — rostrud.ru При копировании информации – ссылка на trudvsem.ru обязательна."/>
        <meta http-equiv="Reply-to" content="support_portal@rostrud.ru"/>
		<meta name="viewport" content="width=device-width, initial-scale=1"/>
		<meta name="robots" content="noyaca"/>

		<link rel="icon" href="/assets/img/favicon.ico" type="image/x-icon"/>
		<script th:inline="javascript" th:if="${@auth.isAuthorized()}">var userRoles = [(${@parser.toString(@auth.getCurrentRoles())})];</script>
	</head>
	<body class="for-gosbar" data-th-with="cwb=${@view.getCookie('lowVisBody')}" data-th-classappend="${null!=cwb?(' '+T(java.net.URLDecoder).decode(cwb.value)):''}">
		<div class="fixed-info-panel">
			<div class="important-info">
        <span class="important-info__text">Попробуйте новый дизайн портала «Работа России»</span>
        <a href="https://redesign.trudvsem.ru/" class="important-info__link important-info__link_blue">Попробовать</a>
      </div>
		</div>
		<div class="wrapper">
			<!--Шапка -->
			<header class="header">
				<div class="container">
					<div class="row">
						<div class="col-xs-12">
							<a href="/" title="Работа в России" class="header__logo"></a>
						</div>
					</div>
				</div>
			</header>
			<!--Контент -->
			<main class="main container">
				<div th:replace="fragments/iblocks :: list(*{iblocks})"></div>
			</main>
			<!-- Подвал-->
			<footer id="main_footer" class="clearfix" role="contentinfo">
				<div class="top-links-block">
				    <div class="container">
					    <div class="col-xs-12 top-links-decor">
						    <a rel="external" href="http://www.rostrud.ru/" target="_blank">Роструд</a>
						    <a rel="external" href="http://www.rosmintrud.ru/" target="_blank">Минтруд России</a>
						    <a rel="external" href="http://gossluzhba.gov.ru/" target="_blank">Портал госслужбы/a>
						    <a rel="external" href="http://онлайнинспекция.рф/" target="_blank">Онлайнинспекция.рф</a>
						    <a rel="external" href="http://www.aiss.gov.ru/" target="_blank">Соотечественники</a>
						    <a rel="external" href="http://tpprf.ru/ru/" target="_blank">Торгово-промышленная палата РФ</a>
						    <a rel="external" href="http://zpp.rospotrebnadzor.ru/" target="_blank">Роспотребнадзор</a>
						    <a class="rb-link" rel="external" href="http://gsz.gov.by/" target="_blank">Государственная служба занятости Республики Беларусь</a>
					    </div>
				    </div>
				</div>
				<div class="footer-main-content">
					<div class="container">
						<div class="col-sm-3 col-md-2 col-lg-2">
							<div class="footer-logo"></div>
						</div>
						<div class="col-sm-9 col-md-10 col-lg-4 footer-mobile-block">
							<h5>Мобильное приложение</h5>
							<div class="mobile-apps">
								<a href="https://apps.apple.com/ru/app/rabota-v-rossii/id1080627340?l=en" class="icon-appstore" title="Доступно в App Store"></a>
								<a href="https://play.google.com/store/apps/details?id=ru.trudvsem" class="icon-googleplay" title="Загрузите на Google play"></a>
							</div>
							<div class="help-links">
								<a class="security-link" href="/security">Меры безопасности</a>
								<a class="feedback-link" href="/information/about/help"><i></i>Техническая поддержка</a>
								<a href="/assets/doc/politic_personal_data.pdf" target="_blank">Политика обработки персональных данных</a>
							</div>
						</div>
						<div class="col-xs-4 col-lg-2 info-links">
							<h5>Общая информация</h5>
							<ul>
								<li>
									<a href="/czn">Государственная служба занятости</a>
								</li>
								<li>
									<a href="/opendata">Открытые данные</a>
								</li>
								<li>
									<a href="/opendata/media-partners">Партнеры</a>
								</li>
								<li>
									<a href="/information/about/help">Помощь</a>
								</li>
							</ul>
						</div>
						<div class="col-xs-4 col-lg-2 info-links">
							<h5>Соискатели</h5>
							<ul>
								<li>
									<a href="/vacancy/search">Найти работу</a>
								</li>
								<li>
									<a href="/auth/candidate/cv/new">Добавить резюме</a>
								</li>
								<li>
									<a href="/employers">Крупнейшие работодатели</a>
								</li>
								<li>
									<a href="/special">Трудоустройство инвалидов</a>
								</li>
								<li>
									<a href="/facilities/candidate">Впервые на сайте</a>
								</li>
							</ul>
						</div>
						<div class="col-xs-4 col-lg-2 info-links">
							<h5>Работодатели</h5>
							<ul>
								<li>
									<a href="/cv/search">Найти резюме</a>
								</li>
								<li>
									<a href="/auth/manager/vacancy/new">Добавить вакансию</a>
								</li>
								<li>
									<a href="/facilities/manager">Впервые на сайте</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div class="footer-copyright">
					<div class="container">
						<div class="col-xs-offset-0 col-lg-offset-2 col-xs-10">
							<small>
					            <span>
					                &copy; Федеральная служба по труду и занятости —
					                <a rel="external" href="http://rostrud.ru/" target="_blank">rostrud.ru</a>
					            </span>
					            <span>
					                При копировании информации – ссылка на
					                <a rel="external" href="http://trudvsem.ru" target="_blank">trudvsem.ru</a>
					                обязательна.
					            </span>
							</small>
						</div>
					</div>
				</div>
			</footer>
		</div>
		<th:block th:utext="${@view.getMetrika('ff841f60-2b5a-11e8-a142-3da98a0a212b')}"></th:block>
		<th:block th:replace="fragments/resources :: resources"></th:block>
	</body>
</html>
