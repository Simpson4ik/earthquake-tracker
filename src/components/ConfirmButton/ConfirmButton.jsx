import { useState } from 'react';
import '../../styles/button.css';
import './ConfirmButton.css';

export function ConfirmButton({ label, confirmLabel, cancelLabel = 'Скасувати', onConfirm }) {
  const [isConfirming, setIsConfirming] = useState(false);

  const handleConfirm = () => {
    setIsConfirming(false);
    onConfirm();
  };

  return (
    <div className="confirm-button">
      <button type="button" className="btn btn-block" onClick={() => setIsConfirming((prev) => !prev)}>
        {isConfirming ? cancelLabel : label}
      </button>
      {isConfirming && (
        <button type="button" className="btn btn-block btn-danger" onClick={handleConfirm}>
          {confirmLabel}
        </button>
      )}
    </div>
  );
}
