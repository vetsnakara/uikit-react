function getCatalogData(t,e){var a="//test-portal.trudvsem.ru/information/catalogprovider/api/1.2/catalog/data/"+t+"?"+(e?"filter="+encodeURIComponent(JSON.stringify(e))+"&":"")+"unique_request_identifier="+_.uniqueId("mainpage_stat_")+"&version=1.2";if(!t)return!1;var n={url:a,dataType:"json",contentType:"application/json",method:"GET"};return $.ajax(n)}function getCatalogItem(t,e){var a={url:"//test-portal.trudvsem.ru/information/catalogprovider/api/1.2/catalog/dataItem/"+t+"/"+e+"?unique_request_identifier="+_.uniqueId("STUDENTS_"),dataType:"json",contentType:"application/json",method:"GET"};return $.ajax(a).then((function(t){var e=t.result;if("SUCCESS"!==e.code)throw new Error(e.comment);return e.data}))}function setFields(t,e,a){var n=a,o=t+"/data/save-fields?"+(e=(e=_.map(e,(function(t,e){return e+"="+encodeURIComponent(t)}))).join("&"));return $.ajax({url:o,headers:{"Content-Type":"application/json"},data:JSON.stringify(n),method:"POST"})}function getEmployerByCodeForSelect(t){return getCatalogData("EMPLOYER",{id:t}).done((function(e){var a=e.result.data;if(a&&a.length){var n=$("option[value='"+t+"']");n.text().trim()===t&&n.text(a[0][1]);var o=n.closest("select");o.data("select2")&&o.select2("destroy"),o.select2()}})),t}function getInstitutionByCodeForSelect(t){return getCatalogData("INSTITUTION",{id:t}).done((function(e){var a=e.result.data;if(a&&a.length){var n=$("option[value='"+t+"']");n.text().trim()===t&&n.text(a[0][2]);var o=n.closest("select");o.data("select2")&&o.select2("destroy"),o.select2()}})),t}function closureGetActivityAreaNameByCode(){var t={};return getCatalogData("ACTIVITY_AREA").done((function(e){var a=e.result.data;if(a&&a.length)for(var n=0;n<a.length;n++){var o=a[n][0],r=a[n][4];t[o]=r}})),function(e){if(t[e])return t[e]}}var getActivityAreaNameByCode=closureGetActivityAreaNameByCode();function getPracticeStatusByBoolean(t){return t&&"true"==t.toString()?"Пройдена":"Не пройдена"}function getEmploymentStatusByBoolean(t){return t&&"true"==t.toString()?"Трудоустроен":"Не трудоустроен"}function removeStudentFromCatalog(t){var e={url:"//test-portal.trudvsem.ru/information/catalogprovider/api/1.2/catalog/delete?code=STUDENT&id="+t+"&unique_request_identifier="+_.uniqueId("STUDENT_")+"&version=1.2",dataType:"json",contentType:"application/json",method:"DELETE"};$.ajax(e).done((function(){document.location.reload(!0)}))}function getActivityAreaByCodeForSelect(t){var e={code:t};return t.indexOf("-")>-1&&(e={id:t}),getCatalogData("ACTIVITY_AREA",e).done((function(e){var a=e.result.data;if(a&&a.length){var n=$("option[value='"+t+"']");n.text().trim()===t&&n.text(a[0][4]);var o=n.closest("select");o.data("select2")&&o.select2("destroy"),o.select2()}})),t}function getProfessionByCodeForSelect(t){var e={code:t};return t.indexOf("-")>-1&&(e={id:t}),getCatalogData("DEMANDED_PROFESSIONS",e).done((function(e){var a=e.result.data;if(a&&a.length){var n=$("option[value='"+t+"']");n.text().trim()===t&&n.text(a[0][3]);var o=n.closest("select");o.data("select2")&&o.select2("destroy"),o.select2()}})),t}function countPartnership(t){getCatalogData("PARTNERSHIP",{id:t}).done((function(t){console.log(t)}))}function getDocData(t,e){return $.ajax({url:"/api/archive/documentFull?extId="+t+"&systemCode=intern&typeCode=studDoc",type:"GET"})}function getFileEnum(t){return $.get("/api/archive/documentFull?extId="+t+"&systemCode=intern&typeCode=studDoc")}function sendNotification(t,e){var a=[t,e.id_cooperation,e.date,e.reading_marker,e.text,e.id_student,e.id_institution,e.id_employer],n={url:"//test-portal.trudvsem.ru/information/catalogprovider/api/1.2/catalog/create?code=NOTIFICATIONS&data="+encodeURIComponent(JSON.stringify(a))+"&unique_request_identifier="+_.uniqueId("PC_"),dataType:"json",contentType:"application/json",method:"POST"};return $.ajax(n)}