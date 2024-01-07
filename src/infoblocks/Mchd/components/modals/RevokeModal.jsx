import { Modal, ModalVariant, Paragraph } from "@uikit/components";

import { useAction } from "../../actions";
import { useUIState } from "../../uiContext";

export const RevokeModal = () => {
    // todo: useUIState has state and change functions ???
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
