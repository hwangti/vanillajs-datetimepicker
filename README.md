# vanillajs-datetimepicker

A fork of [vanillajs-datepicker](https://github.com/mymth/vanillajs-datepicker) that adds **time-picker support** (`pickTime`, `minuteStep`) and switches the format-token convention to the Java/Moment style. Written from scratch as ECMAScript modules / [Sass](https://sass-lang.com) stylesheets, with pre-built JS/CSS for direct browser use.

It can work either standalone or with a CSS framework (e.g. [Bootstrap](https://getbootstrap.com), [Foundation](https://get.foundation)), and works best with [Bulma](https://bulma.io) — for which it was originally developed.

## What's different from vanillajs-datepicker

- **Time picker** — opt-in via `pickTime: true`, with optional `minuteStep`. Renders 24-hour hour/minute controls (number input + range slider, with min/max scale captions toggleable via `timeSliderScale`) below the calendar; selected dates retain their hour and minute. The controls respect the time portion of `minDate`/`maxDate` and appear only on the days view.
- **Java/Moment format tokens** — `M`/`MM` are numeric month, `MMM`/`MMMM` are month name, `m`/`mm` are minute, `H`/`HH` are 24-hour hour. **This is a breaking change vs. vanillajs-datepicker / bootstrap-datepicker.** See the [Migration Guide](https://github.com/hwangti/vanillajs-datetimepicker/blob/master/docs/migration-v2.md).
- **TypeScript types** — `.d.ts` files are generated from JSDoc and shipped in the package; no extra `@types/*` install needed.
- **Misc fork tweaks** — softened prev/next-month cell opacity (`$dp-cell-prevnext-opacity` Sass var), a couple of timepicker UX fixes, `DateRangePicker.setDates(start, end, options)` third argument forwarded to each datepicker.

## Install

```sh
npm install @hwangti/vanillajs-datetimepicker
```

## Usage

### Date only (default)

```js
import { Datepicker } from '@hwangti/vanillajs-datetimepicker';

const input = document.querySelector('#date');
new Datepicker(input, { format: 'yyyy-MM-dd' });
```

### Date + time

```js
import { Datepicker } from '@hwangti/vanillajs-datetimepicker';

new Datepicker(document.querySelector('#datetime'), {
  format: 'yyyy-MM-dd HH:mm',
  pickTime: true,
  minuteStep: 15,
});
```

### Date range with time

```js
import { DateRangePicker } from '@hwangti/vanillajs-datetimepicker';

const wrap = document.querySelector('#range');
new DateRangePicker(wrap, {
  format: 'yyyy-MM-dd HH:mm',
  pickTime: true,
  minuteStep: 5,
});
```

### TypeScript

Type definitions are bundled. The option types are also reachable as a separate import if you need to type your own variables.

```ts
import { Datepicker } from '@hwangti/vanillajs-datetimepicker';
import type { DatepickerOptions } from '@hwangti/vanillajs-datetimepicker/types';

const opts: DatepickerOptions = {
  format: 'yyyy-MM-dd HH:mm',
  pickTime: true,
  minuteStep: 15,
};
```

## Features

- Date picker (input-dropdown, inline), date range picker
- **Time picker (24-hour) with configurable minute step**
- Keyboard operation (arrow-key navigation, in-place input editing)
- i18n (locales, CSS-based text direction detection)
- Easy CSS-framework adaptation via Sass entry points
- Dependency-free
- Modern-browser only — no IE / Edge Legacy
- Lightweight — ~35 kB minified, ~11 kB gzipped

## Demo

- [`demo/time-picker.html`](./demo/time-picker.html) — time picker walkthrough
- [`demo/index.html`](./demo/index.html) — original feature demo

## Documentation

The docs site (docsify) is in [`docs/`](./docs). Key pages:

- [Overview](./docs/overview.md)
- [Options](./docs/options.md) — including [`pickTime`](./docs/options.md#pickTime) and [`minuteStep`](./docs/options.md#minuteStep)
- [API](./docs/api.md)
- [Date String & Format](./docs/date-string+format.md)
- [Migration v1 → v2](./docs/migration-v2.md)

## Credits

This package is a fork of [vanillajs-datepicker](https://github.com/mymth/vanillajs-datepicker) by Hidenao Miyamoto, which itself reimagines [bootstrap-datepicker](https://github.com/uxsolutions/bootstrap-datepicker). All upstream design and the bulk of the calendar implementation are theirs.

## License

- [MIT](./LICENSE)
