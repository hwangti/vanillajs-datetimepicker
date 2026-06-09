# changelog

## 2.0.0

This is the first release of the **vanillajs-datetimepicker** fork. The package picks up where vanillajs-datepicker 1.3.4 left off and adds a time picker. See [Migration v1 → v2](docs/migration-v2.md) before upgrading.

### Breaking changes

- **Format token convention switched to Java/Moment style.** `M`/`MM` now mean numeric month, `MMM`/`MMMM` mean month name, and `m`/`mm` mean minute. The default `format` option is `'MM/dd/yyyy'` (was `'mm/dd/yyyy'`). Bundled locales have been migrated; custom locales and `format` strings in your code must be updated.

### New features

- **Time picker** — opt in with `pickTime: true` (default `false`). Renders 24-hour hour/minute controls (number input + range slider, kept in sync) below the calendar. Selected dates retain their hour and minute instead of being normalized to `00:00:00`.
- **`minuteStep` option** (default `1`) — step size for the minute slider/number input. Typed values that fall between steps are snapped to the nearest valid step.
- **`timeSliderScale` option** (default `true`) — shows small min/max captions at both ends of the hour/minute sliders. The captions track the selectable range of the selected day, narrowing together with the slider bounds near `minDate`/`maxDate`. Set `false` to hide them.
- **Hour/minute format tokens** — `H`/`HH` (24-hour) and `m`/`mm` (minute) for use with `pickTime`.
- **`hour` / `minute` / `now` locale fields** — `base-locales.js` provides `"Hour"` / `"Minute"` / `"Now"`; the `ko` locale ships with `시` / `분` / `지금`. Other locales fall back to English until contributed.
- **`DateRangePicker.setDates(start, end, options)`** — third argument is forwarded to each `datepicker.setDate()` call (e.g. `{render: false}`, `{viewDate: ...}`).
- **TypeScript types** — `.d.ts` files generated from JSDoc and shipped in the package. Option types reachable as `import type { DatepickerOptions } from '@hwangti/vanillajs-datetimepicker/types'`.

### Tweaks

