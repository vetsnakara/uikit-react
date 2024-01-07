import cn from "classnames";

import cls from "./styles.module.css";

// export type FlexJustify = 'start' | 'center' | 'end' | 'between';
// export type FlexAlign = 'start' | 'center' | 'end';
// export type FlexDirection = 'row' | 'column';
// export type FlexGap = '4' | '8' | '16' | '32';

const justifyClasses = {
    start: cls.justifyStart,
    center: cls.justifyCenter,
    end: cls.justifyEnd,
    between: cls.justifyBetween,
};

const alignClasses = {
    start: cls.alignStart,
    center: cls.alignCenter,
    end: cls.alignEnd,
};

const directionClasses = {
    row: cls.directionRow,
    column: cls.directionColumn,
};

// todo: add support of any integer gap
const gapClasses = {
    1: cls.gap1,
    2: cls.gap2,
    3: cls.gap3,
};

export const Flex = (props) => {
    const {
        className,
        children,
        justify = "start",
        align = "center",
        direction = "row",
        gap,
        max,
        ...otherProps
    } = props;

    const classes = [
        className,
        justifyClasses[justify],
        alignClasses[align],
        directionClasses[direction],
        gap && gapClasses[gap],
    ];

    const mods = {
        [cls.max]: max, //???????????????????!
    };

    return (
        <div className={cn(cls.Flex, mods, classes)} {...otherProps}>
            {children}
        </div>
    );
};
