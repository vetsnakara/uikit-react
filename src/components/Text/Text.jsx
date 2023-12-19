import cn from "classnames";

const Variant = {
    Title: "Title",
    Subtitle: "Subtitle",
    SectionTitle: "SectionTitle",
    SectionSubtitle: "SectionSubtitle",
    Paragraph: "Paragraph",
    Span: "Span",
};

const Tag = {
    [Variant.Title]: "h1",
    [Variant.Subtitle]: "h2",
    [Variant.SectionTitle]: "h3",
    [Variant.SectionSubtitle]: "h4",
    [Variant.Paragraph]: "p",
    [Variant.Span]: "span",
};

const TagClassName = {
    [Variant.Title]: "content__title",
    [Variant.Subtitle]: "content__subtitle",
    [Variant.SectionTitle]: "content__section-title",
    [Variant.SectionSubtitle]: "content__section-subtitle",
    [Variant.Paragraph]: "content__paragraph",
    [Variant.Span]: "",
};

export const TextColor = {
    Positive: "positive",
    Brand: "brand",
    Warning: "warning",
    Important: "important",
    Approved: "approved",
    Muted: "muted",
    Pale: "pale",
};

export const TextSize = {
    Big: "big",
    Small: "small",
    Smaller: "smaller",
};

const Text = ({ variant = Variant.Span, color, size, strong, upper, className, ...props }) => {
    const TagName = Tag[variant];
    const tagClassName = TagClassName[variant];

    const classNames = cn(
        tagClassName,
        {
            [`content_${size}`]: size,
            [`content_${color}`]: color,
            content_strong: strong,
            content_upper: upper,
        },
        className
    );

    return <TagName className={classNames} {...props} />;
};

export const Title = (props) => <Text {...props} variant={Variant.Title} />;
export const Subtitle = (props) => <Text {...props} variant={Variant.Subtitle} />;
export const SectionTitle = (props) => <Text {...props} variant={Variant.SectionTitle} />;
export const SectionSubtitle = (props) => <Text {...props} variant={Variant.SectionSubtitle} />;
export const Paragraph = (props) => <Text {...props} variant={Variant.Paragraph} />;
export const Span = (props) => <Text {...props} variant={Variant.Span} />;
