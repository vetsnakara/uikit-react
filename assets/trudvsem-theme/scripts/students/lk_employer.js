!function(){var r="заключен",o=["Проведение практики","Проведение стажировки"],l="";new bft_JoinSource({sources:["_employer_source"],initHandler:function(t){var n=t._employer_source,t=JSON.parse(currentUser.externalData||"{}"),e={};_.has(t,"inn")&&!_.isNull(t.inn)&&(e.inn=[t.inn]),_.has(t,"kpp")&&!_.isNull(t.kpp)&&(e.kpp=[t.kpp]),_.has(t,"ogrn")&&!_.isNull(t.ogrn)&&(e.ogrn=[t.ogrn]);t=(t=n.url)+(-1<t.indexOf("?")?"&":"?")+"filter="+encodeURIComponent(JSON.stringify(e));return $.get(t).done(function(t){var e,a,t=JSON.parse(t.data);t&&t.length&&t[0]&&userDataQuery({key:"employer:catalog:id",data:t[0][0]}),l=t[0][0],e={id_employer:[i()]},a={id_employer:[i()],type_of_contract:o},getCatalogData("PARTNERSHIP",e).done(function(t){t=t.result.data.length||0;$("[data-content=partners] .amount__value").text(t),$("[data-content=partners] .amount__label").text(pluralize(t,["партнер","партнера","партнеров"]))}),getCatalogData("INTERNSHIP_REQUEST",{id_institution:["EXISTS"],publication_status:[!0]}).done(function(t){t=t.result.data.length||0;$("[data-content=requests] .amount__value").text(t),$("[data-content=requests] .amount__label").html(pluralize(t,["запрос","запроса","запросов"])+"<br /> от учебных заведений")}),getCatalogData("CONTRACT",a).done(function(t){var e=[0,0,0,0],n=(t.result.data.forEach(function(t){String(t[10]).toLocaleLowerCase()===o[0].toLocaleLowerCase()?e[0]++:e[2]++,_.isArray(t[12])&&String(t[12][15]).toLowerCase()===r&&e[1]++}),_.max(e));e.forEach(function(t,e){var a=n?Math.round(t/n*100):0;$("div[ref=contract_type] .graph__value-"+(e+1)).css("height",a+"%"),$("div[ref=contract_type]  .graph__number-"+(e+1)).text(t)})}),new bft_FilterEmulator({code:"_employer_proxy",data:{columns:n.columns,data:t,actual_date:n.actual_date,filters_values:n.filters_values,filters_settings:n.filters_settings,filters_titles:n.filters_titles,url:n.url,error:!1}})})},handler:null});var i=function(){return l}}();