import { useState } from "react";

import { Pagination } from "./Pagination";

import { maxWidth } from "@/storybook/decorators";

export default {
    title: "uikit/Pagination",
    decorators: [maxWidth(500)],
    tags: ["autodocs"],
};

export const Default = () => {
    const [page, setPage] = useState(1);
    return <Pagination page={page} total={111} pageSize={10} onPageChange={setPage} />;
};

export const NoArrows = () => {
    const [page, setPage] = useState(1);
    return <Pagination page={page} total={111} pageSize={10} onPageChange={setPage} arrows={false} />;
};
