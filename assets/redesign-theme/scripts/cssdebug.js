function importDebugStyles(){window.location.host.indexOf("pbs.bftcom.com")>-1&&($('<style id="cssdebug" />').appendTo("head").load("/assets/redesign-theme/uikit/cssdebug.css"),window.localStorage.getItem("cssdebug")?$("html").attr("data-debug","active"):$("html").attr("data-debug",""))}function activeDebugStyles(){var e="cssdebug";!(arguments.length>0&&void 0!==arguments[0])||arguments[0]?(window.localStorage.setItem(e,"active"),importDebugStyles()):(window.localStorage.removeItem(e),$("style#cssdebug").remove())}$((function(){importDebugStyles()}));