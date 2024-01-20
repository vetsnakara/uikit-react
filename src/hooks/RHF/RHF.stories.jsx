import { useState } from "react";
import { useForm } from "react-hook-form";

export default {
    title: "form/RHF",
    parameters: {
        // layout: "centered",
    },
};

export const Default = () => {
    const { handleSubmit, register } = useForm({
        shouldUnregister: false,
        defaultValues: {
            // name: "sdfsdf",
        },
    });

    const [show, setShow] = useState(true);

    return (
        <>
            <input type="checkbox" checked={show} onChange={() => setShow((s) => !s)} />

            <form onSubmit={handleSubmit((data) => console.log("data", data))} noValidate>
                <div>{show && <input {...register("name")} />}</div>
            </form>
        </>
    );
};
