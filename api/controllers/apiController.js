'use strict';

var mongoose = require('mongoose'),
    Sites = mongoose.model('SitesList');

exports.list_sites_by_city=function(req,res){
  var country=req.params.countryName;
  trends(country, 10, function(err, data) {
      if (err) return console.err(err);
      let topSites=[];
      topSites=Object.keys(data).map((e)=>{
      var singlesite={};
          singlesite.title=(data[e]['title'].length) ? data[e]['title'][0] : "";
          singlesite.description=data[e]['description'].length ? data[e]['description'][0] : "";
          singlesite.traffic=data[e]['ht:approx_traffic'].length ? data[e]['ht:approx_traffic'][0].replace(/,/g,'').replace('+','') : "";
          singlesite.contentLink=data[e]['ht:news_item'].length ? ((data[e]['ht:news_item'][0]['ht:news_item_url'].length) ? data[e]['ht:news_item'][0]['ht:news_item_url'][0] : "" ) : "";
          singlesite.contentImageUrl=data[e]['ht:picture'].length ? data[e]['ht:picture'][0] : "";
          singlesite.dateTracked=data[e]['pubDate'].length ? data[e]['pubDate'][0] : "";
          if(data[e]['ht:news_item'].length){
            singlesite.summary={
              title   : data[e]['ht:news_item'][0]['ht:news_item_title'] ? data[e]['ht:news_item'][0]['ht:news_item_title'][0] : "",
              content : data[e]['ht:news_item'][0]['ht:news_item_snippet'] ? data[e]['ht:news_item'][0]['ht:news_item_snippet'][0] : "",
              link    : data[e]['ht:news_item'][0]['ht:news_item_url'] ? data[e]['ht:news_item'][0]['ht:news_item_url'][0] : "",
              source  : data[e]['ht:news_item'][0]['ht:news_item_source'] ? data[e]['ht:news_item'][0]['ht:news_item_source'][0] : ""
            }
          }
          topSites.push(singlesite);
          if(Object.keys(data).length == topSites.length){
            res.send(JSON.stringify(topSites));      
          }
      });
    });
}

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