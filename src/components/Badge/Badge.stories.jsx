import { Badge } from "./Badge";

export default {
    title: "uikit/Badge",
    component: Badge,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: "Бейдж",
            },
        },
    },
};

export const Default = {
    args: {
        children: "Text",
    },
};

export const Success = {
    args: {
        children: "Text",
        variant: "success",
    },
    parameters: {
        docs: {
            description: {
                story: "Со статусом success",
            },
        },
    },
};

export const Warning = {
    args: {
        children: "Text",
        variant: "warning",
    },
    parameters: {
        docs: {
            description: {
                story: "Со статусом warning",
            },
        },
    },
};

export const Danger = {
    args: {
        children: "Text",
        variant: "danger",
    },
    parameters: {
        docs: {
            description: {
                story: "Со статусом danger",
            },
        },
    },
};

export const Error = {
    args: {
        children: "Text",
        variant: "error",
        closeable: true,
    },
    parameters: {
        docs: {
            description: {
                story: "С ошибкой",
            },
        },
    },
};

export const Transparent = {
    args: {
        children: "Text",
        variant: "transparent",
    },
    parameters: {
        docs: {
            description: {
                story: "Без фона",
            },
        },
    },
};

export const WithIcon = {
    args: {
        children: "Text",
        variant: "success",
        icon: "book",
    },
    parameters: {
        docs: {
            description: {
                story: "С иконкой",
            },
        },
    },
};

export const WithIconRound = {
    args: {
        icon: "book",
        round: true,
    },
    parameters: {
        docs: {
            description: {
                story: "С иконкой, без текста",
            },
        },
    },
};

export const MaxWidth250 = {
    args: {
        maxWidth: 250,
        children: "Very very very very very very long text",
    },
    parameters: {
        docs: {
            description: {
                story: "С максимальной шириной 250",
            },
        },
    },
};
