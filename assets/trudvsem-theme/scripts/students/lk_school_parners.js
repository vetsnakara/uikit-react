$(function(){var e=$("#create_contract"),t="",r={},o={contract_id:createUUID1(),cooperation_id:createUUID1(),contract_number:"",id_institution:"",id_employer:"",id_student:"",contract_url:"",type_of_contract:"",seats_number:null,start_date:"",end_date:"",interaction_region:"",interaction_city:"",prof_activity_code:"",code:"",task:"",students:[]};new bft_JoinSource({sources:["_partners_source"],initHandler:function(e){e=e._partners_source.url.split("/getData/");t=e[0]},handler:null}),e.off("show.bs.modal").on("show.bs.modal",function(e){var n=$(e.relatedTarget),a=$(this),i=$("input[name=contract_file]",a);i.off("change").on("change",function(){i.closest("label").find(".upload__file").text(i.get(0).files[0].name)}),$(".professions__subtitle",a).text(decodeURIComponent(n.data("employername"))),$("button[rel=submit]",a).off("click").on("click",function(){var e,t;o.id_employer=n.data("employer"),o.id_institution=n.data("institution"),o.id_student=$("select[name=candidade]",a).val()||"",o.contract_number=$("input[name=number]",a).val(),o.type_of_contract=$("select[name=interaction]",a).val(),o.start_date=$("input[name=start_date]",a).val()||"",o.end_date=$("input[name=end_date]",a).val()||"",o.interaction_region=$("select[name=region]",a).val()||"",o.interaction_city=$("select[name=city]",a).val()||"",o.prof_activity_code=$("select[name=profession-area]",a).val()||"",o.code=$("select[name=profession]",a).val()||"",_.isArray(o.id_student)&&o.id_student.length&&(o.students=_.range(1,o.id_student.length).map(function(e){return o.id_student[e].split(",")[1]}),o.id_student=o.id_student[0].split(",")[0]),moment(o.start_date,"DMY").isValid()&&(o.start_date=moment(o.start_date,"DMY").valueOf()),moment(o.end_date,"DMY").isValid()&&(o.end_date=moment(o.end_date,"DMY").valueOf()),o.required_student_signature=!(0<o.students.length)&&$("input[name=required_student_signature]",a).is(":checked")||!1,e=i.get(0).files,(t=new FormData).append("docDate",moment().format("YYYY-MM-DDT00:00:00")),t.append("docNumber",createUUID1()),t.append("docTypeCode","studDoc"),t.append("extId",createUUID1()),t.append("file",e[0]),t.append("name","Договор №"+o.contract_number),t.append("nomenclature","string"),t.append("srcSystem","intern"),$.ajax({url:"/api/archive/store",data:t,contentType:!1,processData:!1,type:"POST"}).done(function(e){var t;o.contract_url=e.extId,$.when((t=[(e=o).cooperation_id,e.type_of_contract,"",e.contract_id,e.id_student,e.id_institution,e.id_employer,"",e.start_date,e.end_date,e.task,"",null,"","","Новый","",Date.now(),"","","","","","",e.interaction_region,e.interaction_city,e.prof_activity_code,e.code,e.required_student_signature,null,e.students,"","",!1],e="//test-portal.trudvsem.ru/information/catalogprovider/api/1.2/catalog/store?code=COOPERATION&id="+e.cooperation_id+"&unique_request_identifier="+_.uniqueId("COOPERATION_CATALOG_")+"&data="+encodeURIComponent(JSON.stringify(t))+"&version=1.2",$.ajax({url:e,dataType:"json",contentType:"application/json",method:"POST"})),(e=[(t=o).contract_id,o.contract_number,null,o.id_institution,o.id_employer,o.id_student,o.contract_url,!1,!1,!1,o.type_of_contract,"",o.cooperation_id,null,o.seats_number],t="//test-portal.trudvsem.ru/information/catalogprovider/api/1.2/catalog/store?code=CONTRACT&id="+o.contract_id+"&unique_request_identifier="+_.uniqueId("COOPERATION_CATALOG_")+"&data="+encodeURIComponent(JSON.stringify(e))+"&version=1.2",$.ajax({url:t,dataType:"json",contentType:"application/json",method:"POST"}))).then(function(e,t){var n,a,e={user:currentUserFull.id,student:o.id_student,employer:o.id_employer,institution:o.id_institution,cooperation:e[0].result.data};return console.log(e),e=[(n=e).student,n.employer,n.institution].filter(function(e){return e&&e!==n.user}),a={id_cooperation:n.cooperation,date:Date.now(),reading_marker:!1,text:"",id_student:n.student,id_institution:n.institution,id_employer:n.employer},e=e.map(function(e){return sendNotification(e,a)}),$.when.apply($,e)}).then(function(){a.modal("hide")}).catch(function(e){console.err(e)}),console.log(o)})}),$("select[name=interaction]",a).select2({allowClear:!0,minimumResultsForSearch:-1,placeholder:"Выберите вид взаимодействия"}),$.ajax({url:t+"/api/1.2/catalog/data/STUDENT?filter="+encodeURIComponent(JSON.stringify({id_institution:[currentUserFull.id]}))+"&unique_request_identifier="+_.uniqueId("query_"),type:"GET",dataType:"json"}).done(function(e){var n=$("select[name=candidade]",a);n.select2({allowClear:!0,placeholder:"Выберите кандидата",data:e.result.data.map(function(e){return{id:[e[0],e[1]],text:e[1]}})}),n.on("change",function(){var e=$("input[name=required_student_signature]",a),t=n.val();_.isArray(t)&&1<t.length?(e.removeAttr("checked"),e.attr("disabled","disabled")):e.removeAttr("disabled")})}),$.ajax({url:"https://test-integration.trudvsem.ru/api/dictionary/get?code=DICT_REGION",type:"GET",dataType:"jsonp"}).done(function(e){$("select[name=region]",a).select2({allowClear:!0,placeholder:"Выберите регион",data:e.map(function(e){return{id:String(e.name),text:String(e.name)}})})}),$("select[name=profession-area]").select2({cache:!0,placeholder:"Выберите...",allowClear:!0,ajax:{dataType:"json",url:t+"/api/1.2/catalog/data/ACTIVITY_AREA",data:function(e){var t={unique_request_identifier:_.uniqueId("query_")};return e.term&&e.term.length&&(t.filter=JSON.stringify({name:[String(e.term).toLocaleLowerCase()]})),t},processResults:function(e){return{results:e.result.data.map(function(e){return{cid:e[1],id:e[0],text:e[4]}})}}}}).off("select2:select").on("select2:select",function(e){r=e.params.data,$("select[name=profession]").val(null).trigger("change")}),$("select[name=profession]").select2({cache:!0,placeholder:"Выберите...",allowClear:!0,ajax:{dataType:"json",url:t+"/api/1.2/catalog/data/DEMANDED_PROFESSIONS",data:function(e){var t={profActivityCode:[r.cid]};return e.term&&e.term.length&&(t.name=[String(e.term).toLocaleLowerCase()]),{unique_request_identifier:_.uniqueId("query_"),filter:JSON.stringify(t)}},processResults:function(e){return{results:e.result.data.map(function(e){return{cid:e[1],id:e[0],text:e[3]}})}}}})});function n(e){var t=$(this),n=$(e.relatedTarget);t.find("[data-content=partnership-partner]").text(n.data("partnership-partner")),t.find("[data-action=contract-delete]").on("click",function(){var e;e="//test-portal.trudvsem.ru/information/catalogprovider/api/1.2/catalog/delete?code=PARTNERSHIP&id="+(e=n.data("partnership-id"))+"&unique_request_identifier="+_.uniqueId("PARTNERSHIP_")+"&version=1.2",$.ajax({url:e,dataType:"json",contentType:"application/json",method:"DELETE"}).done(function(){document.location.reload(!0)})})}$("body").off("show.bs.modal","#delete-modal",n).on("show.bs.modal","#delete-modal",n)});