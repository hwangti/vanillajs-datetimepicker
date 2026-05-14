# Date String & Format

## Date format

Date format must be declared using the combination of the predefined tokens and separators.

**– Tokens:**

Token | Description | Example
--|--|--
`d` | day of the month without leading zero | 1, 2, ..., 31
`dd` |  day of the month with leading zero | 01, 02, ..., 31
`D` | shortened day name of the week | Sun, Mon, ..., Sat
`DD` | full day name of the week | Sunday, Monday, ..., Saturday
`M` | numeric month without leading zero | 1, 2, ..., 12
`MM` | numeric month with leading zero | 01, 02, ..., 12
`MMM` | shortened month name | Jan, Feb, ..., Dec
`MMMM` | full month name | January, February, ..., December
`y` | year without leading zero | 1, 645, 1900, 2020
`yy` | 2-digit year with leading zero<br> *(format only, see the notes)* | 01, 45, 00, 20
`yyyy` | 4-digit year with leading zero | 0001, 0645, 1900, 2020
`H` | hour (24-hour) without leading zero<br> *(only when [`pickTime`](options?id=picktime) is on)* | 0, 1, ..., 23
`HH` | hour (24-hour) with leading zero<br> *(only when [`pickTime`](options?id=picktime) is on)* | 00, 01, ..., 23
`m` | minute without leading zero<br> *(only when [`pickTime`](options?id=picktime) is on)* | 0, 1, ..., 59
`mm` | minute with leading zero<br> *(only when [`pickTime`](options?id=picktime) is on)* | 00, 01, ..., 59

> **Heads-up for users coming from vanillajs-datepicker 1.x or bootstrap-datepicker:**
> Token semantics follow the Java/Moment convention now. `M`/`MM` mean **numeric month**, `MMM`/`MMMM` mean **month name**, and `m`/`mm` mean **minute**. See the [Migration Guide](migration-v2.md) for details.

**– Separators:**

All printable ASCII characters other than numbers and alphabets, plus `年`, `月`, `日`, `時` and `分`

**Notes**

- Since the built-in parser extracts the parts of the date by splitting the string with the separators, formats without separators (e.g. `yyyymmdd`) are not supported.
- 2-digit year (`yy`) is only supported by the built-in formatter, not by the built-in parser. Because of this, it cannot be used in the format string for the [`format`](options?id=format) config option.
> You can write your custom parser/formatter to handle arbitrary format including the above. See [`format`](options?id=format) config option for the details.
> 
> The built-in parser/formatter can be used inside your custom parser/formatter by calling [`Datepicker.parsedate()`](api?id=datepickerparsedate)/[`Datepicker.formatdate()`](api?id=datepickerformatdate).

- Date format must not include the string set in the [`dateDelimiter`](options?id=datedelimiter) config option.

## Date string

Date strings are expected to be formatted in the date format set in the [`format`](options?id=format) config option (default: `MM/dd/yyyy`), but it isn't necessary to match the format strictly.

##### How Built-in Parser parses

The built-in parser uses the format string only to determine the sequence in which the date parts (year/month/day/day-of-the-week) and separators appear in the date string. The differences in separator characters, whether to have leading zeros and whether month name (full or short) or month number is used are ignored. Therefore, as long as the parts of a date string appear in the same order as the format's, the variations of the same date's date string are equally parsed to the same date. 

There are some cases the parser treats the parts in specific way:
- year is treated as full year _(1-/2-digit years are not mapped to nearby century's)_
- month number not between 1 and 12 is treated in the similar way to [`Date.prototype.setMonth()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setMonth)
- month name is evaluated in case-insensitive begin-with match
- day not between 1 and last-day-of-the-month is treated in the same way as [`Date.prototype.setDate()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setDate)
- day-of-the-week is not evaluated _(not totally ignored, the existence is respected)_
- if a part is omitted from the format, missing in the date string or parsed unsuccessfully, current date's value is used to complement.

Here are some examples of how irregular date strings are parsed.

- Different separators from the format:  
  - if format is `yyyy-MM-dd`, `2020/04/22` ⟹ _April 22nd, 2020_
  - if format is `M.d.y`, `1/15 (2018)` ⟹ _January 15th, 2018_
- With/without leading zeros:  
  - if format is `d/M/y`, `05/06/07` ⟹ _June 5th, 0007_
  - if format is `yyyy-MM-dd`, `20-5-4` ⟹ _May 4th, 0020_
- Number for the month name:  
  - if format is `MMM-d-y`, `7-14-2020` ⟹ _July 14th, 2020_
- Incomplete month name/full name for short name:  
  - if format is `MMM-d-y`,
    - `ap-22-2020` ⟹ _April 22nd, 2020_
    - `sept-22-2020` ⟹ _September 22nd, 2020_
    - `Ju-4-2020` ⟹ _June 4th, 2020_
    - `July-4-2020` ⟹ _July 4th, 2020_
- Month/day outside the normal range:  
  - if format is `MM/dd/yyyy`,
    - `14/31/2019` ⟹ _March 2nd, 2020_
    - `0/0/2020` ⟹ _November 30th, 2019_
- Omitted/missing/invalid parts:  
  - if format is `MM/yyyy` and current date is _January 15th, 2020_,
    - `04/2022` ⟹ _April 15th, 2022_
  - if format is `M/d/y` and current date is _January 15th, 2020_,
    - `4/22` ⟹ _April 22nd, 2020_
    - `/22/2016` ⟹ _January 22nd, 2016_
    - `7/xx/2016` ⟹ _July 15th, 2016_
- Day-of-the-week:
  - if format is `D M/d y` and current date is _January 15th, 2020_,
    - `xx 5/4 2022` ⟹ _May 4th, 2022_
    - `5/4 2022` ⟹ _October 13th, 2025 (= April 2022nd, 2020)_
- Date with time (when [`pickTime`](options?id=picktime) is on):
  - if format is `yyyy-MM-dd HH:mm`, `2024-03-15 09:30` ⟹ _March 15th, 2024 09:30_

##### 'Today' shortcut

You can use `'today'` as a shortcut to the current date.

##### Multiple dates

You can combine multiple dates into a single date string by joining the dates with the delimiter set in the [dateDelimiter](options?id=datedelimiter) config option.
