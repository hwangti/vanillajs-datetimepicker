export type DateLike = Date | number | string;
export type DatepickerLocale = {
    days: string[];
    daysShort: string[];
    daysMin?: string[];
    months: string[];
    monthsShort: string[];
    today: string;
    now?: string;
    clear?: string;
    format: string;
    titleFormat?: string;
    weekStart?: number;
    hour?: string;
    minute?: string;
};
/**
 * Result of a `beforeShow*` callback.
 */
export type BeforeShowResult = boolean | string | {
    enabled?: boolean;
    classes?: string;
    tooltip?: string;
};
/**
 * Config options accepted by Datepicker.
 *
 * The shape mirrors the documented options at docs/options.md. Add new fields
 * here when the public surface grows.
 */
export type DatepickerOptions = {
    autohide?: boolean;
    beforeShowDay?: (date: Date) => BeforeShowResult;
    beforeShowDecade?: (date: Date) => BeforeShowResult;
    beforeShowMonth?: (date: Date) => BeforeShowResult;
    beforeShowYear?: (date: Date) => BeforeShowResult;
    buttonClass?: string;
    calendarWeeks?: boolean;
    clearButton?: boolean;
    container?: string | HTMLElement;
    dateDelimiter?: string;
    datesDisabled?: DateLike[] | ((date: Date, viewId: number) => boolean);
    daysOfWeekDisabled?: number[];
    daysOfWeekHighlighted?: number[];
    defaultViewDate?: DateLike;
    disableTouchKeyboard?: boolean;
    enableOnReadonly?: boolean;
    format?: string | {
        toDisplay?: Function;
        toValue?: Function;
    };
    language?: string;
    maxDate?: DateLike | null;
    maxNumberOfDates?: number;
    maxView?: number;
    minDate?: DateLike | null;
    minuteStep?: number;
    nextArrow?: string;
    orientation?: string;
    pickLevel?: number;
    pickTime?: boolean;
    prevArrow?: string;
    showDaysOfWeek?: boolean;
    showOnClick?: boolean;
    showOnFocus?: boolean;
    startView?: number;
    timeSliderScale?: boolean;
    title?: string;
    todayButtonMode?: number;
    todayButton?: boolean;
    todayHighlight?: boolean;
    updateOnBlur?: boolean;
    weekStart?: number;
};
/**
 * Config options accepted by DateRangePicker (Datepicker options + range-only).
 */
export type DateRangePickerOptions = DatepickerOptions & {
    inputs?: HTMLElement[];
    allowOneSidedRange?: boolean;
};
/**
 * Options object accepted by `Datepicker.setDate()` and forwarded by
 * `DateRangePicker.setDates()`.
 */
export type DatepickerSetDateOptions = {
    clear?: boolean;
    render?: boolean;
    autohide?: boolean;
    revert?: boolean;
    forceRefresh?: boolean;
    viewDate?: DateLike;
};
