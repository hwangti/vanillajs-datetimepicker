export default class View {
    constructor(picker: any, config: any);
    init(options: any): void;
    isMinView: boolean;
    prepareForRender(switchLabel: any, prevButtonDisabled: any, nextButtonDisabled: any): void;
    disabled: any[];
    setDisabled(date: any, classList: any): void;
    performBeforeHook(el: any, timeValue: any): void;
    renderCell(el: any, content: any, cellVal: any, date: any, { selected, range }: {
        selected: any;
        range: any;
    }, outOfScope: any, extraClasses?: any[]): void;
    refreshCell(el: any, cellVal: any, selected: any, [rangeStart, rangeEnd]: [any, any]): void;
    changeFocusedCell(cellIndex: any): void;
}
