// FONCTION DE TYPEWRITING POUR LE PLACEHOLDER DU PSEUDO

import { useEffect, useRef, useState } from "react";

const useTypewriting = (
    text: string,
    typingSpeed: number = 100,
    deletingSpeed: number = 50,
    pause: number = 3000
): string => {
  
    // Texte du placeholder
    const [displayed, setDisplayed] = useState<string>("");
    
    // Indique si on efface (true) ou on écrit (false) 
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    
    // Stockage du timeout pour éviter les doublons
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    
    useEffect(() => {
        const tick = () => {
            setDisplayed((prev) => {

                // ECRIRE
                if (!isDeleting) {

                // On ajoute une lettre
                const next = text.slice(0, prev.length + 1);

                // Si le texte est complet, on attend avant de commencer à effacer
                if (next === text) {
                    timeoutRef.current = setTimeout(() => {
                    setIsDeleting(true);
                    }, pause);
                }

                return next;

                // EFFACER
                } else {

                // On enlève une lettre
                const next = text.slice(0, prev.length - 1);

                // Si le texte est vide, on attend avant de commencer à écrire à nouveau
                if (next === "") {
                    setIsDeleting(false);
                }

                return next;
                }
            });
        };

        // On choisit la vitesse en fonction de la phrase
        const delay = isDeleting ? deletingSpeed : typingSpeed;
        timeoutRef.current = setTimeout(tick, delay);

        // On nettoie le timeout à chaque changement pour éviter les doublons
        return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [displayed, isDeleting, text, typingSpeed, deletingSpeed, pause]);

    // On retourne le texte à afficher
    return displayed;
};

export default useTypewriting;
