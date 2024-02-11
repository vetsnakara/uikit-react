import { useAction } from "../../actions";
import { useUIState } from "../../uiContext";

import { Modal, ModalVariant, Paragraph } from "@/components";

export const SignModal = () => {
    const { sign } = useAction();
    const { isSignModalOpen, setIsSignModalOpen } = useUIState();

    return (
        <Modal
            variant={ModalVariant.Dialog}
            title="Подписание доверенности"
            open={isSignModalOpen}
            onClose={() => setIsSignModalOpen(false)}
            onConfirm={sign}
        >
            <Paragraph>Подпишите доверенность</Paragraph>
        </Modal>
    );
};
