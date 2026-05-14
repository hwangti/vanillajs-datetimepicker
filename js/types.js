/**
 * Public type definitions for vanillajs-datetimepicker.
 *
 * This module exists purely to provide JSDoc @typedefs that other source files
 * reference so that `tsc --emitDeclarationOnly` can produce useful .d.ts output.
 * It has no runtime exports.
 *
 * @module types
 */

/**
 * @typedef {Date | number | string} DateLike
 */

/**
 * @typedef {Object} DatepickerLocale
 * @property {string[]} days
 * @property {string[]} daysShort
 * @property {string[]} [daysMin]
 * @property {string[]} months
 * @property {string[]} monthsShort
 * @property {string} today
 * @property {string} [clear]
 * @property {string} format
 * @property {string} [titleFormat]
 * @property {number} [weekStart]
 * @property {string} [hour]
 * @property {string} [minute]
 */

/**
 * Result of a `beforeShow*` callback.
 * @typedef {boolean | string | { enabled?: boolean, classes?: string, tooltip?: string }} BeforeShowResult
 */

/**
 * Config options accepted by Datepicker.
 *
 * The shape mirrors the documented options at docs/options.md. Add new fields
 * here when the public surface grows.
 *
 * @typedef {Object} DatepickerOptions
 * @property {boolean} [autohide]
 * @property {(date: Date) => BeforeShowResult} [beforeShowDay]
 * @property {(date: Date) => BeforeShowResult} [beforeShowDecade]
 * @property {(date: Date) => BeforeShowResult} [beforeShowMonth]
 * @property {(date: Date) => BeforeShowResult} [beforeShowYear]
 * @property {string} [buttonClass]
 * @property {boolean} [calendarWeeks]
 * @property {boolean} [clearButton]
 * @property {string | HTMLElement} [container]
 * @property {string} [dateDelimiter]
 * @property {DateLike[] | ((date: Date, viewId: number) => boolean)} [datesDisabled]
 * @property {number[]} [daysOfWeekDisabled]
 * @property {number[]} [daysOfWeekHighlighted]
 * @property {DateLike} [defaultViewDate]
 * @property {boolean} [disableTouchKeyboard]
 * @property {boolean} [enableOnReadonly]
 * @property {string | { toDisplay?: Function, toValue?: Function }} [format]
 * @property {string} [language]
 * @property {DateLike | null} [maxDate]
 * @property {number} [maxNumberOfDates]
 * @property {number} [maxView]
 * @property {DateLike | null} [minDate]
 * @property {number} [minuteStep]
 * @property {string} [nextArrow]
 * @property {string} [orientation]
 * @property {number} [pickLevel]
 * @property {boolean} [pickTime]
 * @property {string} [prevArrow]
 * @property {boolean} [showDaysOfWeek]
 * @property {boolean} [showOnClick]
 * @property {boolean} [showOnFocus]
 * @property {number} [startView]
 * @property {string} [title]
 * @property {number} [todayButtonMode]
 * @property {boolean} [todayButton]
 * @property {boolean} [todayHighlight]
 * @property {boolean} [updateOnBlur]
 * @property {number} [weekStart]
 */

/**
 * Config options accepted by DateRangePicker (Datepicker options + range-only).
 *
 * @typedef {DatepickerOptions & { inputs?: HTMLElement[], allowOneSidedRange?: boolean }} DateRangePickerOptions
 */

/**
 * Options object accepted by `Datepicker.setDate()` and forwarded by
 * `DateRangePicker.setDates()`.
 *
 * @typedef {Object} DatepickerSetDateOptions
 * @property {boolean} [clear]
 * @property {boolean} [render]
 * @property {boolean} [autohide]
 * @property {boolean} [revert]
 * @property {boolean} [forceRefresh]
 * @property {DateLike} [viewDate]
 */

// no runtime exports — this file exists only for its JSDoc typedefs.
export {};
