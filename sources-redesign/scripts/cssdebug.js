/**
 * Подключение стилей для маркировки ошибок разметки
 */
 function importDebugStyles() {
	const isDev = window.location.host.indexOf('pbs.bftcom.com') > -1;
	if(isDev) {
		$('<style id="cssdebug" />').appendTo('head').load('/assets/redesign-theme/uikit/cssdebug.css');
		let isDebugAuth = window.localStorage.getItem('cssdebug');
		if(isDebugAuth) {
			$('html').attr('data-debug', 'active');
		} else {
			$('html').attr('data-debug', '');
		}
	}
}

/**
 * Включение активного режима поиска ошибок разметки
 */
function activeDebugStyles(active = true) {
	const key = 'cssdebug';
	if(active) {
		window.localStorage.setItem(key, 'active');
		importDebugStyles();
	} else {
		window.localStorage.removeItem(key);
		$('style#cssdebug').remove();
	}
}

$(function() { importDebugStyles() })
