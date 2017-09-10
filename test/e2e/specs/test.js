// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
    'default e2e tests': function test(browser) {
        // automatically uses dev Server port from /config.index.js
        // default: http://localhost:8080
        // see nightwatch.conf.js
        const devServer = browser.globals.devServerURL;

        browser
            .url(devServer)
            // .waitForElementVisible('#app', 5000)
            // .assert.elementPresent('.index')
            // .assert.containsText(
            //     '.index:nth-child(1)',
            //     'This should be a dashboard, but for now...'
            // )
            // .assert.containsText('.index:nth-child(1)',
            // "Hello, let's get started at the top left")
            .end();
    }
};
