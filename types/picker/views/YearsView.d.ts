export default class YearsView extends View {
    init(options: any, onConstruction?: boolean): void;
    navStep: number;
    beforeShowOption: string;
    grid: any;
    setOptions(options: any): void;
    minYear: number;
    minDate: any;
    maxYear: number;
    maxDate: any;
    checkDisabled: any;
    beforeShow: any;
    updateFocus(): void;
    first: number;
    last: number;
    start: number;
    focused: number;
    updateSelection(): void;
    selected: any;
    range: any;
    render(): void;
    refresh(): void;
    refreshFocus(): void;
}
import View from './View.js';
