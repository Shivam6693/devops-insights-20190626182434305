
(function () {

	'use strict';

	var webdriver = require('selenium-webdriver');
	var By = require('selenium-webdriver').By;
	var until = require('selenium-webdriver').until;
	var assert = require('assert');
	var sauceLabs = require('saucelabs');
    
	var SAUCELABSURL = 'http://ondemand.saucelabs.com:80/wd/hub';
	var DEMODRAURL = 'https://demodratest.mybluemix.net/#/';

	var driver = new webdriver.Builder().
        			usingServer(SAUCELABSURL).
        			withCapabilities(
        				{
        					browserName: 'Firefox',
        					platform: 'Windows XP',
        					name: 'Current Weather Report check',
        					tags: ["demodra"],
        					build: '1.1.0',
        					username: process.env.SAUCE_USERNAME,
        					accessKey: process.env.SAUCE_ACCESS_KEY
    					}
    				).build();

  var saucelab = new sauceLabs({
          username: process.env.SAUCE_USERNAME,
          password: process.env.SAUCE_ACCESS_KEY
        });

	describe('Test current weather report', function() {

    before(function(done) {
      driver.get(DEMODRAURL);
      done();
    });

		it("check report title", function(done) {
      driver.get(DEMODRAURL).then(function() {
        driver.getTitle().then(function(title) {
          assert.equal(title, 'DemoDRA - Current Weather');
          done();
        });
      });
    });

    it("Check for zip4 element", function(done) {
      driver.isElementPresent(webdriver.By.id('zip4')).then(function(present) {
        assert.equal(present, true);
        done();
      });
    });

    it("Check for Weather text", function(done) {
      driver.findElement(webdriver.By.id('weather')).getText().then(function(text) {
        assert.equal(text, "Weather");
        done();
      });
    });

    it("Enter zip code and check output - 1", function(done) {
      driver.findElement(webdriver.By.id('zip1')).sendKeys('78613');
      driver.findElement(webdriver.By.id('zip1city')).getText().then(function(text) {
        assert.equal(text, ' Anderson Mill');
        done();
      });
    });

    it("Enter zip code and check output - 2", function(done) {
      driver.findElement(webdriver.By.id('zip4')).sendKeys('75038');
      driver.findElement(webdriver.By.id('zip4city')).getText().then(function(text) {
        assert.equal(text, ' Irving');
        done();
      });
    });

    after(function(done) {
      driver.getSession().then(function(session) {
        var jobId = session.getId();
        //console.log(jobId);
        driver.quit();
        saucelab.stopJob(jobId, {}, function(){});
        done();
      });
    });

	});;
}());
