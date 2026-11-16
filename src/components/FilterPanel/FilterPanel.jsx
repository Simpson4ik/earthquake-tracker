import { TextField } from '../TextField/TextField';
import { SelectField } from '../SelectField/SelectField';
import { useFilters } from '../../hooks/useFilters';
import {
  LIMIT_OPTIONS,
  MAGNITUDE_OPTIONS,
  MIN_MAGNITUDE_INPUT,
  PERIOD_OPTIONS,
} from '../../constants/filters';
import { ALL_CATEGORIES, CATEGORIES } from '../../constants/categories';
import { formatRange } from '../../utils/formatMagnitude';
import './FilterPanel.css';

const CATEGORY_OPTIONS = [
  { value: ALL_CATEGORIES, label: 'Усі категорії' },
  ...CATEGORIES.map((category) => ({
    value: category.id,
    label: `${category.label} (${formatRange(category)})`,
  })),
];

const SELECT_FIELDS = [
  { name: 'magnitude', label: 'Магнітуда', options: MAGNITUDE_OPTIONS },
  { name: 'period', label: 'Період', options: PERIOD_OPTIONS },
  { name: 'category', label: 'Категорія', options: CATEGORY_OPTIONS },
  { name: 'limit', label: 'Показувати', options: LIMIT_OPTIONS },
];

export function FilterPanel() {
  const { values, setField, isPending, canReset, resetFilters } = useFilters();

  return (
    <form className="widget-box filter-panel" role="search" onSubmit={(e) => e.preventDefault()}>
      <div className="widget-header">
        <h3 className="widget-title">Фільтри</h3>
        <span className="widget-tag" aria-hidden="true">
          {isPending ? 'оновлення…' : 'react-hook-form'}
        </span>
      </div>
      <p className="sr-only" aria-live="polite">
        {isPending ? 'Оновлення результатів…' : ''}
      </p>

      <div className="filter-fields">
        <TextField
          name="search"
          type="search"
          label="Пошук за місцем"
          placeholder="Напр. Alaska"
          value={values.search}
          onChange={(value) => setField('search', value)}
        />
        <TextField
          name="minMagnitude"
          type="number"
          inputMode="decimal"
          label="Мінімальна магнітуда, M ≥"
          placeholder="Без порогу"
          {...MIN_MAGNITUDE_INPUT}
          value={values.minMagnitude}
          onChange={(value) => setField('minMagnitude', value)}
        />
        {SELECT_FIELDS.map(({ name, label, options }) => (
          <SelectField
            key={name}
            name={name}
            label={label}
            options={options}
            value={values[name]}
            onChange={(value) => setField(name, value)}
          />
        ))}
      </div>

      <button type="button" className="btn-reset-filters" onClick={resetFilters} disabled={!canReset}>
        Скинути фільтри
      </button>
    </form>
  );
}
