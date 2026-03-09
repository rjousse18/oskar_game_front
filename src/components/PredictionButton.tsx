type PredictionButtonProps = {
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

const PredictionButton = ({
  disabled,
  onClick,
  children,
}: PredictionButtonProps) => {
  return (
    <button
      className="button prediction-button"
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default PredictionButton;
