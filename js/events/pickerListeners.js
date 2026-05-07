import {addMonths, addYears} from '../lib/date.js';
import {findElementInEventPath} from '../lib/event.js';
import {goToPrevOrNext, switchView} from './functions.js';

function goToSelectedMonthOrYear(datepicker, selection) {
  const picker = datepicker.picker;
  const viewDate = new Date(picker.viewDate);
  const viewId = picker.currentView.id;
  const newDate = viewId === 1
    ? addMonths(viewDate, selection - viewDate.getMonth())
    : addYears(viewDate, selection - viewDate.getFullYear());

  picker.changeFocus(newDate).changeView(viewId - 1).render();
}

export function onClickViewSwitch(datepicker) {
  switchView(datepicker);
}

export function onClickPrevButton(datepicker) {
  goToPrevOrNext(datepicker, -1);
}

export function onClickNextButton(datepicker) {
  goToPrevOrNext(datepicker, 1);
}

// Combine a date timestamp (any time portion) with the picker's current time
// inputs. Used when pickTime is enabled.
function applyPickerTime(datepicker, dateValue) {
  const {hourInput, minuteInput} = datepicker.picker.controls;
  const d = new Date(dateValue);
  const h = parseInt(hourInput.value, 10);
  const m = parseInt(minuteInput.value, 10);
  d.setHours(isNaN(h) ? 0 : h, isNaN(m) ? 0 : m, 0, 0);
  return d.getTime();
}

// For the picker's main block to delegete the events from `datepicker-cell`s
export function onClickView(datepicker, ev) {
  const target = findElementInEventPath(ev, '.datepicker-cell');
  if (!target || target.classList.contains('disabled')) {
    return;
  }

  const {id, isMinView} = datepicker.picker.currentView;
  const data = target.dataset;
  if (isMinView) {
    const dateValue = datepicker.config.pickTime
      ? applyPickerTime(datepicker, Number(data.date))
      : Number(data.date);
    datepicker.setDate(dateValue);
  } else if (id === 1) {
    goToSelectedMonthOrYear(datepicker, Number(data.month));
  } else {
    goToSelectedMonthOrYear(datepicker, Number(data.year));
  }
}

export function onMousedownPicker(ev) {
  // allow focus on time inputs; preventDefault on the rest keeps the input
  // field from losing focus while interacting with the calendar
  if (ev.target.closest('.datepicker-time')) {
    return;
  }
  ev.preventDefault();
}

// User changed any of: hour input/slider or minute input/slider. Snap minute
// to step, keep paired controls in sync, update the selected date, re-render.
// Triggered on the 'input' event (every change) so wheel/keystroke edits apply
// even when the picker closes before blur fires.
export function onChangeTime(datepicker, ev) {
  const {config, dates, picker} = datepicker;
  const {hourInput, hourSlider, minuteInput, minuteSlider} = picker.controls;
  const step = config.minuteStep || 1;
  const target = ev && ev.target;
  const hourFromSlider = target === hourSlider;
  const minuteFromSlider = target === minuteSlider;

  let h = parseInt(hourFromSlider ? hourSlider.value : hourInput.value, 10);
  let m = parseInt(minuteFromSlider ? minuteSlider.value : minuteInput.value, 10);
  h = isNaN(h) ? 0 : Math.max(0, Math.min(23, h));
  // sliders always emit stepped values; only snap when value came from the
  // number input where user can type arbitrary values
  m = isNaN(m)
    ? 0
    : Math.max(0, Math.min(59, minuteFromSlider ? m : Math.round(m / step) * step));

  // sync paired controls; never overwrite the field the user is typing into
  if (target !== hourInput && document.activeElement !== hourInput) {
    hourInput.value = String(h).padStart(2, '0');
  }
  if (target !== hourSlider) {
    hourSlider.value = h;
  }
  if (target !== minuteInput && document.activeElement !== minuteInput) {
    minuteInput.value = String(m).padStart(2, '0');
  }
  if (target !== minuteSlider) {
    minuteSlider.value = m;
  }

  // base date: last selected, else picker's view date
  const base = new Date(dates.length > 0 ? dates[dates.length - 1] : picker.viewDate);
  base.setHours(h, m, 0, 0);
  datepicker.setDate(base.getTime());
}
