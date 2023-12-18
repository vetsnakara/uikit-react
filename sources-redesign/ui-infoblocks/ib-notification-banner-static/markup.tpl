<!-- в redesign-index предполагается выводить под mega-menu, в остальных под header-->
<!-- info-banner as modal-->
<div class="ib-notification-banner-modal">
    <div class="ib-notification-banner-modal__area">
        <div class="ib-notification-banner-modal__wrap">
            <div class="ib-notification-banner-modal__content">
                <!-- контент для слайдера прокидывающийся из админки-->
                <div class="row">
                    <div class="col-auto">
                        <img src="/information/resources/upload/banner/banner-img.svg" alt="" class="image d-none d-md-block">
                    </div>
                    <div class="col">
                        <h3 class="content__section-title content__section-title_small">
                          Создайте цифровой профиль
                        </h3>
                        <p class="content__paragraph">
                            Описание фунциив две три строки Описание фунции в две три строки Описание фунции в две три строки Описание фунции в две три строки
                        </p>
                        <button class="button mt-2" type="button">Начать</button>
                    </div>
                </div>
                <!-- конец области контента из админки -->
            </div>
            <div class="ib-notification-banner-modal__controls"><!-- если один баннер и нет карусели можно вообще из дома выкинуть этот блок-->
                <button class="button-close button_icon ib-notification-banner-modal__close" type="button" aria-label="Закрыть">
                    <svg class="icon button__icon">
                        <use href="/assets/redesign-theme/uikit/icon/icons.svg#close"></use>
                    </svg>
                </button>
                <div class="ib-notification-banner-modal__nav-container">
                    <button type="button" class="ib-notification-banner-modal__control ib-notification-banner-modal__control_prev"></button><!-- мб вдруг нужно будет, для дизейбла класс  ib-notification-banner-modal__control_disabled-->
                    <button type="button" class="ib-notification-banner-modal__control ib-notification-banner-modal__control_next"></button>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- info-banner as static-->
<div class="ib-notification-banner-static">
    <div class="ib-notification-banner-static__wrap">
        <div class="ib-notification-banner-static__content">
            <!-- контент для слайдера прокидывающийся из админки-->
            <div class="row row_middle">
                <div class="col-12 col-md-auto mb-1 mb-md-0">
                    <h3 class="content__section-title content__section-title_small">Создайте цифровой профиль</h3>
                </div>
                <div class="col-12 col-md-auto">
                    <button class="button button_secondary ib-notification-banner-static__button" type="button">Начать</button>
                </div>
            </div>
            <!-- конец области контента из админки -->
        </div>
        <div class="ib-notification-banner-static__controls">
            <button class="button-close button_icon ib-notification-banner-static__close" type="button" aria-label="Закрыть">
                <svg class="icon button__icon">
                    <use href="/assets/redesign-theme/uikit/icon/icons.svg#close"></use>
                </svg>
            </button>
            <div class="ib-notification-banner-static__nav-container">
                <button type="button" class="ib-notification-banner-static__control ib-notification-banner-modal__control_prev"></button>
                <button type="button" class="ib-notification-banner-static__control ib-notification-banner-modal__control_next"></button>
            </div>
        </div>
    </div>
</div>