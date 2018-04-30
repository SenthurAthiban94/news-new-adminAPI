'use strict';

module.exports = function(app) {
  var Sites= require('../controllers/apiController');

  // todoList Routes
  app.route('/sites')
    .get(Sites.list_all_Sites)
    .post(Sites.create_a_Site)
    .delete(Sites.delete_all_Sites);


  app.route('/sites/:siteId')
    .get(Sites.read_a_Site)
    .put(Sites.update_a_Site)
    .delete(Sites.delete_a_Site);
};