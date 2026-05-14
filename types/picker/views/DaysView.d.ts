export default class DaysView extends View {
    constructor(picker: any);
    init(options: any, onConstruction?: boolean): void;
    dow: ChildNode;
    grid: ChildNode;
    setOptions(options: any): void;
    minDate: any;
    maxDate: any;
    checkDisabled: any;
    daysOfWeekDisabled: any;
    daysOfWeekHighlighted: any;
    todayHighlight: any;
    weekStart: any;
    weekEnd: any;
    locale: any;
    dayNames: any;
    switchLabelFormat: any;
    beforeShow: any;
    weekNumbers: {
        element: ChildNode;
        dow: ChildNode;
        weeks: ChildNode;
    };
    getWeekNumber: any;
    updateFocus(): void;
    first: number;
    last: number;
    start: number;
    focused: any;
    updateSelection(): void;
    selected: any;
    range: any;
    render(): void;
    today: number;
    refresh(): void;
    refreshFocus(): void;
}
import View from './View.js';
