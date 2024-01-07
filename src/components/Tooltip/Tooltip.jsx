import { useEffect, useRef, memo } from "react";
import cn from "classnames";

// todo: add ext ref ?
// todo: programmatic call
// todo: html in tooltip

const TooltipPlacement = {};

export const Tooltip = memo(
    ({ className, tooltip, placement = "auto", options = {}, toggle, theme, handler, ...props }) => {
        const ref = useRef();

        useEffect(() => {
            const container = document.querySelector("body");
            container.addEventListener("mouseenter", showTooltip, true);

            function showTooltip(event) {
                window.initToolTip($(event.target));
            }

            // todo: destory???
            return () => container.removeEventListener("mouseenter", showTooltip);
        }, [options]);

        const attrs = {
            ...(toggle && { "data-tooltip-toggle": true }),
            ...(theme && { "data-tooltip-theme": theme }),
        };

        const classes = cn(className, { tooltip__handler: handler });

        return (
            <span
                ref={ref}
                className={classes}
                data-tooltip={tooltip}
                data-placement={placement}
                {...props}
                {...attrs}
            />
        );
    }
);
