import { useAction } from "../../actions";
import { useUIState } from "../../uiContext";

import { Modal, ModalVariant, Paragraph } from "@/components";

export const RemoveModal = () => {
    const { remove } = useAction();
    const { isRemoveModalOpen, setIsRemoveModalOpen } = useUIState();

    return (
        <Modal
            variant={ModalVariant.Dialog}
            title="Удаление доверенности"
            open={isRemoveModalOpen}
            onClose={() => setIsRemoveModalOpen(false)}
            onConfirm={remove}
        >
            <Paragraph>Удалите доверенность</Paragraph>
        </Modal>
    );
};