- With `pickTime`, the today button (`todayButtonMode: 1`) now selects the current date **and time** ("now"), snapped to `minuteStep` and clamped into `minDate`/`maxDate`'s selectable range — instead of today at midnight. Its label switches to `locale.now` (`"Now"` / `지금`) accordingly; in focus mode (`todayButtonMode: 0`) or without `pickTime` it stays `locale.today`.
- `minDate`/`maxDate` handling is now day-granular where it should be: the boundary day's calendar cell, the today button, and arrow-key navigation stay available when only part of the day is restricted (e.g. `minDate: new Date()` with `pickTime`), and selecting a date by pressing Enter carries the time controls' value (clamped into the day's range) the same way clicking a day cell does. Without `pickTime`, any time portion of `minDate`/`maxDate` is stripped, restoring vanillajs-datepicker 1.x semantics (e.g. `minDate: new Date()` keeps today selectable).
- Time controls are shown only on the view where dates are actually picked (the days view by default) and are hidden while navigating the months/years/decades views.
- Time sliders visualize their steps with small dots on the track when there are fewer than 12 segments — e.g. the minute slider with `minuteStep: 5`/`15`, or the hour slider when `minDate`/`maxDate` narrows the day's range. Only the interior boundaries are drawn (the track's own ends act as the outer ones), and the visible track itself is painted across the thumb's travel range so every segment is visually equal while still matching the actual thumb stops. The dot color is customizable via the `$dp-time-slider-tick-color` Sass variable.
- Time picker rows are laid out on a shared 3-column grid (caption / number input / slider): the caption column sizes itself to the locale's longest label, so captions like "Minute" — or longer translations — are no longer clipped by the previously fixed-width column. The hour/minute number inputs are also narrower with deterministic sizing (`box-sizing: border-box`; new Sass variable `$dp-time-input-width`, default `2.25em`, was `3em`), and the sliders' UA default margin is reset so they line up exactly with the scale captions.
- Time controls now respect `minDate`/`maxDate`: the hour/minute inputs' and sliders' `min`/`max` attributes are narrowed to the selectable range of the selected day, so wheel/spinner/slider edits stop right at the boundary instead of being silently rejected. Directly-typed values are clamped into the range, clicking a day cell clamps the carried-over time into that day's range, and the controls always re-sync to the actual selection — which also fixes the hour input losing its zero-padding (`09` → `9`) when an edit used to be rejected.
- Time picker fields are now identifiable and named for browsers/assistive tech: the hour/minute number inputs get per-instance `id`s, and all four time controls (number inputs + sliders) are linked to the visible hour/minute captions via `aria-labelledby` (real `<label for>`s could end up nested inside the bound input's `<label>`, which is invalid HTML). Clears Chrome DevTools' "A form field element should have an id or name attribute" notices, and the controls' accessible names follow locale changes automatically.
- New Sass variable `$dp-cell-prevnext-opacity` softens the appearance of previous/next-month cells in the day grid.
- `DateRangePicker` no longer counts `<input>` elements inside the picker popup when discovering its bound inputs (`closest('.datepicker')` filter).
- `DaysView` initialization is guarded against the `DateRangePicker` `dates` getter not being defined yet (prevents a crash on first construction).

### Bug fixes

- `parseDate` now treats the ISO 8601 `T` as a date/time delimiter, so strings like `2026-06-18T23:35:38` parse correctly instead of folding the `T` into the day field (which rolled the hour past 24 and pushed the date forward a day). Only a `T` between two digits is treated as a separator, so textual day/month names that start with "T" (e.g. "Thursday") are left intact.

## 1.3.4

### Bug fix

- Fix - Datepicker custom events don't bubble (#157 - Thank you, @gucki)
- Fix - Focus doesn't move to the next field by pressing the tab key on the associated input field (#156)
- Fix - Picker is shown below the input field when the field is at the bottom edge of the document on recent version of Chromium-based browsers

## 1.3.3

### Changes

- Change bs5 scss to prevent compile error with bootstrap 5.3 (#146)

## 1.3.2

### Changes

- Add protection against fake `keydown` event with no `key` property triggered when autofill is performed on Chromium-based browsers (except Edge) (#144)

## 1.3.1

### Bug fix

- Fix - Rename WeekNumbersTemplate.js to weekNumbersTemplate.js to fix an error caused by the case mismatch between the path in `import` statement and actual file name (#136 - Thank you, @marc-mabe)

## 1.3.0

### New features

- Add `weekNumbers` option to add support for week numbering systems other than ISO 8601 (#90)
  - `calendarWeek` option is now deprecated in favor of `weekNumbers` 
- Add `enableOnReadonly` option (#98, #113)
- Add `shortcutKeys` option to change/disable some keyboard operations (#103, #119)
- Add `toggle()` API method
- Add `forceRefresh` to the method options of `setDate()` and `update()` API (#98)
- Add `viewDate` to the method options of `setDate()` API
- Add callback function support to `datesDisabled` option for rule-based disabling (#114, #127)
  - `enabled` property in the object returned by `beforeShowDay`/-`Month`/-`Year`/-`Decade` options and their returning a boolean are now deprecated, as they don't really prevent the date from being entered
- Add `getFocusedDate()` and `setFocusedDate()` API methods (#122)

### Bug fix

- Fix - today button doesn't respect `pickLevel`
- Fix - Esc keydown event bubbles up
- Fix - unable to scroll the screen by keeping the picker open on mobile screen (#95)
- Fix - native `change` event is not fired when input field loses focus (#39)

### Changes

- Change the timing to trigger the `changeMonth`/-`Year`/-`View` events to after updating the picker element (#42)
- Change keyboard operations to support inline picker when the bound element has the `tabindex` attribute
- Rename `clearBtn` and `todayBtn` options to `clearButton`, `todayButton` for naming consistency
  - `clearBtn` and `todayBtn` are now treated as a synonym of the corresponding one
  - The `...-bth` classes of the `<button>` elements in the picker are also renamed to `...-button`
    - The old `...-bth` classes remain on the elements for backward compatibility
- Revise stylesheets for better customizability in sizing
- Improve `View` classes (and some others)
- Include stylesheet paths in `package.json`'s `exports` field (#87)


## 1.2.0

### Breaking changes

- __node-sass is no longer supported.__
  - Since the use of `/` as a division operator is deprecated and warned by dart sass, all divide operations in sass stylesheets were rewritten with dart sass's `math.div()` function. As a result, the .scss files are no longer able to be compiled with node-sass.
  - Please replace your project's node-sass dependency with [sass](https://www.npmjs.com/package/sass).

### Potentially breaking changes

- __Edge Legacy (non-Chromium Edge) is no longer supported.__
  - Since Microsoft no longer supports it already and its market share is lower than IE, I decided not to add fallback code for Shadow DOM API.
  - If your program needs to support Edge Legacy, please use [Web Components polyfill](https://www.npmjs.com/package/@webcomponents/webcomponentsjs).
- __Date picker element is now inserted after the associated input element by default.__
  - The default value of the `container` option is changed to `null`.
  - If your program has the input element inside an element styled with `overflow` other than `visible` and the element doesn't have enough space, the picker will be clipped.
  - If you need the previous version's behavior to avoid it, please set `'body'` to the container option,
  - The purpose of this change is to make z-index adjustment in cases like #50 basically unneeded.
  - This change doesn't apply for inline picker.

### New features

- Add Bootstrap 5 support (#37, #73)
- Add Web Components support (#83)
  - `container` option now accepts HTMLElement instance.

### Bug fix

- Fix #56 — `minDate`/`maxDate` aren't set to the start/end of month/year when pickLevel > 0 and either format or passed date string doesn't contain the date part.
  - The same fix is applied to `datesDisabled` as well
- Fix — picker doesn't hide on unfocus if a date outside the minDate/maxDate range is entered to the input field.
- Fix — `disableTouchKeyboard` doesn't work
- Fix — picker doesn't hide on click outside after input is unfocused by closing mobile keyboard (maybe related to #72?)
- Fix — picker is placed incorrectly when container is user-specified element. (related to #81)

### Changes

- Change the default placement of `orientation: 'auto'` to bottom-left (#54, #82)
- Replace out-of-date dev dependencies: node-sass, uglyfy-es → dart-sass, terser (#76)
- Deprecate `disableTouchKeyboard` option. (#78)
- Change the way to Keep input element focused when clicking picker in order to prevent flicker (#85)
  - The change also adds capability for users to extend the picker (see #4 in [this comment](https://github.com/mymth/vanillajs-datepicker/issues/85#issuecomment-966604223) - Thank you, @xdev1)  
- Remove keydown event cancellation except arrow keys' preventDefault (#88)
- Apply the bootstrap-datepicker's locale updates
- Revise container's functionality
  - Not used internally for position calculation, only for users to control stacking context.
  - No changes for inline picker


## 1.1.4

### Changes

- Change `datepicer.show()` to move the focus to the input field if it's not focused
  - Fix #52 — picker shown by calling show() doesn't hide by clicking outside

## 1.1.3

### Bug fixes

- Fix #51 - TypeError occurs when initial dates are set in the input filed in multidate mode

## 1.1.2

### Bug fixes

- Fix #48 — inline picker submits form by click on prev/next buttons
- Fix — date with the name of 30-day month is parsed incorrectly if the current date is the 31st

## 1.1.1

### Bug fixes

- Fix #46 — date range picker cannot be created when using datepicker-full.min.js
- Fix #45 - onClickOutside listener calls unfocus() when the input field is not focused

## 1.1.0

### New features

- Add `updateOnBlur` option (#13)
- Add `showOnClick` option (#21)
    - Along with this, picker element's click handler is changed to keep the focus on input field after auto-hiding on date selection
- Add `pickLevel` option (#22, #23)
    - minView feature + comprehensive control on date picking level that works with edit on input field and `setDate()` call as well
- Add optional `forceRender` argument to `refresh()`API
- Add `setDates()` API to DateRangePicker (#27)
- Add support for package entry points 

### Bug fixes

- Fix #33 — the view doesn't go back to the days view after changing the selection by other than mouse operation

### Changes

- Change the edit mode so that it no longer discards unparsed changes when exiting
- Add shift + arrow key to the key patterns to enter the edit mode
- Make range highlight between range-start and -end available on all views as well as the days view
- Revise the cross reference between DateRangePicker and Datepicker instances to make it securely usable in custom event handler, etc.
- Improve readability of selected date in previous/next month area in the calendar


## 1.0.3

- Fix #24 — change event was fired inappropriately through setDate() API call 

## 1.0.2

- Fix #11, #17, #19 — calendar wasn't redrawn properly in some conditions
- Fix #3 — keyboard showed up by clicking on a calendar element when disableTouchKeyboard = true

## 1.0.1

- Add stylesheet for Foundation
- Add support for importing js by package name (For rollup, webpack)

## 1.0

First release
