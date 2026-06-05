/**
 * Class representing a date picker
 */
export default class Datepicker {
    /**
     * Format Date object or time value in given format and language
     * @param  {import('./types.js').DateLike} date - date or time value to format
     * @param  {string | { toDisplay?: Function, toValue?: Function }} format - format string or object that contains
     * toDisplay() custom formatter, whose signature is
     * - args:
     *   - date: {Date} - Date instance of the date passed to the method
     *   - format: {Object} - the format object passed to the method
     *   - locale: {Object} - locale for the language specified by `lang`
     * - return:
     *     {String} formatted date
     * @param  {String} [lang=en] - language code for the locale to use
     * @return {String} formatted date
     */
    static formatDate(date: import("./types.js").DateLike, format: string | {
        toDisplay?: Function;
        toValue?: Function;
    }, lang?: string): string;
    /**
     * Parse date string
     * @param  {import('./types.js').DateLike} dateStr - date string, Date object or time
     * value to parse
     * @param  {string | { toDisplay?: Function, toValue?: Function }} format - format string or object that contains
     * toValue() custom parser, whose signature is
     * - args:
     *   - dateStr: {String|Date|Number} - the dateStr passed to the method
     *   - format: {Object} - the format object passed to the method
     *   - locale: {Object} - locale for the language specified by `lang`
     * - return:
     *     {Date|Number} parsed date or its time value
     * @param  {String} [lang=en] - language code for the locale to use
     * @return {Number} time value of parsed date
     */
    static parseDate(dateStr: import("./types.js").DateLike, format: string | {
        toDisplay?: Function;
        toValue?: Function;
    }, lang?: string): number;
    /**
     * @type {Record<string, import('./types.js').DatepickerLocale>} - Installed locales in `[languageCode]: localeObject` format
     * en`:_English (US)_ is pre-installed.
     */
    static get locales(): Record<string, import("./types.js").DatepickerLocale>;
    /**
     * Create a date picker
     * @param  {HTMLElement} element - element to bind a date picker
     * @param  {import('./types.js').DatepickerOptions} [options] - config options
     * @param  {DateRangePicker} [rangepicker] - DateRangePicker instance the
     * date picker belongs to. Use this only when creating date picker as a part
     * of date range picker
     */
    constructor(element: HTMLElement, options?: import("./types.js").DatepickerOptions, rangepicker?: DateRangePicker);
    element: HTMLElement;
    dates: any;
    config: {
        buttonClass: string;
        container: any;
        defaultViewDate: number;
        maxDate: any;
        minDate: any;
    } & {
        language: any;
        locale: any;
        format: any;
        pickLevel: any;
        minDate: any;
        maxDate: any;
        datesDisabled: any;
        checkDisabled(timeValue: any, viewId: any): any;
        defaultViewDate: any;
        daysOfWeekDisabled: any;
        daysOfWeekHighlighted: any;
        weekNumbers: any;
        getWeekNumber: (timeValue: any, startOfWeek: any) => any;
        maxNumberOfDates: number;
        multidate: boolean;
        dateDelimiter: string;
        maxView: any;
        startView: any;
        prevArrow: NodeListOf<ChildNode>;
        nextArrow: NodeListOf<ChildNode>;
        disableTouchKeyboard: boolean;
        orientation: {
            x: any;
            y: any;
        };
        pickTime: boolean;
        minuteStep: number;
        timeSliderScale: boolean;
        todayButtonMode: any;
    };
    inputField: HTMLElement;
    rangepicker: any;
    rangeSideIndex: any;
    _options: import("./types.js").DatepickerOptions;
    picker: Picker;
    /**
     * @type {Boolean} - Whether the picker element is shown. `true` when shown
     */
    get active(): boolean;
    /**
     * @type {HTMLDivElement} - DOM object of picker element
     */
    get pickerElement(): HTMLDivElement;
    /**
     * Set new values to the config options
     * @param {import('./types.js').DatepickerOptions} options - config options to update
     */
    setOptions(options: import("./types.js").DatepickerOptions): void;
    /**
     * Show the picker element
     */
    show(): void;
    _showing: boolean;
    /**
     * Hide the picker element
     * Not available on inline picker
     */
    hide(): void;
    /**
     * Toggle the display of the picker element
     * Not available on inline picker
     *
     * Unlike hide(), the picker does not return to the start view when hiding.
     */
    toggle(): void;
    /**
     * Destroy the Datepicker instance
     * @return {Detepicker} - the instance destroyed
     */
    destroy(): Detepicker;
    /**
     * Get the selected date(s)
     *
     * The method returns a Date object of selected date by default, and returns
     * an array of selected dates in multidate mode. If format string is passed,
     * it returns date string(s) formatted in given format.
     *
     * @param  {String} [format] - format string to stringify the date(s)
     * @return {Date|String|Date[]|String[]} - selected date(s), or if none is
     * selected, empty array in multidate mode and undefined in sigledate mode
     */
    getDate(format?: string): Date | string | Date[] | string[];
    /**
     * Set selected date(s)
     *
     * In multidate mode, you can pass multiple dates as a series of arguments
     * or an array. (Since each date is parsed individually, the type of the
     * dates doesn't have to be the same.)
     * The given dates are used to toggle the select status of each date. The
     * number of selected dates is kept from exceeding the length set to
     * maxNumberOfDates.
     *
     * With clear: true option, the method can be used to clear the selection
     * and to replace the selection instead of toggling in multidate mode.
     * If the option is passed with no date arguments or an empty dates array,
     * it works as "clear" (clear the selection then set nothing), and if the
     * option is passed with new dates to select, it works as "replace" (clear
     * the selection then set the given dates)
     *
     * When render: false option is used, the method omits re-rendering the
     * picker element. In this case, you need to call refresh() method later in
     * order for the picker element to reflect the changes. The input field is
     * refreshed always regardless of this option.
     *
     * When invalid (unparsable, repeated, disabled or out-of-range) dates are
     * passed, the method ignores them and applies only valid ones. In the case
     * that all the given dates are invalid, which is distinguished from passing
     * no dates, the method considers it as an error and leaves the selection
     * untouched. (The input field also remains untouched unless revert: true
     * option is used.)
     * Replacing the selection with the same date(s) also causes a similar
     * situation. In both cases, the method does not refresh the picker element
     * unless forceRefresh: true option is used.
     *
     * If viewDate option is used, the method changes the focused date to the
     * specified date instead of the last item of the selection.
     *
     * @param {...(import('./types.js').DateLike | import('./types.js').DatepickerSetDateOptions)} dates - Date strings, Date
     * objects, time values, an options object, or a mix of those for new selection
     * - clear: {boolean} - Whether to clear the existing selection
     *     default: false
     * - render: {boolean} - Whether to re-render the picker element
     *     default: true
     * - autohide: {boolean} - Whether to hide the picker element after re-render
     *     Ignored when used with render: false
     *     default: config.autohide
     * - revert: {boolean} - Whether to refresh the input field when all the
     *     passed dates are invalid
     *     default: false
     * - forceRefresh: {boolean} - Whether to refresh the picker element when
     *     passed dates don't change the existing selection
     *     default: false
     * - viewDate: {Date|Number|String} - Date to be focused after setiing date(s)
     *     default: The last item of the resulting selection, or defaultViewDate
     *     config option if none is selected
     */
    setDate(...args: any[]): void;
    /**
     * Update the selected date(s) with input field's value
     * Not available on inline picker
     *
     * The input field will be refreshed with properly formatted date string.
     *
     * In the case that all the entered dates are invalid (unparsable, repeated,
     * disabled or out-of-range), which is distinguished from empty input field,
     * the method leaves the input field untouched as well as the selection by
     * default. If revert: true option is used in this case, the input field is
     * refreshed with the existing selection.
     * The method also doesn't refresh the picker element in this case and when
     * the entered dates are the same as the existing selection. If
     * forceRefresh: true option is used, the picker element is refreshed in
     * these cases too.
     *
     * @param  {import('./types.js').DatepickerSetDateOptions} [options] - function options
     * - autohide: {boolean} - whether to hide the picker element after refresh
     *     default: false
     * - revert: {boolean} - Whether to refresh the input field when all the
     *     passed dates are invalid
     *     default: false
     * - forceRefresh: {boolean} - Whether to refresh the picer element when
     *     input field's value doesn't change the existing selection
     *     default: false
     */
    update(options?: import("./types.js").DatepickerSetDateOptions): void;
    /**
     * Get the focused date
     *
     * The method returns a Date object of focused date by default. If format
     * string is passed, it returns date string formatted in given format.
     *
     * @param  {String} [format] - format string to stringify the date
     * @return {Date|String} - focused date (viewDate)
     */
    getFocusedDate(format?: string): Date | string;
    /**
     * Set focused date
     *
     * By default, the method updates the focus on the view shown at the time,
     * or the one set to the startView config option if the picker is hidden.
     * When resetView: true is passed, the view displayed is changed to the
     * pickLevel config option's if the picker is shown.
     *
     * @param {Date|Number|String} viewDate - date string, Date object, time
     * values of the date to focus
     * @param {Boolean} [resetView] - whether to change the view to pickLevel
     * config option's when the picker is shown. Ignored when the picker is
     * hidden
     */
    setFocusedDate(viewDate: Date | number | string, resetView?: boolean): void;
    /**
     * Refresh the picker element and the associated input field
     * @param {String} [target] - target item when refreshing one item only
     * 'picker' or 'input'
     * @param {Boolean} [forceRender] - whether to re-render the picker element
     * regardless of its state instead of optimized refresh
     */
    refresh(target?: string, forceRender?: boolean): void;
    /**
     * Enter edit mode
     * Not available on inline picker or when the picker element is hidden
     */
    enterEditMode(): void;
    editMode: boolean;
    /**
     * Exit from edit mode
     * Not available on inline picker
     * @param  {{update?: boolean, autohide?: boolean}} [options] - function options
     * - update: {boolean} - whether to call update() after exiting
     *     If false, input field is revert to the existing selection
     *     default: false
     */
    exitEditMode(options?: {
        update?: boolean;
        autohide?: boolean;
    }): void;
}
import Picker from './picker/Picker.js';
