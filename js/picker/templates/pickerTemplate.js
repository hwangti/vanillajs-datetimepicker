import {optimizeTemplateHTML} from '../../lib/utils.js';

const getButtons = buttonList => buttonList
  .map(classes => `<button type="button" class="%buttonClass% ${classes}" tabindex="-1"></button>`)
  .join('');

export default optimizeTemplateHTML(`<div class="datepicker">
  <div class="datepicker-picker">
    <div class="datepicker-header">
      <div class="datepicker-title"></div>
      <div class="datepicker-controls">
        ${getButtons([
          'prev-button prev-btn',
          'view-switch',
          'next-button next-btn',
        ])}
      </div>
    </div>
    <div class="datepicker-main"></div>
    <div class="datepicker-footer">
      <div class="datepicker-time" style="display:none">
        <div class="datepicker-time-row">
          <span class="datepicker-time-label datepicker-time-hour-label"></span>
          <input type="number" class="datepicker-time-hour" min="0" max="23" step="1" tabindex="-1">
          <input type="range" class="datepicker-time-hour-slider" min="0" max="23" step="1" tabindex="-1">
        </div>
        <div class="datepicker-time-row">
          <span class="datepicker-time-label datepicker-time-minute-label"></span>
          <input type="number" class="datepicker-time-minute" min="0" max="59" step="1" tabindex="-1">
          <input type="range" class="datepicker-time-minute-slider" min="0" max="59" step="1" tabindex="-1">
        </div>
      </div>
      <div class="datepicker-controls">
        ${getButtons([
          'today-button today-btn',
          'clear-button clear-btn',
        ])}
      </div>
    </div>
  </div>
</div>`);
