import { useAction } from "../../actions";
import { useUIState } from "../../uiContext";

import { Modal, ModalVariant, Paragraph } from "@/components";

export const RevokeModal = () => {
    const { revoke } = useAction();
    const { isRevokeModalOpen, setIsRevokeModalOpen } = useUIState();

    return (
        <Modal
            variant={ModalVariant.Dialog}
            title="Отзыв доверенности"
            open={isRevokeModalOpen}
            onClose={() => setIsRevokeModalOpen(false)}
            onConfirm={revoke}
        >
            <Paragraph>Отзовите доверенность</Paragraph>
        </Modal>
    );
};
