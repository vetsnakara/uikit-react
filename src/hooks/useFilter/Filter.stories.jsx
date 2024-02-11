import { rest } from "msw";
// import { FormProvider, useForm } from "react-hook-form";

import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import * as ReactHookForm from "react-hook-form";

import axios from "axios";

import { useEffect, useMemo, useRef, useState } from "react";

import {
    FormCheckbox,
    FormCheckboxGroup,
    FormDateInput,
    FormRadioGroup,
    FormSearchInput,
    FormSelect,
} from "@/components/Form/inputs";

import {
    Button,
    ButtonVariant,
    Card,
    Checkbox,
    GroupContainer,
    Loader,
    Pagination,
    Radio,
    Separator,
    VStack,
} from "@/components";
import { initLib } from "@/utils";

const { FormProvider, useForm } = initLib({ ReactHookForm });

export default {
    title: "hooks/useFilter",
};

const selectItems = [
    { value: "1", label: "One" },
    { value: "2", label: "Two" },
    { value: "3", label: "Three" },
];

const URL = "/filter-url";
const AJAX_SELECT_URL = "/ajax-select-url";

const fetchItems = (params) => {
    return axios.get(URL, {
        params: {
            ...params,
            filter: encodeURI(JSON.stringify(params.filter)),
        },
    });
};

export const Default = () => {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <Filter />
        </QueryClientProvider>
    );
};

const defaultValues = {
    // search: "aaa",
    // date: "10.10.1984",
    // datePeriod: ["10.10.1984", "12.10.1984"],
    // status: "2",
    // active:true,
    search: "",
    date: "",
    datePeriod: [],
    status: "",
    users: [],
    active: false,
    type: "1",
    groups: [],
    cities: [],
};

function Filter() {
    const searchInputRef = useRef();
    const [showMore, setShowMore] = useState(false);

    const [pagination, setPagination] = useState({
        page: 0,
        pageSize: 2,
        total: null,
    });

    const methods = useForm({
        defaultValues,
    });

    const filter = methods.watch();

    console.log("🛑 filter", filter);

    const params = {
        filter,
        page: pagination.page,
        pageSize: pagination.pageSize,
    };

    const { data, isSuccess, isLoading } = useQuery({
        queryKey: ["filter", params],
        queryFn: () => fetchItems(params),
        keepPreviousData: true,
    });

    useEffect(() => {
        if (isSuccess) {
            const {
                paging: { total },
            } = data.data;

            setPagination((prev) => ({
                ...prev,
                total,
            }));
        }
    }, [isSuccess, data]);

    const reset = () => {
        methods.reset(defaultValues);
        searchInputRef.current.value = defaultValues.search;
        setPagination((prev) => ({
            ...prev,
            page: 0,
        }));
    };

    const { data: items } = data?.data ?? {};

    const ajaxSelectpickerOptions = useMemo(
        () => ({
            liveSearch: true,
            ajaxOptions: {
                ajax: {
                    url: AJAX_SELECT_URL,
                    type: "GET",
                    data: () => ({
                        term: "{{{q}}}",
                    }),
                },
                preprocessData: (result) =>
                    result.data.map((item) => ({
                        value: item.code,
                        label: item.name,
                    })),
                cache: false,
                preserveSelected: true,
            },
        }),
        []
    );

    return (
        <FormProvider {...methods}>
            {/* Filters */}
            <VStack gap={1} className="mb-2">
                <FormSearchInput ref={searchInputRef} name="search" placeholder="Текстовый поиск" />
                <FormDateInput name="date" placeholder="Дата" />
                <FormDateInput name="datePeriod" placeholder="Диапазон дат" datepickerOptions={{ range: true }} />
                {showMore && (
                    <VStack gap={1}>
                        <FormSelect name="status" items={selectItems} placeholder="Статус" />

                        <FormSelect name="users" items={selectItems} placeholder="Пользователи" multiple />
                        <FormSelect name="cities" selectpickerOptions={ajaxSelectpickerOptions} multiple />

                        <FormCheckbox name="active" label="Активные" />

                        <Separator />

                        <FormRadioGroup name="type">
                            <Radio label="One" value="1" />
                            <Radio label="Two" value="2" />
                            <Radio label="Three" value="3" />
                        </FormRadioGroup>

                        <Separator />

                        <FormCheckboxGroup name="groups">
                            <Checkbox label="One" value="1" />
                            <Checkbox label="Two" value="2" />
                            <Checkbox label="Three" value="3" />
                        </FormCheckboxGroup>
                    </VStack>
                )}
            </VStack>

            <Button variant={ButtonVariant.Plain} onClick={() => setShowMore((prev) => !prev)} className="mb-2">
                {showMore ? "Свернуть 🔼" : "Показать все 🔽"}
            </Button>

            {/* Buttons */}
            <GroupContainer className="mb-2">
                <Button onClick={() => {}}>Найти</Button>
                <Button variant={ButtonVariant.Secondary} onClick={reset}>
                    Сбросить
                </Button>
            </GroupContainer>

            {/* Items */}
            <div>
                {isLoading && (
                    <div style={{ position: "relative", minHeight: 200 }}>
                        <Loader />
                    </div>
                )}

                {!isLoading && (
                    <VStack gap={1} className="mb-2">
                        {items?.map((item, index) => (
                            <Card key={index}>{JSON.stringify(item)}</Card>
                        ))}
                    </VStack>
                )}
            </div>

            {/* Pagination */}
            <Pagination
                page={pagination.page + 1}
                pageSize={pagination.pageSize}
                total={pagination.total}
                onPageChange={(page) => {
                    setPagination((prev) => ({
                        ...prev,
                        page: page - 1,
                    }));
                }}
                arrows={true}
            />
        </FormProvider>
    );
}

Default.parameters = {
    msw: {
        handlers: [
            // filter
            rest.get(URL, async (req, res, ctx) => {
                const searchParams = Object.fromEntries(req.url.searchParams.entries());

                // const filter = decodeURI(searchParams.filter);
                const page = Number(searchParams.page);
                const pageSize = Number(searchParams.pageSize);

                // console.log("msw: page, pageSize", page, pageSize);

                const data = [
                    { id: "1", status: "1", name: "One" },
                    { id: "2", status: "2", name: "Two" },
                    { id: "3", status: "2", name: "Three" },
                    { id: "4", status: "2", name: "Four" },
                    { id: "5", status: "3", name: "Five" },
                ];

                const indexBegin = pageSize * page;
                const indexEnd = pageSize * (page + 1);
                const dataPage = data.slice(indexBegin, indexEnd);

                // delay
                await new Promise((resolve) => setTimeout(resolve, 1000));

                return res(
                    ctx.status(200),
                    ctx.json({
                        code: "SUCCESS",
                        data: dataPage,
                        paging: {
                            current: page,
                            pageSize,
                            pages: Math.ceil(data.length / pageSize),
                            total: data.length,
                        },
                    })
                );
            }),

            // ajax selectpicker
            rest.get(AJAX_SELECT_URL, (req, res, ctx) => {
                const term = req.url.searchParams.get("term");

                // todo: use data from mocks
                const data = [
                    { code: "1", name: "One" },
                    { code: "2", name: "Two" },
                    { code: "3", name: "Three" },
                    { code: "4", name: "Four" },
                    { code: "5", name: "Five" },
                ].filter(({ name }) => name.toLocaleLowerCase().includes(term));

                return res(ctx.status(200), ctx.json({ data }));
            }),
        ],
    },
};
