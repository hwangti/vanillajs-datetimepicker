export default class MonthsView extends View {
    constructor(picker: any);
    init(options: any, onConstruction?: boolean): void;
    grid: any;
    first: number;
    last: number;
    setOptions(options: any): void;
    monthNames: any;
    minYear: number;
    minMonth: number;
    minDate: number;
    maxYear: number;
    maxMonth: any;
    maxDate: any;
    checkDisabled: any;
    beforeShow: any;
    updateFocus(): void;
    year: number;
    focused: number;
    updateSelection(): void;
    selected: any;
    range: any;
    render(): void;
    refresh(): void;
    refreshFocus(): void;
}
import View from './View.js';
