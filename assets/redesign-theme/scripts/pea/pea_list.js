function _typeof(t){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},_typeof(t)}!function(t){var e={};function n(i){if(e[i])return e[i].exports;var a=e[i]={i:i,l:!1,exports:{}};return t[i].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==_typeof(t)&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)n.d(i,a,function(e){return t[e]}.bind(null,a));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/assets/main-theme/js/",n(n.s=0)}([function(t,e,n){t.exports=n(1)},function(t,e){function n(t,e){var n;if("undefined"==typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(n=function(t,e){if(t){if("string"==typeof t)return i(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?i(t,e):void 0}}(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var a=0,r=function(){};return{s:r,n:function(){return a>=t.length?{done:!0}:{done:!1,value:t[a++]}},e:function(t){throw t},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,s=!0,l=!1;return{s:function(){n=t[Symbol.iterator]()},n:function(){var t=n.next();return s=t.done,t},e:function(t){l=!0,o=t},f:function(){try{s||null==n.return||n.return()}finally{if(l)throw o}}}}function i(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,i=new Array(e);n<e;n++)i[n]=t[n];return i}function a(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}var r=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.id=e.id||(1e8*Math.random()).toString(32).replace(".","-")+"-"+(1e8*Math.random()).toString(32).replace(".","-"),this.structure=e.structure||{},this.virtualSource=e.virtualSource||"",this.element=document.getElementById("_"+this.id),null===this.element)throw new Error("Не смог найти элемен для отрисовки. Элемент с id - "+this.id+" не существует");this.rowTemplate=document.getElementById("pealist_row_"+this.id).cloneNode(!0),this.rowTemplate.removeAttribute("id"),this.modalNode=document.getElementById("pealist_modal_"+this.id),this.paginationNode=document.getElementById("pealist_pagination_"+this.id),this.paginationNumberTemplate=document.getElementById("pealist_number_"+this.id).cloneNode(!0),this.paginationNumberTemplate.removeAttribute("id"),this.paginationPrevTemplate=this.paginationNode.querySelector(".pagination__item_previous").cloneNode(!0),this.paginationNextTemplate=this.paginationNode.querySelector(".pagination__item_next").cloneNode(!0),this.headerNodes=this.element.querySelectorAll("thead th"),this.initialized=!1,this.errorCounter=0,this.maxErrors=10,this.rowsOnPage=20,this.sortedCode=null,this.sortedDirection=1,this.sortedClass="table__sorting_up",this.currentPage=0,this.accreditationIndexes={date:null,otziv:null,prodl:null,ostanov:null},this.accreditationDateColumnIndex=null,this.accreditationDateColumnCode="date",this.revocationDateColumnIndex=null,this.revocationDateColumnCode="otziv",this.initialization=this.initialization.bind(this),this.virtualSourceCallback=this.virtualSourceCallback.bind(this),this.renderDetails=this.renderDetails.bind(this),this.sortHandler=this.sortHandler.bind(this),this.paginationHandler=this.paginationHandler.bind(this),this.initialization()}var e,i;return e=t,(i=[{key:"initialization",value:function(){if(clearInterval(this.timer),"function"!=typeof window[this.virtualSource]){if(this.errorCounter>this.maxErrors)throw new Error("Не могу получить ссылку на источник данных. Функции "+this.virtualSource+" не существует");return this.errorCounter++,void(this.timer=setInterval(this.initialization,100))}window[this.virtualSource](null,this.virtualSourceCallback)}},{key:"virtualSourceCallback",value:function(t){var e=this;this.data={columns:JSON.parse(JSON.stringify(t.columns)),data:t.data.filter((function(t){return null!==t}))},this.currentPage=0,this._filtersValues=t.filters_values;var n=function(t){e.accreditationIndexes[t]=e.data.columns.findIndex((function(e){return t===e.code}),e)};for(var i in this.accreditationIndexes)n(i);!0!==this.initialized&&(this._getData=t.url,this.setHandlers(),this.data.data=this.sortData(this.data.data,"reestr",this.data.columns,1),this.initialized=!0),this.render()}},{key:"render",value:function(){var t=this,e=this.structure.filter((function(t){return t.visible})),n=this.element.querySelector('[data-content="container"]'),i=this.data.data.length>this.rowsOnPage?this.currentPage*this.rowsOnPage:0,a=this.data.data.length>this.rowsOnPage?(this.currentPage+1)*this.rowsOnPage:this.data.data.length;n.innerHTML="";for(var r=function(i){if(i>=t.data.data.length)return"break";var a=t.data.data[i],r=t.rowTemplate.cloneNode(!0),o=t.isAccredited(a),s=r.querySelector('[data-content="vacancies"]'),l=["/vacancy/search?_page=0"],d=t.data.columns.findIndex((function(t){return"inn"===t.code})),c=t.data.columns.findIndex((function(t){return"regnum"===t.code}));r.setAttribute("data-id",a[0]),l.push("_inn="+a[d]),l.push("_ogrn="+a[c]),s.setAttribute("href",l.join("&"));var u=void 0;o||((u=document.createElement("div")).classList.add("content_important","content_small"),u.textContent="Аккредитация отозвана"),e.forEach((function(e){var n=t.data.columns.findIndex((function(t){return t.code===e.code})),i=r.querySelector('[data-content="cell-'+e.code+'"]');i&&0===i.children.length&&(i.textContent=a[n]),i&&i.children.length>0&&(i.children[0].textContent=a[n]),"reestr"===e.code&&u&&i.appendChild(u)}),t),n.appendChild(r)},o=i;o<a&&"break"!==r(o);o++);this.data.data.length<this.rowsOnPage?this.paginationNode.classList.add("hidden"):this.renderPagination()}},{key:"pagination",value:function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:2,i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:1;function a(t,e){for(var n=Array(e-t),i=0,a=t;i<n.length;)n[i++]=a++;return n}var r=[],o=[],s=["…"];if(t-n-i>2){var l=a(1,i+1),d=a(t-n,t);r=r.concat(l,s,d)}else r=a(1,t);if(e-2>t+n+i-1){var c=a(1+e-i,1+e),u=a(1+t,1+t+n);o=o.concat(u,s,c)}else o=a(1+t,1+e);return[].concat(r,t,o)}},{key:"renderPagination",value:function(){var t=Math.ceil(this.data.data.length/this.rowsOnPage),e=this.paginationNode.querySelector(".pagination"),i=this.pagination(this.currentPage+1,t),a=0===this.currentPage,r=this.currentPage===t-1;e.innerHTML="",e.appendChild(this.paginationPrevTemplate),this.paginationPrevTemplate.classList[a?"add":"remove"]("pagination__item_disabled");var o,s=n(i);try{for(s.s();!(o=s.n()).done;){var l=o.value,d=this.paginationNumberTemplate.cloneNode(!0),c=parseInt(l,10);d.textContent=l,isNaN(c)?(d.classList.remove("pagination__item"),d.classList.add("pagination__kebab")):(d.setAttribute("data-page",c),this.currentPage+1===c&&(d.classList.remove("pagination__kebab"),d.classList.add("pagination__item","pagination__item_active"))),e.appendChild(d)}}catch(t){s.e(t)}finally{s.f()}e.appendChild(this.paginationNextTemplate),this.paginationNextTemplate.classList[r?"add":"remove"]("pagination__item_disabled"),this.paginationNode.classList.remove("hidden")}},{key:"renderDetails",value:function(t){var e=this,n=t.relatedTarget.closest("tr").getAttribute("data-id"),i=this.data.data.find((function(t){return t[0]===n})),a=this.modalNode.querySelector('[data-content="accreditation"]'),r=this.isAccredited(i);r?a.setAttribute("hidden",!0):a.removeAttribute("hidden",!0),this.data.columns.forEach((function(t){var n=e.data.columns.findIndex((function(e){return e.code===t.code})),a=e.modalNode.querySelector(".infomodal_dd_"+t.code),o=i[n]||"-";if("regnum"===t.code||!1===t.visible)a.closest(".row").setAttribute("hidden",!0);else if("inn"===t.code){var s=e.modalNode.querySelector(".infomodal_dl_inn"),l=e.data.columns.findIndex((function(t){return"regnum"===t.code}));s&&(s.innerHTML="<b>ИНН / ОГРН</b>"),o="".concat(o," / ",i[l]||"-")}else"otziv"===t.code&&r?a.classList.remove("content_important"):"otziv"===t.code&&a.classList.add("content_important");a&&(a.textContent=o)}),this)}},{key:"setHandlers",value:function(){var t=this;this.headerNodes.forEach((function(e){e.addEventListener("click",t.sortHandler)})),$(document.getElementById("pealist_modal_"+this.id)).on("show.bs.modal",this.renderDetails),this.paginationNode.addEventListener("click",this.paginationHandler)}},{key:"sortHandler",value:function(t){var e=t.currentTarget.querySelector("[data-column-code"),n=e.getAttribute("data-column-code");if(n===this.sortedCode&&(e.classList.remove(this.sortedClass),this.direction=-1*this.direction,this.sortedClass=1===this.direction?"table__sorting_up":"table__sorting_down"),n!==this.sortedCode){var i=this.element.querySelector('.table__title [data-column-code="'+this.sortedCode+'"]');i&&i.classList.remove(this.sortedClass),this.sortedCode=n,this.direction=1,this.sortedClass="table__sorting_up"}e.classList.add(this.sortedClass),this.data.data=this.sortData(this.data.data,n,this.data.columns,this.direction),this.render()}},{key:"paginationHandler",value:function(t){var e=this;t.preventDefault();var n=t.target.closest(".pagination__item"),i=n.classList.contains("pagination__item_next"),a=n.classList.contains("pagination__item_previous");null===n||n.classList.contains("pagination__item_disabled")||n.classList.contains("pagination__item_active")||(a&&(this.currentPage-=1),i&&(this.currentPage+=1),i||a||(this.currentPage=parseInt(n.getAttribute("data-page")||1,10)-1),setTimeout((function(){window.scroll(0,e.element.getBoundingClientRect().top+window.scrollY-100)}),150),this.render())}},{key:"isAccredited",value:function(t){var e=t[this.accreditationIndexes.date],n=t[this.accreditationIndexes.otziv],i=this.convertDate(t[this.accreditationIndexes.prodl]),a=this.convertDate(t[this.accreditationIndexes.ostanov]);return Boolean(!a&&e&&(!n||i&&i>n))}},{key:"sortData",value:function(){var t=this,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:1,a="string",r=null===n?0:-1,o=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:[]).slice();if(null===e)return o;if(null!==n){if(-1===(r=n.findIndex((function(t){return t.code===e}))))return o;a=n[r].type.toLowerCase()}return o.sort((function(e,n){return!t.isAccredited(e)&&t.isAccredited(n)?1:t.isAccredited(e)&&!t.isAccredited(n)?-1:"number"===a?(parseFloat(e[r],10)-parseFloat(n[r],10))*i:e[r]>n[r]?1*i:-1*i}))}},{key:"convertDate",value:function(t){var e,n,i,a=t.split(".");return 3!==a.length?null:(e=a[0],n=a[1]-1,i=a[2],new Date(i,n,e))}}])&&a(e.prototype,i),t}();window.PEAList=r}]);