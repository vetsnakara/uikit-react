import cn from "classnames";

export const ListType = {
    Ordered: "ordered",
    Unordered: "unordered",
};

export const OrderedListType = {
    Bracked: "bracked",
    Letter: "letter",
};

const Item = ({ tag: Tag = "li", className, ...otherProps }) => {
    const classNames = cn("list__item", className);
    return <Tag className={classNames} {...otherProps} />;
};

export const List = ({ type = ListType.Unordered, letter, bracket, className, ...props }) => {
    const isOrdered = type === ListType.Ordered;
    const Tag = isOrdered ? "ol" : "ul";

    const classNames = cn("list", className, {
        list_ordered: isOrdered,
        "list_ordered-letter": letter, // todo: orderedListType prop
        "list_ordered-bracket": bracket,
    });

    return <Tag className={classNames} {...props} />;
};

export const OList = (props) => <List {...props} type={ListType.Ordered} />;
export const UList = (props) => <List {...props} type={ListType.Unordered} />;

List.Item = Item;
OList.Item = Item;
UList.Item = Item;
