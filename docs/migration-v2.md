# Migration Guide — 1.x → 2.0

vanillajs-datetimepicker 2.0 inherits from vanillajs-datepicker 1.x and adds time-picker support. To make room for hour/minute tokens and to align with widely used libraries (Java `SimpleDateFormat`, Moment.js, Day.js), the format-token convention has changed. **This is a breaking change.** Read through this page before upgrading any production code.

## TL;DR

- `m` / `mm` no longer mean *month*. They now mean **minute**.
- `M` / `MM` now mean **numeric month** (what `m` / `mm` used to mean).
- Month names are now `MMM` (short) / `MMMM` (full) — they used to be `M` / `MM`.
- New tokens: `H` / `HH` for hour (24-hour), `m` / `mm` for minute.
- The default `format` option changed from `'mm/dd/yyyy'` to `'MM/dd/yyyy'`.
- Time picking is opt-in via the new [`pickTime`](options?id=picktime) option (default `false`), so unless you set it, the picker behaves the same as 1.x except for the token rename.

## Token mapping

| 1.x token | 1.x meaning | 2.0 token | 2.0 meaning |
|-----------|-------------|-----------|-------------|
| `m`       | numeric month (1–12) | `M` | numeric month (1–12) |
| `mm`      | numeric month (01–12) | `MM` | numeric month (01–12) |
| `M`       | short month name (Jan, Feb, …) | `MMM` | short month name |
| `MM`      | full month name (January, …) | `MMMM` | full month name |
| `m` (new) | — | `m` | minute (0–59) |
| `mm` (new)| — | `mm` | minute (00–59) |
| `H` (new) | — | `H` | hour, 24-hour (0–23) |
| `HH` (new)| — | `HH` | hour, 24-hour (00–23) |

`d`, `dd`, `D`, `DD`, `y`, `yy`, `yyyy` are unchanged.

## What you need to do

### 1. Rewrite every `format` string in your code

Search your codebase for `format:` options, `Datepicker.formatDate(...)` and `Datepicker.parseDate(...)` calls, and rename tokens.

```diff
- new Datepicker(el, { format: 'mm/dd/yyyy' });
+ new Datepicker(el, { format: 'MM/dd/yyyy' });

- new Datepicker(el, { format: 'M dd, yyyy' });   // "Jan 05, 2024"
+ new Datepicker(el, { format: 'MMM dd, yyyy' });

- Datepicker.formatDate(d, 'yyyy-mm-dd');
+ Datepicker.formatDate(d, 'yyyy-MM-dd');
```

A regex sweep that finds the substring `mm` inside quoted format strings will catch most cases, but review each match — `MM` is now valid as numeric month and you will see false positives.

### 2. Audit custom locales

If you ship custom locales or override the default one, update their `format` and `titleFormat` fields. The bundled locales have already been migrated.

```diff
{
- format: 'd. m. yyyy',
+ format: 'd. M. yyyy',
- titleFormat: "MM yyyy"
+ titleFormat: "MMMM yyyy"
}
```

### 3. (Optional) Opt in to the time picker

Time-picking is off by default. To enable it:

```js
new Datepicker(input, {
  pickTime: true,
  minuteStep: 15,            // optional, default 1
  format: 'yyyy-MM-dd HH:mm' // include H/HH and m/mm in the format
});
```

See the [`pickTime`](options?id=picktime) and [`minuteStep`](options?id=minutestep) options for details.

## What did *not* change

- Public API surface (`Datepicker`, `DateRangePicker`, all events and methods).
- Behavior when `pickTime` is `false` (i.e. the default). Stored values are still date-only (time stripped to `00:00:00`).
- Bundled CSS/SCSS class names.
- Locale package layout.

## Why the change?

vanillajs-datepicker inherited its token convention from bootstrap-datepicker, where `m`/`mm` meant month. That convention is incompatible with adding minute tokens, and it conflicts with the convention used by Java's `SimpleDateFormat`, Moment.js, Day.js, date-fns, and most server-side date libraries. Aligning with the mainstream convention up front avoids a second breaking change later when more time tokens (seconds, AM/PM, 12-hour) are introduced.
