import {limitToRange} from '../lib/utils.js';
import {
  today,
  addMonths,
  addYears,
  computeTimeBounds,
  clampTimeToBounds,
} from '../lib/date.js';
import {isActiveElement} from '../lib/dom.js';

export function triggerDatepickerEvent(datepicker, type) {
  const options = {
    bubbles: true,
    cancelable: true,
    detail: {
      date: datepicker.getDate(),
      viewDate: new Date(datepicker.picker.viewDate),
      viewId: datepicker.picker.currentView.id,
      datepicker,
    },
  };
  datepicker.element.dispatchEvent(new CustomEvent(type, options));
}

// direction: -1 (to previous), 1 (to next)
export function goToPrevOrNext(datepicker, direction) {
  const {config, picker} = datepicker;
  const {currentView, viewDate} = picker;
  let newViewDate;
  switch (currentView.id) {
    case 0:
      newViewDate = addMonths(viewDate, direction);
      break;
    case 1:
      newViewDate = addYears(viewDate, direction);
      break;
    default:
      newViewDate = addYears(viewDate, direction * currentView.navStep);
  }
  newViewDate = limitToRange(newViewDate, config.minDate, config.maxDate);
  picker.changeFocus(newViewDate).render();
}

export function switchView(datepicker) {
  const viewId = datepicker.picker.currentView.id;
  if (viewId === datepicker.config.maxView) {
    return;
  }
  datepicker.picker.changeView(viewId + 1).render();
}

export function clearSelection(datepicker) {
  datepicker.setDate({clear: true});
}

export function goToOrSelectToday(datepicker) {
  const config = datepicker.config;
  let currentDate = today();
  if (config.todayButtonMode === 1) {
    if (config.pickTime) {
      // when picking time as well, "today" means "now" — snap the current
      // time to the minute step and clamp it into min/maxDate's bounds
      const now = new Date();
      const step = config.minuteStep || 1;
      const stepMax = Math.floor(59 / step) * step;
      let h = now.getHours();
      let m = Math.min(stepMax, Math.round(now.getMinutes() / step) * step);
      [h, m] = clampTimeToBounds(
        h, m, computeTimeBounds(now, config.minDate, config.maxDate, step)
      );
      currentDate = now.setHours(h, m, 0, 0);
    }
    datepicker.setDate(currentDate, {forceRefresh: true, viewDate: currentDate});
  } else {
    datepicker.setFocusedDate(currentDate, true);
  }
}

export function unfocus(datepicker) {
  const onBlur = () => {
    if (datepicker.config.updateOnBlur) {
      datepicker.update({revert: true});
    } else {
      datepicker.refresh('input');
    }
    datepicker.hide();
  };
  const element = datepicker.element;

  if (isActiveElement(element)) {
    element.addEventListener('blur', onBlur, {once: true});
  } else {
    onBlur();
  }
}
