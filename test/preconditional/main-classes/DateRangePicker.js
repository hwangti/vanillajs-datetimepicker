import '../_setup.js';
import DateRangePicker from '../../../js/DateRangePicker.js';
import {parseHTML} from '../../../js/lib/dom.js';
// to spy constructor with sinon, import entire module
// @see: https://github.com/sinonjs/sinon/issues/1358#issuecomment-391643741
import * as DP from '../../../js/Datepicker.js';
const Datepicker = DP.default;

describe('DateRangePicker', function () {
  let elem;
  let input0;
  let input1;

  beforeEach(function () {
    elem = parseHTML('<div><input><input></div>').firstChild;
    [input0, input1] = elem.children;
    testContainer.appendChild(elem);
  });

  afterEach(function () {
    document.querySelectorAll('.datepicker').forEach((el) => {
      el.parentElement.removeChild(el);
    });
    delete input0.datepicker;
    delete input1.datepicker;
    delete elem.rangepicker;
    testContainer.removeChild(elem);
  });

  describe('constructor', function () {
    it('attaches the created instance to the bound element', function () {
      const drp = new DateRangePicker(elem);
      expect(elem.rangepicker, 'to be', drp);
    });

    it('configures the instance with the default values', function () {
      let drp = new DateRangePicker(elem);
      expect(drp.allowOneSidedRange, 'to be false');
    });

    it('creates datepicker for the inputs passing rangepicker and given options expect', function () {
      let drp = new DateRangePicker(elem);

      expect(input0.datepicker, 'to be a', Datepicker);
      expect(input1.datepicker, 'to be a', Datepicker);
      expect(input0.datepicker._options, 'to equal', {});
      expect(input1.datepicker._options, 'to equal', {});
      expect(input0.datepicker.rangepicker, 'to be', drp);
      expect(input1.datepicker.rangepicker, 'to be', drp);

      expect(drp.inputs, 'to equal', [input0, input1]);
      expect(drp.datepickers, 'to equal', [input0.datepicker, input1.datepicker]);

      delete input0.datepicker;
      delete input1.datepicker;
      delete elem.rangepicker;

      const fakeOptions = {foo: 123, bar: 456};
      drp = new DateRangePicker(elem, fakeOptions);

      expect(input0.datepicker._options, 'to equal', fakeOptions);
      expect(input1.datepicker._options, 'to equal', fakeOptions);
    });

    it('makes inputs, datepickers properties immutable', function () {
      const drp = new DateRangePicker(elem);

      expect(() => { drp.inputs[0] = null; }, 'to throw a', TypeError);
      expect(() => { drp.inputs[2] = {}; }, 'to throw a', TypeError);

      expect(() => { drp.datepickers[0] = null; }, 'to throw a', TypeError);
      expect(() => { drp.datepickers[2] = {}; }, 'to throw a', TypeError);
    });

    it('excludes inputs, allowOneSidedRange and maxNumberOfDates from options to pass Datepicker container', function () {
      new DateRangePicker(elem, {
        inputs: [input0, input1],
        allowOneSidedRange: false,
        maxNumberOfDates: 2,
        foo: 123,
      });

      expect(input0.datepicker._options, 'to equal', {foo: 123});
    });

    it('works with arbitrary input elements if they are provided in the inputs option', function () {
      const outsideEl = document.createElement('div');
      const drp = new DateRangePicker(outsideEl, {inputs: [input0, input1]});

      expect(outsideEl.rangepicker, 'to be', drp);
      expect(input0.datepicker.rangepicker, 'to be', drp);
      expect(input1.datepicker.rangepicker, 'to be', drp);
      expect([input0.datepicker, input1.datepicker], 'to equal', drp.datepickers);
    });

    it('inserts datepicker elements after the associated input elements)', function () {
      new DateRangePicker(elem);

      const dpElems = document.querySelectorAll('.datepicker');
      expect(dpElems.length, 'to be', 2);

      const index = [input0, input1].indexOf(dpElems[0].previousElementSibling);
      expect(index, 'to be one of', [0, 1]);
      expect(dpElems[1].previousElementSibling, 'to be', index === 1 ? input0 : input1);
    });

    it('does not add the active class to the picker elements', function () {
      new DateRangePicker(elem);

      const dpElems = Array.from(document.querySelectorAll('.datepicker'));
      expect(dpElems.filter(el => el.classList.contains('active')), 'to be empty');
    });

    it('does nothing but creating an instance if number of inputs < 2', function () {
      elem.removeChild(input1);

      let drp = new DateRangePicker(elem);
      expect(elem, 'not to have property', 'rangepicker');
      expect(drp, 'not to have properties', ['inputs', 'datepickers']);
      expect(input0, 'not to have property', 'datepicker');
      expect(document.querySelectorAll('.datepicker').length, 'to be', 0);

      const outsideEl = document.createElement('div');
      drp = new DateRangePicker(outsideEl, {inputs: [input0]});
      expect(outsideEl, 'not to have property', 'rangepicker');
      expect(input0, 'not to have property', 'datepicker');
      expect(document.querySelectorAll('.datepicker').length, 'to be', 0);
    });
  });

  describe('destroy()', function () {
    let drp;
    let spyDestroy0;
    let spyDestroy1;

    beforeEach(function () {
      drp = new DateRangePicker(elem);
      spyDestroy0 = sinon.spy(input0.datepicker, 'destroy');
      spyDestroy1 = sinon.spy(input1.datepicker, 'destroy');
    });

    afterEach(function () {
      spyDestroy0.restore();
      spyDestroy1.restore();
    });

    it('calls destroy() of each datepickers', function () {
      drp.destroy();
      expect(spyDestroy0.called, 'to be true');
      expect(spyDestroy1.called, 'to be true');
    });

    it('removes the instance from the bound element', function () {
      drp.destroy();
      expect(Object.prototype.hasOwnProperty.call(elem, 'rangepicker'), 'to be false');
    });
  });

  describe('dates property', function () {
    it('contains the array of the inputs\' selected dates', function () {
      const drp = new DateRangePicker(elem);
      expect(drp.dates, 'to equal', [undefined, undefined]);

      const date0 = new Date(2020, 3, 20).setHours(0, 0, 0, 0);
      const date1 = new Date(2020, 3, 22).setHours(0, 0, 0, 0);
      drp.datepickers[0].dates = [date0];
      drp.datepickers[1].dates = [date1];
      expect(drp.dates, 'to equal', [date0, date1]);
    });
  });

  describe('setOptions()', function () {
    it('updates allowOneSidedRange but ignores inputs if they are in the given options', function () {
      const input2 = document.createElement('input');
      const drp = new DateRangePicker(elem);

      drp.setOptions({allowOneSidedRange: true, inputs: [input2, input0]});
      expect(drp.allowOneSidedRange, 'to be true');
      expect(drp.inputs, 'to equal', [input0, input1]);
    });

    it('calls each datepicker\'s setOptions() with given options except inputs, allowOneSidedRange and maxNumberOfDates', function () {
      const drp = new DateRangePicker(elem);
      const stubDP0SetOptions = sinon.stub(drp.datepickers[0], 'setOptions').callsFake(() => {});
      const stubDP1SetOptions = sinon.stub(drp.datepickers[1], 'setOptions').callsFake(() => {});

      drp.setOptions({inputs: [], allowOneSidedRange: true, maxNumberOfDates: 2, foo: 123, bar: 456});
      expect(stubDP0SetOptions.args, 'to equal', [[{foo: 123, bar: 456}]]);
      expect(stubDP1SetOptions.args, 'to equal', [[{foo: 123, bar: 456}]]);
    });
  });

  describe('timeOnly', function () {
    let clock;

    beforeEach(function () {
      // fake "now": 2024-03-15 13:27
      clock = sinon.useFakeTimers({
        now: new Date(2024, 2, 15, 13, 27).getTime(),
        toFake: ['Date'],
      });
    });

    afterEach(function () {
      clock.restore();
    });

    const at = (day, h, m) => new Date(2024, 2, day, h, m).getTime();
    const opts = {timeOnly: true, format: 'HH:mm'};

    it('keeps a same-day range as is', function () {
      const drp = new DateRangePicker(elem, opts);
      drp.setDates('09:00', '18:00');
      expect(drp.dates, 'to equal', [at(15, 9, 0), at(15, 18, 0)]);
    });

    it('runs an overnight range into the next day instead of swapping', function () {
      const drp = new DateRangePicker(elem, opts);
      drp.setDates('22:00', '01:00');
      expect(drp.dates, 'to equal', [at(15, 22, 0), at(16, 1, 0)]);
      expect(drp.getDates('HH:mm'), 'to equal', ['22:00', '01:00']);
      expect(input0.value, 'to be', '22:00');
      expect(input1.value, 'to be', '01:00');
    });

    it('keeps the same start and end times on the same day', function () {
      const drp = new DateRangePicker(elem, opts);
      drp.setDates('10:00', '10:00');
      expect(drp.dates, 'to equal', [at(15, 10, 0), at(15, 10, 0)]);
    });

    it('normalizes an overnight range given by the initial input values', function () {
      input0.value = '23:30';
      input1.value = '00:15';
      const drp = new DateRangePicker(elem, opts);
      expect(drp.dates, 'to equal', [at(15, 23, 30), at(16, 0, 15)]);
    });

    it('re-anchors the end when the start moves past it', function () {
      const drp = new DateRangePicker(elem, opts);
      drp.setDates('09:00', '18:00');

      drp.datepickers[0].setDate(at(15, 20, 0));
      expect(drp.dates, 'to equal', [at(15, 20, 0), at(16, 18, 0)]);
    });

    it('brings the end back to the start\'s day when the start moves before it', function () {
      const drp = new DateRangePicker(elem, opts);
      drp.setDates('22:00', '01:00');

      drp.datepickers[0].setDate(at(15, 0, 30));
      expect(drp.dates, 'to equal', [at(15, 0, 30), at(15, 1, 0)]);
    });

    it('re-anchors the end when a time string is typed into it', function () {
      const drp = new DateRangePicker(elem, opts);
      drp.setDates('22:00', '23:00');

      input1.value = '02:00';
      drp.datepickers[1].update();
      expect(drp.dates, 'to equal', [at(15, 22, 0), at(16, 2, 0)]);

      input1.value = '23:30';
      drp.datepickers[1].update();
      expect(drp.dates, 'to equal', [at(15, 22, 0), at(15, 23, 30)]);
    });

    it('re-anchors the end when changed with the time controls', function () {
      const drp = new DateRangePicker(elem, opts);
      drp.setDates('22:00', '23:00');

      const {hourInput} = drp.datepickers[1].picker.controls;
      hourInput.value = '3';
      hourInput.dispatchEvent(new Event('input'));
      expect(drp.dates, 'to equal', [at(15, 22, 0), at(16, 3, 0)]);
    });

    it('keeps a next-day end stable when its input is re-parsed unchanged', function () {
      const drp = new DateRangePicker(elem, opts);
      drp.setDates('22:00', '01:00');
      const spy = sinon.spy();
      input1.addEventListener('changeDate', spy);

      drp.datepickers[1].update();
      expect(drp.dates, 'to equal', [at(15, 22, 0), at(16, 1, 0)]);
      expect(spy.called, 'to be false');
      input1.removeEventListener('changeDate', spy);
    });

    it('keeps the start\'s day when a time string is typed into it', function () {
      const drp = new DateRangePicker(elem, opts);
      drp.setDates(at(10, 22, 0), at(11, 1, 0));

      // the start keeps its day (10th); the end follows it
      input0.value = '01:30';
      drp.datepickers[0].update();
      expect(drp.dates, 'to equal', [at(10, 1, 30), at(11, 1, 0)]);
    });

    it('fills the end with the start day\'s last minute when only the start is picked', function () {
      const drp = new DateRangePicker(elem, opts);
      drp.datepickers[0].setDate('22:00');
      expect(drp.dates, 'to equal', [at(15, 22, 0), at(15, 23, 59)]);
    });

    it('clears both sides together when allowOneSidedRange is false', function () {
      const drp = new DateRangePicker(elem, opts);
      drp.setDates('22:00', '01:00');
      drp.datepickers[1].setDate({clear: true});
      expect(drp.dates, 'to equal', [undefined, undefined]);
    });

    it('allows a one-sided range when allowOneSidedRange is true', function () {
      const drp = new DateRangePicker(elem, Object.assign({allowOneSidedRange: true}, opts));
      drp.datepickers[1].setDate('01:00');
      expect(drp.dates, 'to equal', [undefined, at(15, 1, 0)]);

      drp.datepickers[0].setDate('22:00');
      expect(drp.dates, 'to equal', [at(15, 22, 0), at(16, 1, 0)]);
    });

    it('still swaps a reversed range without timeOnly', function () {
      const drp = new DateRangePicker(elem, {pickTime: true});
      drp.setDates(at(15, 22, 0), at(15, 1, 0));
      expect(drp.dates, 'to equal', [at(15, 1, 0), at(15, 22, 0)]);
    });
  });

  describe('setDates() with pickTime', function () {
    it('keeps the start and end times independent', function () {
      const drp = new DateRangePicker(elem, {pickTime: true});
      const start = new Date(2024, 2, 15, 9, 30);
      const end = new Date(2024, 2, 16, 18, 45);

      drp.setDates(start, end);

      expect(new Date(drp.dates[0]).getHours(), 'to be', 9);
      expect(new Date(drp.dates[0]).getMinutes(), 'to be', 30);
      expect(new Date(drp.dates[1]).getHours(), 'to be', 18);
      expect(new Date(drp.dates[1]).getMinutes(), 'to be', 45);
    });

    it('fills the other side with the whole day when only one side is picked', function () {
      const drp = new DateRangePicker(elem, {pickTime: true, minuteStep: 15});

      drp.datepickers[0].setDate(new Date(2024, 2, 15, 9, 30));
      expect(drp.dates[1], 'to be', new Date(2024, 2, 15, 23, 45).getTime());

      drp.datepickers[1].setDate({clear: true});
      drp.datepickers[1].setDate(new Date(2024, 2, 20, 18, 0));
      expect(drp.dates[0], 'to be', new Date(2024, 2, 20, 0, 0).getTime());
    });

    it('defaults the empty end side\'s time inputs to the last minute, capped by maxDate', function () {
      const drp = new DateRangePicker(elem, {pickTime: true, allowOneSidedRange: true});
      const {controls} = drp.datepickers[1].picker;
      expect(controls.hourInput.value, 'to be', '23');
      expect(controls.minuteInput.value, 'to be', '59');

      drp.setOptions({maxDate: new Date(), defaultViewDate: new Date()});
      drp.datepickers[1].picker.syncTimeInputs();
      const now = new Date();
      expect(Number(controls.hourInput.value), 'to be', now.getHours());
      expect(Number(controls.minuteInput.value), 'to be', now.getMinutes());
    });

    it('preserves time on the same calendar day for both ends', function () {
      const drp = new DateRangePicker(elem, {pickTime: true});
      const start = new Date(2024, 2, 15, 9, 0);
      const end = new Date(2024, 2, 15, 17, 30);

      drp.setDates(start, end);

      expect(drp.dates[0], 'to be', start.getTime());
      expect(drp.dates[1], 'to be', end.getTime());
    });

    it('strips time on both ends when pickTime is false (default)', function () {
      const drp = new DateRangePicker(elem);
      const start = new Date(2024, 2, 15, 9, 30);
      const end = new Date(2024, 2, 16, 18, 45);

      drp.setDates(start, end);

      expect(new Date(drp.dates[0]).getHours(), 'to be', 0);
      expect(new Date(drp.dates[0]).getMinutes(), 'to be', 0);
      expect(new Date(drp.dates[1]).getHours(), 'to be', 0);
      expect(new Date(drp.dates[1]).getMinutes(), 'to be', 0);
    });

    it('forwards the third options argument to each datepicker.setDate()', function () {
      const drp = new DateRangePicker(elem);
      const stubDP0SetDate = sinon.stub(drp.datepickers[0], 'setDate').callsFake(() => {});
      const stubDP1SetDate = sinon.stub(drp.datepickers[1], 'setDate').callsFake(() => {});

      const start = new Date(2024, 2, 15);
      const end = new Date(2024, 2, 16);
      drp.setDates(start, end, {render: false});

      expect(stubDP0SetDate.calledWith(start, {render: false}), 'to be true');
      expect(stubDP1SetDate.calledWith(end, {render: false}), 'to be true');
    });
  });
});
