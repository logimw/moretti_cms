'use strict';

/**
 * counter controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::counter.counter');
