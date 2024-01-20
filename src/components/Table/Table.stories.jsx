import { Table } from "./Table";

// todo: use casual.js ???
// todo: memoize columns and items ???

export default {
    title: "uikit/Table",
    tags: ["autodocs"],
};

export const Default = () => (
    <Table
        columns={[
            {
                path: "title",
                label: "Title",
                value: (movie) => `Movie ${movie.title}`,
            },
            { path: "genre.name", label: "Genre" },
            { path: "numberInStock", label: "Stock" },
            { path: "dailyRentalRate", label: "Rate" },
            // {
            //     key: "like",
            //     value: "",
            //     // value: (movie) => <Like active={movie.like} onClick={() => onLike(movie)} />,
            // },
        ]}
        items={[
            {
                id: 1,
                title: "Title",
                genre: {
                    name: "Genre",
                },
                numberInStock: 1,
                dailyRentalRate: 5.5,
            },
            {
                id: 2,
                title: "Title",
                genre: {
                    name: "Genre",
                },
                numberInStock: 1,
                dailyRentalRate: 5.5,
            },
            {
                id: 3,
                title: "Title",
                genre: {
                    name: "Genre",
                },
                numberInStock: 1,
                dailyRentalRate: 5.5,
            },
        ]}
    />
);
