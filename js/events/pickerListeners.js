import {addMonths, addYears, computeTimeBounds, clampTimeToBounds} from '../lib/date.js';
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
export function applyPickerTime(datepicker, dateValue) {
  const {config} = datepicker;
  const {hourInput, minuteInput} = datepicker.picker.controls;
  const d = new Date(dateValue);
  let h = parseInt(hourInput.value, 10);
  let m = parseInt(minuteInput.value, 10);
  // clamp the carried-over time into the clicked day's selectable range so
  // that picking a day near minDate/maxDate isn't silently rejected
  const bounds = computeTimeBounds(d, config.minDate, config.maxDate, config.minuteStep || 1);
  [h, m] = clampTimeToBounds(isNaN(h) ? 0 : h, isNaN(m) ? 0 : m, bounds);
  d.setHours(h, m, 0, 0);
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
  const stepMax = Math.floor(59 / step) * step;
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
    : Math.max(0, Math.min(stepMax, minuteFromSlider ? m : Math.round(m / step) * step));

  // base date: last selected, else picker's view date
  const base = new Date(dates.length > 0 ? dates[dates.length - 1] : picker.viewDate);
  // clamp the time into the day's selectable range so a value typed past
  // minDate/maxDate stops at the boundary instead of being silently rejected
  // by setDate(). (Wheel/spinner/slider edits are already stopped at the
  // boundary by the min/max attributes syncTimeInputs() maintains — this
  // covers directly-typed values and the field the user is editing.)
  const bounds = computeTimeBounds(base, config.minDate, config.maxDate, step);
  [h, m] = clampTimeToBounds(h, m, bounds);
  base.setHours(h, m, 0, 0);
  // Force autohide=false: time controls send 'input' on every slider tick,
  // so respecting config.autohide would close the popup mid-interaction.
  // The user dismisses the popup via outside click or ESC, not by adjusting time.
  datepicker.setDate(base.getTime(), {autohide: false});
  // setDate() skips the picker refresh when the date is rejected (datesDisabled)
  // or unchanged (clamped back to the current selection); always re-sync the
  // controls so they reflect the actual selection — this also restores the
  // zero-padding the browser drops on wheel/spinner edits ("09" -> "9")
  picker.syncTimeInputs();
}
