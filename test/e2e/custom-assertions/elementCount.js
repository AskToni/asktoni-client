// A custom Nightwatch assertion.
// the name of the method is the filename.
// can be used in tests like this:
//
//   browser.assert.elementCount(selector, count)
//
// for how to write custom assertions see
// http://nightwatchjs.org/guide#writing-custom-assertions

/* eslint func-names: 0 */
exports.assertion = function (selector, count) {
    this.message = `Testing if element <${selector}> has count: ${count}`;
    this.expected = count;
    this.pass = function (val) {
        return val === this.expected;
    };
    this.value = function (res) {
        return res.value;
    };
    this.command = function (cb) {
        const self = this;
        return this.api.execute(
            () => document.querySelectorAll(selector).length,
            [selector],
            (res) => {
                cb.call(self, res);
            },
        );
    };
};
