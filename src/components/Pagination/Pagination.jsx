import cn from "classnames";
import { memo } from "react";

import { pagination } from "./utils";

const PrevButton = ({ page, pages }) => {
    const isCurrentFirst = page === _.first(pages);
    const classNames = cn("pagination__item", "pagination__item_previous", {
        pagination__item_disabled: isCurrentFirst,
    });
    return <button type="button" className={classNames} data-page={page - 1}></button>;
};

const NextButton = ({ page, pages }) => {
    const isCurrentLast = page === _.last(pages);
    const classNames = cn("pagination__item", "pagination__item_next", {
        pagination__item_disabled: isCurrentLast,
    });
    return <button type="button" className={classNames} data-page={page + 1}></button>;
};

const Pages = ({ page, pages }) =>
    pages.map((currPage, index) => {
        const classNames = cn("pagination__item ", { pagination__item_active: currPage === page });

        return currPage === "…" ? (
            <span key={index} className="pagination__kebab">
                …
            </span>
        ) : (
            <button key={index} data-page={currPage} type="button" className={classNames}>
                {currPage}
            </button>
        );
    });

export const Pagination = memo(
    ({
        page,
        pageSize,
        total,
        delta,
        arrows = true,
        // prevButtonText = "Назад",
        // nextButtonText = "Вперёд",
        onPageChange,
        className,
    }) => {
        const pages = pagination(page, Math.ceil(total / pageSize), delta);

        if (!total || pages.length === 1) return null;

        const handleClick = (event) => {
            event.preventDefault();
            event.stopPropagation();

            const { target } = event;

            const { page: selectedPage } = target.dataset;
            if (!selectedPage) return;

            onPageChange(Number(selectedPage));
        };

        const classes = cn("pagination", className);

        return (
            <div className={classes} onClick={handleClick}>
                {arrows && <PrevButton page={page} pages={pages} />}
                <Pages page={page} pages={pages} />
                {arrows && <NextButton page={page} pages={pages} />}
            </div>
        );
    }
);
