function _typeof(t){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}!function(t,e){"object"===("undefined"==typeof exports?"undefined":_typeof(exports))&&"undefined"!=typeof module?module.exports=e(require("./jquery.js")):"function"==typeof define&&define.amd?define(["jquery"],e):(t=t||self).Util=e(t.jQuery)}(this,function(r){"use strict";r=r&&r.hasOwnProperty("default")?r.default:r;var e="transitionend";function t(t){var e=this,n=!1;return r(this).one(u.TRANSITION_END,function(){n=!0}),setTimeout(function(){n||u.triggerTransitionEnd(e)},t),this}var u={TRANSITION_END:"bsTransitionEnd",getUID:function(t){for(;t+=~~(1e6*Math.random()),document.getElementById(t););return t},getSelectorFromElement:function(t){var e=t.getAttribute("data-target");e&&"#"!==e||(e=(t=t.getAttribute("href"))&&"#"!==t?t.trim():"");try{return document.querySelector(e)?e:null}catch(t){return null}},getTransitionDurationFromElement:function(t){var e,n,o;return t&&(e=r(t).css("transition-duration"),t=r(t).css("transition-delay"),n=parseFloat(e),o=parseFloat(t),n||o)?(e=e.split(",")[0],t=t.split(",")[0],1e3*(parseFloat(e)+parseFloat(t))):0},reflow:function(t){return t.offsetHeight},triggerTransitionEnd:function(t){r(t).trigger(e)},supportsTransitionEnd:function(){return Boolean(e)},isElement:function(t){return(t[0]||t).nodeType},typeCheckConfig:function(t,e,n){for(var o in n)if(Object.prototype.hasOwnProperty.call(n,o)){var r=n[o],i=e[o],i=i&&u.isElement(i)?"element":{}.toString.call(i).match(/\s([a-z]+)/i)[1].toLowerCase();if(!new RegExp(r).test(i))throw new Error(t.toUpperCase()+': Option "'+o+'" provided type "'+i+'" but expected type "'+r+'".')}},findShadowRoot:function(t){var e;return document.documentElement.attachShadow?"function"==typeof t.getRootNode?(e=t.getRootNode())instanceof ShadowRoot?e:null:t instanceof ShadowRoot?t:t.parentNode?u.findShadowRoot(t.parentNode):null:null}};return r.fn.emulateTransitionEnd=t,r.event.special[u.TRANSITION_END]={bindType:e,delegateType:e,handle:function(t){if(r(t.target).is(this))return t.handleObj.handler.apply(this,arguments)}},u});