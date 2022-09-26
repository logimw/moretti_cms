'use strict';

/**
 * counter service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::counter.counter');
