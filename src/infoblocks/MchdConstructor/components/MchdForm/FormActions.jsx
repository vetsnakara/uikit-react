// import { useIsMutating } from "@tanstack/react-query";

import { useFormContext } from "react-hook-form";

import { Button, ButtonVariant, GroupContainer } from "@/components";

export const FormActions = ({ className }) => {
    // const saveMutationsNum = useIsMutating({ mutationKey: "save" });
    // const isLoading = saveMutationsNum > 0;

    const {
        reset,
        // formState: { defaultValues, isValid },
        formState: { defaultValues },
    } = useFormContext();

    // const isSubmitDisabled = !isValid || isLoading;
    // console.log({ isValid, isLoading, isSubmitDisabled });

    return (
        <GroupContainer className={className}>
            <Button type="submit" disabled={false}>
                Сохранить
            </Button>
            <Button variant={ButtonVariant.Secondary}>Отменить</Button>
            <Button variant={ButtonVariant.Secondary} onClick={() => reset(defaultValues)}>
                Reset
            </Button>
        </GroupContainer>
    );
};
