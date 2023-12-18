// 1) реализовать логику очистки поля поиска по нажатию на кнопку "крестик" и появления этой кнопки
//    в зависимости от полноты поля (нативная логика поля "search" только с кастомной кнопкой);
$(function() {

    $('[data-name="search-button"]').on( "click", function() {
        $('[data-name="search-content"]').toggleClass("search-content_open");
    });
});
