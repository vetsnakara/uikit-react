var IS_FULL_WIDGET = window.location.href.indexOf('full-widget') > -1;
var IFRAME_URL = IS_FULL_WIDGET ? IFRAME_FULL_URL : IFRAME_SIMPLE_URL;

$(document).ready(function() {
	var uid = s4()+s4();
	$.fn.selectpicker.defaults = {
		noneSelectedText: "Ничего не выбрано",
		noneResultsText: "Совпадений не найдено {0}",
		countSelectedText: "Выбрано {0} из {1}",
		maxOptionsText: [
			"Достигнут предел ({n} {var} максимум)",
			"Достигнут предел в группе ({n} {var} максимум)",
			["шт.", "шт."]
		],
		doneButtonText: "Закрыть",
		selectAllText: "Выбрать все",
		deselectAllText: "Отменить все",
		iconBase: 'fa',
		tickIcon: 'fa-check',
		multipleSeparator: ", "
	};

	var tpl = "<script src=\""+LOADER_URL+"\"></script>\n" +
        "<script>\n" +
        "    try {\n" +
        "        (function () {\n" +
        "            new VacancySearchWidget({\n" +
        "                id: \"%GUID%\",\n" +
        "                params: \"%PARAMS%\",\n" +
        "                url: \"%URL%\"\n" +
        "            })\n" +
        "        })()\n" +
        "    } catch (e) {\n" +
        "        console.log(e)\n" +
        "    }\n" +
        "</script>";

	var ta = $("#get-code");

	var config = {
		fields: {},
        searchPlace: 'VACANCY_NAME'
	};

	var color = $(".colorinput");
	var fieldsParamControls = $("input[data-param=fields]");
	var selects = $(".selectpicker");

	selects.selectpicker();

	selects.on("change", function(event) {
		var el = $(event.currentTarget);
		var val = el.val();
		var field = el.data("param");

		if (field) {
			if (!_.isEmpty(val)) {
				config[field] = val;
			} else {
				config = _.omit(config, field);
			}
		}

		update(tpl, ta, uid, config)
	});

	color.colorpicker();
	color.on("changeColor", function(event) {
		var el = $(event.currentTarget);
		var param = el.data("param");
		if (param) {
			config[param] = String(event.value).slice(1);
			$(".control-panel-color-preview", el.parent()).css("background-color", event.value);
		}
		update(tpl, ta, uid, config)
	});

	$("select[data-dic]").each(function() {
		var select = $(this);
		var dic = select.data("dic");
		var value = select.data("value") || "code";
		var label = select.data("label") || "name";

		getDictionary(dic).done(function(result) {
			if (result && _.isArray(result)) {
				if (dic === "ENUM_SOURCE") {
					result = _.filter(result, function(item) {
						return ["RPORTAL", "HR_SERVICE", "FROM_ESIA"].indexOf(item[value]) === -1;
					});
				}

				result.map(function(item) {
					select.append('<option value="' + item[value] + '">' + item[label] + "</option>");
				});
				select.selectpicker("refresh");
			}
		});
	});

	fieldsParamControls.each(function() {
		var el = $(this);
		var field = el.attr("id");
		if (field) {
			config["fields"][field] = el.is(":checked");
		}
	});

	fieldsParamControls.on("change", function() {
		var el = $(this);
		var field = el.attr("id");

		if (field) {
			config["fields"][field] = el.is(":checked");
		}
		update(tpl, ta, uid, config)
	});

	$("input[data-param=colCount]").on("change", function() {
		config.colCount = $("input[data-param=colCount]:checked").attr("id");
		ta.val(setTpl(tpl, uid, buildQueryString(config)));
        update(tpl, ta, uid, config)
	});

	$("input[data-param=elCount], input[data-param=title]").on("keyup", function(event) {
		var el = $(event.currentTarget);
		var field = el.data("param");
		if (field === "elCount") {
			el.val(numberValidation(el.val()))
		} 
		var val = el.val();
		if (field) {
			if (val) {
				config[field] = val;
			} else {
				config = _.omit(config, field);
			}
		}

		update(tpl, ta, uid, config)
	});

	new ClipboardJS('#btnCopy');

	//ta.val(setTpl(tpl, uid, buildQueryString(config)));
	update(tpl, ta, uid, config);

	$(window).off('message').on('message', function (e) {
		try {
			var c = $("#frame-container");
			var nh = e.originalEvent.data;
			var ch = c.height();
			if (ch != nh) {
				c.height(nh);
			}
		} catch (e) {
		}
	});
});

function numberValidation(number) {
	var valueInt = parseInt(number)
	if (valueInt < 1) {
		return 1
	} else if (valueInt > 100) {
		return 100
	} else {
		return valueInt
	}
}

function setTpl(tpl, id, params) {
	return tpl.replace("%GUID%", id).replace("%PARAMS%", params).replace("%URL%", IFRAME_URL);
}

function s4() {
	return Math.floor((1 + Math.random()) * 0x10000)
		.toString(16)
		.substring(1);
}

function getDictionary(dict) {
	return $.ajax({
		type: "GET",
		url: DICT_URL + "?code=" + dict,
		dataType: "jsonp",
		async: false,
		crossDomain: true
	});
}

function update(tpl, ta, uid, config){
	var query = buildQueryString(config);
	ta.val(setTpl(tpl, uid, query));
	$('#frame-container').attr('src', IFRAME_URL+'?'+query);
}

function buildQueryString(config) {
	var out = [];

	if (IS_FULL_WIDGET) return "";

	_.each(config, function(val, key) {
		var item = "_"+key + "=";
		if (_.isArray(val)) {
			item += val.join(",");
		} else if (_.isObject(val)) {
			item += _.keys(
				_.pick(val, function(value, key) {
					return value;
				})
			).join(",");
		} else {
			item += String(val);
		}
		out.push(encodeURI(item));
	});
	return out.join("&");
}
