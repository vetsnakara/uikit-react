$(function () {
    const sidebarMenu = document.querySelector(".sidebar-menu");
    let switchableClass = "sidebar-menu_open";

    const classToggler = (evt) => {
        let target = evt.target;

        if (
            target.classList.contains("sidebar-menu__preview") &&
            target.parentNode.classList.contains(switchableClass)
        ) {
            sidebarMenu.classList.remove(switchableClass);
        } else {
            sidebarMenu.classList.add(switchableClass);
        }
    };

    sidebarMenu.addEventListener("click", classToggler);
});
