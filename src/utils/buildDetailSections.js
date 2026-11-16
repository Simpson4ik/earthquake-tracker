import { NO_VALUE } from '../constants/app';
import { ALERT_LABELS, EVENT_TYPE_LABELS, STATUS_LABELS } from '../constants/details';
import { formatLatitude, formatLongitude } from './formatCoordinates';
import { formatDateTime } from './formatTime';

function display(value, format = String) {
  return value == null ? NO_VALUE : format(value);
}

const withLabel = (labels) => (value) => labels[value] ?? value;
const withDigits = (digits, suffix = '') => (value) => `${value.toFixed(digits)}${suffix}`;

export function buildDetailSections(earthquake) {
  return [
    {
      id: 'location',
      title: 'Розташування й час',
      items: [
        { label: 'Широта', value: display(earthquake.latitude, formatLatitude) },
        { label: 'Довгота', value: display(earthquake.longitude, formatLongitude) },
        { label: 'Глибина', value: display(earthquake.depth, withDigits(1, ' км')) },
        { label: 'Час події', value: display(earthquake.time, formatDateTime) },
        { label: 'Оновлено', value: display(earthquake.updated, formatDateTime) },
      ],
    },
    {
      id: 'classification',
      title: 'Класифікація',
      items: [
        { label: 'Тип події', value: display(earthquake.eventType, withLabel(EVENT_TYPE_LABELS)) },
        { label: 'Статус даних', value: display(earthquake.status, withLabel(STATUS_LABELS)) },
        { label: 'Тип магнітуди', value: display(earthquake.magnitudeType) },
        { label: 'Значущість (sig)', value: display(earthquake.significance) },
        { label: 'Мережа', value: display(earthquake.network, (network) => network.toUpperCase()) },
      ],
    },
    {
      id: 'impact',
      title: 'Вплив',
      items: [
        { label: 'Повідомлень очевидців', value: display(earthquake.feltReports) },
        { label: 'Інтенсивність за відгуками (CDI)', value: display(earthquake.reportedIntensity, withDigits(1)) },
        { label: 'Розрахункова інтенсивність (MMI)', value: display(earthquake.estimatedIntensity, withDigits(1)) },
        { label: 'Рівень тривоги PAGER', value: display(earthquake.alert, withLabel(ALERT_LABELS)) },
        { label: 'Прапорець цунамі', value: earthquake.hasTsunamiFlag ? 'Встановлено' : 'Немає' },
      ],
    },
    {
      id: 'quality',
      title: 'Якість вимірювання',
      items: [
        { label: 'Кількість станцій', value: display(earthquake.stationCount) },
        { label: 'Азимутальний розрив', value: display(earthquake.azimuthalGap, withDigits(0, '°')) },
        { label: 'Найближча станція', value: display(earthquake.nearestStationDistance, withDigits(2, '°')) },
        { label: 'Похибка RMS', value: display(earthquake.rms, withDigits(2, ' с')) },
      ],
    },
  ];
}
