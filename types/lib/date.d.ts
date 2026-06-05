export function stripTime(timeValue: any): number;
export function today(): number;
export function dateValue(...args: any[]): number;
export function addDays(date: any, amount: any): number;
export function addWeeks(date: any, amount: any): number;
export function addMonths(date: any, amount: any): number;
export function addYears(date: any, amount: any): number;
export function dayOfTheWeekOf(baseDate: any, dayOfWeek: any, weekStart?: number): number;
export function getIsoWeek(date: any): number;
export function getWesternTradWeek(date: any): number;
export function getMidEasternWeek(date: any): number;
export function startOfYearPeriod(date: any, years: any): number;
export function computeTimeBounds(date: any, minDate: any, maxDate: any, step?: number): {
    hourMin: number;
    minuteMin: number;
    hourMax: number;
    minuteMax: number;
};
export function regularizeDate(date: any, timeSpan: any, useLastDate: any, keepTime?: boolean): any;
