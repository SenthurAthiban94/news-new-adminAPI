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
  var multipleinserts=(Object.values(req.body).filter(a=> typeof(a) == 'object').length > 0) ? true : false;
  if(!multipleinserts){
    var new_site = new Sites(req.body);
        new_site.save(function(err, site) {
            if (err)
            res.send(err);
            res.json({status : 1,result: site});
        });
  }
  else{
    var payload=req.body,
        response=[];
        payload.map(e => {
          var new_site= new Sites(e);
              new_site.save(function(err,site){
                if(err){
                  res.send(err);
                }else{
                  response.push(site);
                }
                if(response.length==payload.length){
                  res.json({status : 1,result:response});
                }
              });
        });
 }
};


function SaveAll(payload){
  var response=Object.keys(payload).filter((e,i)=>{
      var new_site = new Sites(payload[e]);
      new_site.save(function(err, site) {
          if (err){
            res.send(err);
          }
          else{
            // response.push(site);
            return site;
          }
      });
  });
  console.log
  return response;
}

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