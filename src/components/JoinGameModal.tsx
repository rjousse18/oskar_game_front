import { Dialog, DialogPanel } from "@headlessui/react";
import { FC, useState, useCallback } from "react";
import "../css/JoinGameModal.css";

// Props du modal : contrôle de l'ouverture, fermeture, et confirmation avec le code saisi
interface JoinGameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (code: string) => void;
}


const JoinGameModal: FC<JoinGameModalProps> = ({ isOpen, onClose, onConfirm }) => {
    const [gameCode, setGameCode] = useState("");

    // Valide et transmet le code, puis réinitialise le champ
    const handleConfirm = useCallback(() => {
        const trimmed = gameCode.trim();
        if (!trimmed) return;
        onConfirm(trimmed);
        setGameCode("");
    }, [gameCode, onConfirm]);

    // Permet de confirmer via la touche Entrée sur PC
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") handleConfirm();
    };


    return (
            <Dialog open={isOpen} as="div" className="join-modal-container" onClose={onClose}>

            <div className="join-modal-backdrop" />
            <div className="join-modal-wrapper">

                <DialogPanel className="join-modal-panel">
                    <div className="join-modal-input-group">

                    <input
                        type="text"
                        placeholder="Code de la partie"
                        value={gameCode}
                        onChange={(e) => setGameCode(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="join-modal-input"
                        autoFocus
                    />

                    <button className="join-modal-button confirm" onClick={handleConfirm}>✓</button>
                </div>

                </DialogPanel>
            </div>
        </Dialog>
    );
};

export default JoinGameModal;
