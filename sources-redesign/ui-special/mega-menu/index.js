/**
 * Реализация логики мега-меню
 */
$(function () {
    const ClassNames = {
        megaMenu: "mega-menu",
        opened: "mega-menu_opened",
        toggler: "mega-menu__toggle",
        close: "mega-menu__close",
        content: "mega-menu__content",
        mobileButton: "burger",
        mobileButtonOpened: "burger_active",
        menuWrapper: "mega-menu__wrapper",
    };
    const Selectors = {
        megaMenu: `.${ClassNames.megaMenu}`,
        toggler: `.${ClassNames.toggler}`,
        close: `.${ClassNames.close}`,
        content: `.${ClassNames.content}`,
        mobileButton: `.${ClassNames.mobileButton}`,
        menuWrapper: `.${ClassNames.menuWrapper}`,
    };

    const wrapper = $(Selectors.megaMenu);
    const toggler = $(`${Selectors.toggler}, ${Selectors.close}, ${Selectors.mobileButton}`);
    const mobileButton = $(Selectors.mobileButton);

    toggler.on("click", function (e) {
        e.stopPropagation();
        wrapper.toggleClass(ClassNames.opened);
    });

    $("body").on("click", function (event) {
        if (($(event.target).closest(Selectors.content).length === 0)
          && ($(event.target).closest(Selectors.menuWrapper).length === 0)
          && (wrapper.hasClass(ClassNames.opened))) {
            wrapper.toggleClass(ClassNames.opened);
            mobileButton.toggleClass(ClassNames.mobileButtonOpened);
        }
    });
});
