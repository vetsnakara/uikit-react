import { Avatar } from "@/components";

export default {
    title: "uikit/Avatar",
    component: Avatar,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: "Аватар",
            },
        },
    },
};

export const Default = {
    args: {
        src: "images/logo.svg",
    },
};

export const Smallest = {
    args: {
        ...Default.args,
        size: "smallest",
    },
    parameters: {
        docs: {
            description: {
                story: "Самый маленький - 40",
            },
        },
    },
};

export const Small = {
    args: {
        ...Default.args,
        size: "small",
    },
    parameters: {
        docs: {
            description: {
                story: "Маленький - 60",
            },
        },
    },
};

export const Medium = {
    args: {
        ...Default.args,
        size: "medium",
    },
    parameters: {
        docs: {
            description: {
                story: "Средний - 120",
            },
        },
    },
};

export const Big = {
    args: {
        ...Default.args,
        size: "big",
    },
    parameters: {
        docs: {
            description: {
                story: "Большой - 150",
            },
        },
    },
};

export const Rounded = {
    args: {
        ...Default.args,
        rounded: true,
    },
    parameters: {
        docs: {
            description: {
                story: "Скругленный",
            },
        },
    },
};
