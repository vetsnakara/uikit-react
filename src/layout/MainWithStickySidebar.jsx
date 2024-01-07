import { useEffect } from "react";

export const MainWithStickySidebar = ({ children }) => {
    useEffect(() => {
        var neighbour = document.querySelector(".main__aside-neighbour");
        var wrapper = document.querySelector(".main__aside");
        var container = document.querySelector(".main__aside-container");
        var cancelClass = "main__aside_relative";
        var paddingTop = parseInt($(document.body).css("padding-top").split("px")[0] || 0, 10) + 20,
            paddingBottom = 20,
            scrollMark = null,
            Z = 0;

        function positionCheck() {
            var wrapperRect = wrapper.getBoundingClientRect();
            var neighbourRect = neighbour.getBoundingClientRect();
            var containerRect = container.getBoundingClientRect();

            // Контент выше чем сайдбар
            if (neighbourRect.bottom > wrapperRect.bottom) {
                var windowHeight = document.documentElement.clientHeight;
                var columnsHeightDiff = Math.round(containerRect.height - neighbourRect.height);

                var gottaStick = null;
                var calculatedTop = "";

                // Сайдбар выше чем viewport
                if (containerRect.height > windowHeight) {
                    // Скролл вниз
                    if (wrapperRect.top < scrollMark) {
                        // Нижняя часть контента не во viewport
                        if (wrapperRect.top + neighbourRect.height + paddingBottom <= windowHeight) {
                            gottaStick = false;
                            calculatedTop = -columnsHeightDiff;
                            Z = columnsHeightDiff;
                            // -1 - исправление дефекта с дёргающимся сайдбаром в масштабированном хроме
                        } else if (containerRect.bottom + paddingBottom - 1 <= windowHeight) {
                            gottaStick = true;
                            calculatedTop = windowHeight - containerRect.height - paddingBottom;
                            Z = paddingBottom + wrapperRect.top + containerRect.height - windowHeight;
                        } else {
                            gottaStick = false;
                            calculatedTop = -Z;
                        }

                        // Скролл наверх
                    } else {
                        // -1 - исправление дефекта с дёргающимся сайдбаром в масштабированном хроме
                        if (wrapperRect.top < paddingTop && containerRect.top >= paddingTop - 1) {
                            gottaStick = true;
                            calculatedTop = paddingTop;
                            Z = wrapperRect.top - paddingTop;
                        } else if (wrapperRect.top < paddingTop) {
                            gottaStick = false;
                            calculatedTop = -Z;
                        } else {
                            Z = 0;
                        }
                    }

                    scrollMark = wrapperRect.top;
                } else {
                    if (wrapperRect.top - paddingTop <= columnsHeightDiff) {
                        gottaStick = false;
                        calculatedTop = -columnsHeightDiff;
                    } else if (wrapperRect.top <= paddingTop) {
                        gottaStick = true;
                        calculatedTop = paddingTop;
                    }
                }

                container.classList.toggle("main__aside-container_sticky", gottaStick === true);
                container.classList.toggle("main__aside-container_stop", gottaStick === false);
                container.style.top = calculatedTop + "px";
            }
        }

        if (neighbour && wrapper && !wrapper.classList.contains(cancelClass) && container) {
            window.addEventListener("scroll", positionCheck, false);
        }

        return () => {
            /*unsub*/
        };
    }, []);

    return <>{children}</>;
};

MainWithStickySidebar.Main = ({ children }) => {
    return <div className="main__aside-neighbour">{children}</div>;
};

MainWithStickySidebar.Aside = ({ children }) => {
    return (
        <div className="main__aside">
            <div className="main__aside-container">{children}</div>
        </div>
    );
};
