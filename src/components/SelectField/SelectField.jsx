import { useId } from 'react';
import '../../styles/formField.css';

export function SelectField({ label, value, onChange, options, ...selectProps }) {
  const id = useId();
  return (
    <div className="form-field">
      <label className="form-label" htmlFor={id}>
        {label}
      </label>
      <select
        {...selectProps}
        id={id}
        className="form-control"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
