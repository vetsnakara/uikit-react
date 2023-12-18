$(document).on("change", ".upload__control", function (event) {
    var files = this.files;
    var _this = $(this).closest(".upload");    
    if (typeof files == 'undefined') return;
    _this.attr("data-change", files.length ? "true" : "false");
    _this.attr("data-name", files.length ? "Изменить" : "Выбрать");
    _this.find(".upload__file").empty();
    for (var i = 0; i < files.length; i++) {
        _this.find(".upload__file").append("<div class=\"upload__file-item\">" +  files[i].name +  "</div>")
    }
});

$(document).on("click", ".upload__delete", function (event) {
    event.preventDefault();
    var _this = $(this).closest(".upload");
    _this.attr("data-change", "false");
    _this.attr("data-name", "Выбрать");
    _this.find(".upload__control").val("");
    _this.find(".upload__file").empty();
});