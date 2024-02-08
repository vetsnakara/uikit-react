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

        <link th:href="${@ResourceProcessor.wrap('/assets/default-theme/palette/palette.css')}" rel="stylesheet">
        <link th:href="${@ResourceProcessor.wrap('/assets/default-theme/palette/pp-editor.css')}" rel="stylesheet">
		<link th:href="${@ResourceProcessor.wrap('/assets/default-theme/css/infoblocks.css')}" rel="stylesheet">
		<link th:href="${@ResourceProcessor.wrap('/assets/main-theme/css/infoblocks.css')}" rel="stylesheet">

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
	<body data-th-with="cwb=${@view.getCookie('lowVisBody')}" data-th-classappend="${null!=cwb?(' '+T(java.net.URLDecoder).decode(cwb.value)):''}">
		<div class="wrapper">
			<!--Контент -->
			<main class="main">
				<div th:replace="fragments/iblocks :: list(*{iblocks})"></div>
			</main>
		</div>
		<th:block th:utext="${@view.getMetrika('ff841f60-2b5a-11e8-a142-3da98a0a212b')}"></th:block>
		<script>try{$(function(){setInterval(function(){parent.postMessage($(document).height(),'*');},500);});}catch(e){}</script>
		<th:block th:replace="fragments/resources :: resources"></th:block>
	</body>
</html>
