$(function () {
    var $tabs = $(".tabs");

    var $chooseRoleTitle = $("[data-content='choose-role']");
    var $bottomLinks = $("[data-content='bottom-links']");

    // handle click on bottom link
    $bottomLinks.on("click", "[href^='#']", function scrollToTitle(event) {
        event.preventDefault();

        var $target = $(event.target);
        var href = $target.attr("href");
        var $tabBtn = $("[href='" + href + "']", $tabs);

        $tabBtn.click();

        scrollTo($chooseRoleTitle, scrollOptions);
    });

    // options for scrollTo function
    var scrollOptions = {
        // additional offset
        delta: 10,

        // fiexed elements to calculate offset
        // from the top of the page
        fixedElements: [".gosbar", ".header", ".mega-menu"],
    };

    /**
     * Скролл к заданному элементу на странице
     */
    function scrollTo($el, options) {
        var topOffset = 0;
        var options = options || {};

        var fixedElements = options.fixedElements || [];
        var delta = options.delta || 0;

        // offset for fixed elements
        _.each(fixedElements, function (selector) {
            var $fixedEl = $(selector);

            topOffset += $fixedEl.css("position") === "fixed" ? $fixedEl.outerHeight(true) : 0;
        });

        // additional offset
        topOffset += delta;

        var top = $el.offset().top;

        $("html, body").animate({
            scrollTop: top - topOffset,
        });
    }
});
