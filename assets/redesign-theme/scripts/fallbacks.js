function _typeof(e){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},_typeof(e)}!function(e,t){"function"==typeof define&&define.amd?define([],(function(){return e.svg4everybody=t()})):"object"==("undefined"==typeof module?"undefined":_typeof(module))&&module.exports?module.exports=t():e.svg4everybody=t()}(this,(function(){function e(e,t,n){if(n){var o=document.createDocumentFragment(),i=!t.hasAttribute("viewBox")&&n.getAttribute("viewBox");i&&t.setAttribute("viewBox",i);for(var r=n.cloneNode(!0);r.childNodes.length;)o.appendChild(r.firstChild);e.appendChild(o)}}function t(t){t.onreadystatechange=function(){if(4===t.readyState){var n=t._cachedDocument;n||((n=t._cachedDocument=document.implementation.createHTMLDocument("")).body.innerHTML=t.responseText,t._cachedTarget={}),t._embeds.splice(0).map((function(o){var i=t._cachedTarget[o.id];i||(i=t._cachedTarget[o.id]=n.getElementById(o.id)),e(o.parent,o.svg,i)}))}},t.onreadystatechange()}function n(e){for(var t=e;"svg"!==t.nodeName.toLowerCase()&&(t=t.parentNode););return t}return function(o){var i,r=Object(o),a=window.top!==window.self;i="polyfill"in r?r.polyfill:/\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/.test(navigator.userAgent)||(navigator.userAgent.match(/\bEdge\/12\.(\d+)\b/)||[])[1]<10547||(navigator.userAgent.match(/\bAppleWebKit\/(\d+)\b/)||[])[1]<537||/\bEdge\/.(\d+)\b/.test(navigator.userAgent)&&a;var d={},u=window.requestAnimationFrame||setTimeout,f=document.getElementsByTagName("use"),c=0;i&&function o(){for(var a=0;a<f.length;){var s=f[a],l=s.parentNode,m=n(l),g=s.getAttribute("xlink:href")||s.getAttribute("href");if(!g&&r.attributeName&&(g=s.getAttribute(r.attributeName)),m&&g){if(i)if(!r.validate||r.validate(g,m,s)){l.removeChild(s);var p=g.split("#"),b=p.shift(),y=p.join("#");if(b.length){var v=d[b];v||((v=d[b]=new XMLHttpRequest).open("GET",b),v.send(),v._embeds=[]),v._embeds.push({parent:l,svg:m,id:y}),t(v)}else e(l,m,document.getElementById(y))}else++a,++c}else++a}(!f.length||f.length-c>0)&&u(o,67)}()}})),svg4everybody({nosvg:!0});