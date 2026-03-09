import { useEffect, useState } from "react";
import Button from "./Button";

type Props = {
  label: string;
  textToCopy?: string; // Optionnel, si différent du label
};

const ClipboardButton = ({ label, textToCopy }: Props) => {
  const [copySuccess, setCopySuccess] = useState("");

  useEffect(() => {
    setTimeout(() => setCopySuccess(""), 2000);
  }, [copySuccess]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(textToCopy || label);
    setCopySuccess("Copié !");
  };

  return <Button label={copySuccess || label} onClick={copyToClipboard} />;
};

export default ClipboardButton;
