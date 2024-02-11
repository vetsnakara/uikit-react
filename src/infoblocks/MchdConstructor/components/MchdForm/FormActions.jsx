import { useIsMutating } from "@tanstack/react-query";

import { Button, ButtonVariant, GroupContainer } from "@/components";
import { getLib } from "@/utils";

export const FormActions = ({ className }) => {
    const saveMutationsNum = useIsMutating({ mutationKey: "save" });
    const isLoading = saveMutationsNum > 0;

    const { useFormContext } = getLib("ReactHookForm");
    const {
        reset,
        formState: { defaultValues, isValid },
    } = useFormContext();

    const isSubmitDisabled = !isValid || isLoading;
    console.log({ isValid, isLoading, isSubmitDisabled });

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
