import { rest } from "msw";

import { Select } from "../Select";
import { options } from "./data";

const AJAX_SELECT_SERCH_PATH = "ajaxSelectSearchPath";

export const Ajax = () => {
    const selectpickerOptions = {
        liveSearch: true,
        ajaxOptions: {
            ajax: {
                url: AJAX_SELECT_SERCH_PATH,
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
            preserveSelected: false,
        },
    };

    return <Select {...options} items={[]} selectpickerOptions={selectpickerOptions} multiple />;
};

Ajax.parameters = {
    msw: {
        handlers: [
            rest.get(AJAX_SELECT_SERCH_PATH, (req, res, ctx) => {
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
