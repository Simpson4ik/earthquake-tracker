import { useId } from 'react';
import '../../styles/formField.css';

export function TextField({ label, value, onChange, type = 'text', ...inputProps }) {
  const id = useId();
  return (
    <div className="form-field">
      <label className="form-label" htmlFor={id}>
        {label}
      </label>
      <input
        {...inputProps}
        id={id}
        className="form-control"
        type={type}
        value={value}
        autoComplete="off"
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
