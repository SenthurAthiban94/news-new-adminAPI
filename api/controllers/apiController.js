'use strict';

var mongoose = require('mongoose'),
  Sites = mongoose.model('SitesList');

exports.list_all_Sites = function(req, res) {
    Sites.find({}, function(err, site) {
    if (err)
      res.send(err);
    res.json(site);
  });
};




exports.create_a_Site = function(req, res) {
  var new_site = new Sites(req.body);
  new_site.save(function(err, site) {
    if (err)
      res.send(err);
    res.json(site);
  });
};


exports.read_a_Site = function(req, res) {
    Sites.findById(req.params.siteId, function(err, site) {
    if (err)
      res.send(err);
    res.json(site);
  });
};


exports.update_a_Site = function(req, res) {
    Sites.findOneAndUpdate({_id: req.params.siteId}, req.body, {new: true}, function(err, site) {
    if (err)
      res.send(err);
    res.json(site);
  });
};


exports.delete_a_Site = function(req, res) {
  Sites.remove({
    _id: req.params.siteId
  }, function(err, site) {
    if (err)
      res.send(err);
    res.json({ message: 'Site deleted successfully!!' });
  });
};

exports.delete_all_Sites = function(req, res) {
    Sites.remove({},function(err,site){
        if(err)
            res.send(err);
        res.json({ message: 'All Sites Deleted Successfully!!'})
    });
}