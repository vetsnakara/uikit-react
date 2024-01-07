import { Children, cloneElement } from "react";

// todo: настроить отображение классов css-модулей во вкладек Elements при использовании SB и в production

export const VStack = ({ gap = 0, children, ...props }) => {
    const childrenWithGap = Children.map(children, (child, index) => {
        const { props } = child;
        const { className = "" } = props;

        const length = Children.count(children);
        const isLast = index === length - 1;

        return cloneElement(child, {
            ...child.props,
            ...(!isLast && { className: `${className} mb-${gap}` }),
        });
    });

    // todo: is need element div? (can be <> ?)
    return <div {...props}>{childrenWithGap}</div>;
};

// export const VStack = ({ gap = 0, children, ...props }) => {
//     return (
//         <div className={cn(cls.flex)} {...props}>
//             {children}
//         </div>
//     );
// };

// export const HStack = ({ children, gap = 0 }) => {
//     const childrenWithGap = Children.map(children, (child, index) => {
//         const { props } = child;
//         const { className = "" } = props;

//         // const length = Children.count(children);
//         // const isLast = index === length - 1;

//         return cloneElement(child, {
//             ...child.props,
//             ...(!isLast && { className: `${className} ml-${gap}` }),
//         });
//     });

//     return <div>{childrenWithGap}</div>;
// };
