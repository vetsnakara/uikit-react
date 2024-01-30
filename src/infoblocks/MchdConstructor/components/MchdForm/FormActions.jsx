import { Button, ButtonVariant, GroupContainer } from "@uikit/components";
import { useFormContext } from "react-hook-form";

export const FormActions = () => {
    const {
        reset,
        formState: { defaultValues },
    } = useFormContext();

    return (
        <GroupContainer>
            <Button type="submit">Сохранить</Button>
            <Button variant={ButtonVariant.Secondary}>Отменить</Button>
            <Button variant={ButtonVariant.Secondary} onClick={() => reset(defaultValues)}>
                Reset
            </Button>
        </GroupContainer>
    );
};
