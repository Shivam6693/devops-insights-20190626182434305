
(function () {

    'use strict';

    var apiv1 = require('../../routes/apiv1');
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
                    assert.equal(res.status, 200);
                    assert(((res.body.city === 'Anderson Mill') || (res.body.city === 'Cedar Park')), "City name does not match");
                    done();
                });
    	});

    	it('with without zip code', function(done) {
    		rqst(app).get('/api/v1/getWeather')
    		.end(function(err, res) {
                    assert.equal(res.status, 400);
                    done();
                });
    	});

    	it('with another valid zip code', function(done) {
    		rqst(app).get('/api/v1/getWeather?zip=78641')
    		.end(function(err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.city, 'Leander', "City name does not match");
                    done();
                });
    	});
    });
}());
