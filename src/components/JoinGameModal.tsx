import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { FC, useState } from "react";
import "../css/JoinGameModal.css";

// Je définis les props du modal
interface JoinGameModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (code: string) => void;
}


const JoinGameModal: FC<JoinGameModalProps> = ({ isOpen, onClose, onConfirm }) => {
    const [gameCode, setGameCode] = useState("");

    // Handler pour confirmer le code de la partie à rejoindre
    const handleConfirm = () => {
        if (!gameCode.trim()) return;
        onConfirm(gameCode.trim());
        setGameCode("");
    };


    return (
            <Dialog open={isOpen} as="div" className="join-modal-container" onClose={onClose}>

            <div className="join-modal-backdrop" />
            <div className="join-modal-wrapper">

                <DialogPanel className="join-modal-panel">
                    <div className="join-modal-input-group">

                    <input
                        type="text"
                        placeholder="Code"
                        value={gameCode}
                        onChange={(e) => setGameCode(e.target.value)}
                        className="join-modal-input"
                    />

                    <button className="join-modal-button confirm" onClick={handleConfirm}>✓</button>
                </div>

                </DialogPanel>
            </div>
        </Dialog>
    );
};

export default JoinGameModal;
