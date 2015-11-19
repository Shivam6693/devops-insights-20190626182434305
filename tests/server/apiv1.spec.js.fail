
(function () {

    'use strict';

	var requireHelper = require('./requireHelper');
    var apiv1 = requireHelper.require('tests/coverage/instrumented/routes/apiv1');
    var assert = require('chai').assert;
    var express = require('express');
    var rqst = require('supertest');

    var app = express();

    describe('Get Weather', function() {

    	before(function() {
            app.use('/api/v1/', apiv1.router);
        });

    	it('with valid zip code', function(done) {
    		rqst(app).get('/api/v1/getWeather?zip=78613')
    		.end(function(err, res) {
                    assert.equal(res.status, 2000);
                    assert.equal(res.body.city, 'Anderson Mill');
                    done();
                });
    	});

    	it('with without zip code', function(done) {
    		rqst(app).get('/api/v1/getWeather')
    		.end(function(err, res) {
                    assert.equal(res.status, 4000);
                    done();
                });
    	});

    	it('with invalid zip code', function(done) {
    		rqst(app).get('/api/v1/getWeather?zip=00000')
    		.end(function(err, res) {
                    assert.equal(res.status, 400);
                    done();
                });
    	});

    	it('with incomplete zip code', function(done) {
    		rqst(app).get('/api/v1/getWeather?zip=786')
    		.end(function(err, res) {
                    assert.equal(res.status, 400);
                    done();
                });
    	});
    });
}());
