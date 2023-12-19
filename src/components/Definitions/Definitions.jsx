import cn from "classnames";

const DefinitionsVariant = {
    Row: "row",
    RowTable: "row-table",
};

const DefinitionsWidth = {
    W150: 150,
    W200: 200,
    W250: 250,
    W300: 300,
};

// todo: what to use for key?

export const Definitions = ({ items = [], variant, fixWidth, reverse = false, className, ...props }) => {
    const classNames = cn("definitions", className, {
        [`definitions_${variant}`]: Boolean(variant),
        [`definitions_fix-width-${fixWidth}`]: variant === DefinitionsVariant.RowTable && Boolean(fixWidth),
        definitions_reverse: reverse,
    });

    return (
        <div className={classNames} {...props}>
            {items.map((item, index) => (
                <DefinitionsItem key={index} {...item} />
            ))}
        </div>
    );
};

// todo: do same for Button and other components
Definitions.Variant = DefinitionsVariant;
Definitions.Width = DefinitionsWidth;

const DefinitionsItem = ({ term, desc }) => (
    <div className="definitions__item">
        <dt className="definitions__key">{term}</dt>
        <dd className="definitions__value">{desc}</dd>
    </div>
);
