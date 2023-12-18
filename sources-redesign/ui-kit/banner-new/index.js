/*!
 * Анимация изображений в банере
 * */

(function ($, Util) {
    const INITIALIZE_KEY = "banner-animate-init";
    const ANIMATE_INTERVAL_KEY = "animate-interval";
    const IMAGE_HIDDEN_CLASS = "banner__image_hide";
    const Selectors = {
        bannerWrapper: ".banner-new__images",
        bannerImage: ".banner-new__image",
    };

    class Animate {
        constructor(element) {
            this.$el = $(element);
            this.currentImage = 0;
            this.imageList = [].slice.call(this.$el.get(0).querySelectorAll(Selectors.bannerImage));
            this.interval = this.$el.data(ANIMATE_INTERVAL_KEY) || 5000;

            if (this.imageList.length && this.imageList.length > 1) {
                this.imageList = this.imageList.reverse();
                this.startAnimate();
            }
        }

        startAnimate() {
            _.each(_.range(1, this.imageList.length), (item) => $(item).addClass(IMAGE_HIDDEN_CLASS));
            setInterval(() => {
                this.animateTick();
            }, this.interval);
        }

        animateTick() {
            let currentImage = this.currentImage;
            $(this.imageList[this.currentImage]).addClass(IMAGE_HIDDEN_CLASS);
            currentImage = currentImage === this.imageList.length - 1 ? 0 : currentImage + 1;
            $(this.imageList[currentImage]).removeClass(IMAGE_HIDDEN_CLASS);
            this.currentImage = currentImage;
        }
    }

    $(document).ready(() => {
        const bannerList = [].slice.call(document.querySelectorAll(Selectors.bannerWrapper));
        _.each(bannerList, (item) => {
            const $item = $(item);
            if (!$item.data(INITIALIZE_KEY)) {
                $item.data(INITIALIZE_KEY, !!new Animate(item));
            }
        });
    });
})(jQuery, Util);
