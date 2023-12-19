import { Modal, ModalVariant, Paragraph } from "@uikit/components";
import { useAction } from "../../actions";
import { useUIState } from "../../uiContext";

export const SignModal = () => {
    // todo: useUIState has state and change functions ???
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
