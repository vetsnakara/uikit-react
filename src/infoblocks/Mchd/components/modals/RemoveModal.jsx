import { Modal, ModalVariant, Paragraph } from "@uikit/components";
import { useAction } from "../../actions";
import { useUIState } from "../../uiContext";

export const RemoveModal = () => {
    // todo: useUIState has state and change functions ???
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
