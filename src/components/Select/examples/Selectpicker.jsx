import { VStack } from "../../Stack";
import { Select } from "../Select";

import { options } from "./data";

export const Width = () => (
    <VStack gap={2}>
        <Select {...options} title="width: 'auto'" selectpickerOptions={{ width: "auto" }} />
        <Select {...options} title="width: 'fit'" selectpickerOptions={{ width: "fit" }} />
        <Select {...options} title="width: '150px'" selectpickerOptions={{ width: "150px" }} />
        <Select {...options} title="width: '75%'" selectpickerOptions={{ width: "75%" }} />
    </VStack>
);

export const Container = () => {
    const style = {
        maxHeight: 100,
        overflow: "hidden",
        border: "1px solid black",
        padding: 10,
        borderRadius: 5,
        // width: "100%",
    };

    return (
        <VStack gap={2}>
            <div style={style}>
                <Select {...options} title="container: false" selectpickerOptions={{ container: false }} />
            </div>
            <div style={style}>
                <Select {...options} title="container: 'body' (default)" />
            </div>
        </VStack>
    );
};

export const Dropup = () => (
    <VStack gap={2} style={{ margin: "150px 50px" }}>
        <Select {...options} title="dropupAuto: true (default)" />
        <Select {...options} title="dropupAuto: false" selectpickerOptions={{ dropupAuto: false }} />
    </VStack>
);

export const Header = () => {
    const commonOptions = {
        ...options,
        selectpickerOptions: {
            header: "Заголовок дропдауна",
        },
    };

    return (
        <VStack gap={2}>
            <Select {...commonOptions} title="Единственный выбор" />
            <Select {...commonOptions} title="Множественный выбор" />
        </VStack>
    );
};

export const Size = () => (
    <VStack gap={2}>
        <Select {...options} title="Единственный выбор" selectpickerOptions={{ size: 3 }} />
        <Select {...options} title="Множественный выбор" selectpickerOptions={{ size: 3 }} multiple />
    </VStack>
);

export const MaxOptions = () => (
    <Select
        {...options}
        title="Множественный выбор"
        selectpickerOptions={{ maxOptions: 2, maxOptionsText: "Нельзя выбрать больше 2-ух" }}
        multiple
    />
);

export const LiveSearch = () => {
    const commonOptions = {
        ...options,
        selectpickerOptions: {
            liveSearch: true,
            liveSearchPlaceholder: "Начните искать...",
            noneResultsText: "Поиск {0} не дал результатов",
        },
    };

    return (
        <VStack gap={2}>
            <Select {...commonOptions} title="Единственный выбор" placeholder="Выберите" />
            <Select {...commonOptions} title="Множественный выбор" multiple />
        </VStack>
    );
};

export const LiveSearchStyle = () => {
    const getOptions = (liveSearchStyle) => ({
        ...options,
        selectpickerOptions: {
            liveSearch: true,
            liveSearchStyle,
        },
        title: `liveSearchStyle: ${liveSearchStyle}`,
    });

    return (
        <VStack gap={2}>
            <Select {...getOptions("contains")} />
            <Select {...getOptions("startsWith")} />
        </VStack>
    );
};

export const ActionsBox = () => (
    <Select
        {...options}
        selectpickerOptions={{
            actionsBox: true,
            selectAllText: "Отметить все", // default: Выбрать все
            deselectAllText: "Сбросить все", // default: Отменить все
        }}
        multiple
    />
);

export const AddItems = () => {
    const commonOptions = {
        ...options,
        selectpickerOptions: {
            liveSearch: true,
            addItemsOptions: {},
        },
    };

    return (
        <VStack gap={2}>
            <Select {...commonOptions} title="Единственный выбор" />
            <Select {...commonOptions} title="Множественный выбор" multiple />
        </VStack>
    );
};

export const SelectedTextFormat = () => {
    const formats = ["values" /* default */, "count", "count > 2", "static", "title:count", "title:num", "title:label"];

    const commonOptions = {
        ...options,
        multiple: true,
    };

    const selectOptionsList = formats.map((format) => ({
        format,
        ...commonOptions,
        title: `selectedTextFormat: '${format}'`,
        selectpickerOptions: {
            selectedTextFormat: format,
        },
        ...(format.startsWith("title") && { placeholder: "Выбрано:" }),
    }));

    return (
        <VStack gap={2}>
            {selectOptionsList.map(({ format, ...selectOptions }) => (
                <Select key={format} {...selectOptions} />
            ))}
        </VStack>
    );
};

export const NoneSelectedText = () => {
    const selectpickerOptions = {
        noneSelectedText: "Пока ничего не выбрано...",
        selectedTextFormat: "count",
    };

    return <Select {...options} selectpickerOptions={selectpickerOptions} multiple />;
};

export const CountSelectedText = () => (
    <Select
        {...options}
        selectpickerOptions={{
            selectedTextFormat: "count",
            countSelectedText: (numSelected, numTotal) => {
                return `Selected ${numSelected} items from ${numTotal}`;
            },
        }}
        multiple
    />
);

export const MultipleSeparator = () => (
    <Select
        {...options}
        selectpickerOptions={{
            multipleSeparator: " * ",
        }}
        multiple
    />
);
