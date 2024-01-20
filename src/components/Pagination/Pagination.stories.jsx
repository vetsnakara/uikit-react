import { useState } from "react";

import { Pagination } from "./Pagination";

export default {
    title: "uikit/Pagination",
    tags: ["autodocs"],
};

export const Default = () => {
    const [page, setPage] = useState(1);
    return <Pagination page={page} total={111} pageSize={10} onPageChange={setPage} />;
};

// todo: DRY
export const NoArrows = () => {
    const [page, setPage] = useState(1);
    return <Pagination page={page} total={111} pageSize={10} onPageChange={setPage} arrows={false} />;
};
