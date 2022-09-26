'use strict';

/**
 * counter router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::counter.counter');
