$(document).ready(function () {
    $("[data-target=hide-show]").on("click", function () {
        const input = $(this).siblings(".input__control");

        $(this).toggleClass("input__eye_off");
        if (input.attr("type") == "password") {
            input.attr("type", "text");
        } else {
            input.attr("type", "password");
        }
    });
    var isFirefox = /firefox/i.test(navigator.userAgent);
    document.addEventListener(
        isFirefox ? "DOMMouseScroll" : "mousewheel",
        function (event) {
            var nodeName = event.target.nodeName.toLowerCase();
            if (nodeName === "input" && $(event.target).attr("type").toLowerCase() === "number") {
                event.preventDefault();
            }
        },
        { passive: false }
    );
});
