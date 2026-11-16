import { useForm, useWatch } from 'react-hook-form';
import { FiltersContext } from './FiltersContext';
import { useDebounce } from '../hooks/useDebounce';
import { useToggle } from '../hooks/useToggle';
import { useSort } from '../hooks/useSort';
import { DEBOUNCE_MS, DEFAULT_FILTERS } from '../constants/filters';
import { DEFAULT_SORT } from '../constants/columns';

export function FiltersProvider({ children }) {
  const {
    control,
    setValue,
    reset,
    formState: { isDirty },
  } = useForm({ defaultValues: DEFAULT_FILTERS });
  const values = useWatch({ control });
  const appliedFilters = useDebounce(values, DEBOUNCE_MS);
  const [isAlertMode, toggleAlertMode] = useToggle(false);
  const [sort, toggleSort] = useSort(DEFAULT_SORT);

  const value = {
    values,
    appliedFilters,
    isPending: values !== appliedFilters,
    canReset: isDirty || isAlertMode,
    setField: (name, fieldValue) => setValue(name, fieldValue, { shouldDirty: true }),
    resetFilters: () => {
      reset(DEFAULT_FILTERS);
      if (isAlertMode) toggleAlertMode();
    },
    isAlertMode,
    toggleAlertMode,
    sort,
    toggleSort,
  };

  return <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>;
}
