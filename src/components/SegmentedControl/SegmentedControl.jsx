import { useId } from 'react';
import './SegmentedControl.css';

export function SegmentedControl({ legend, options, value, onChange }) {
  const name = useId();

  return (
    <fieldset className="segmented-control">
      <legend className="segmented-legend">{legend}</legend>
      <div className="segmented-options">
        {options.map((option) => (
          <label key={option.value} className="segmented-option">
            <input
              type="radio"
              className="segmented-input"
              name={name}
              value={option.value}
              checked={option.value === value}
              onChange={() => onChange(option.value)}
            />
            <span className="segmented-label">{option.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
