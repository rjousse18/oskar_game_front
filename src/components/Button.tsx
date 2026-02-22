type ButtonProps = {
  label: string;
  onClick?: () => void;
  isReady?: boolean;
  disabled?: boolean;
};

const Button = ({ label, onClick, isReady = false, disabled = false }: ButtonProps) => {
  return (
    <button className={(isReady && "bgGreen") + " button"} onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};

export default Button;