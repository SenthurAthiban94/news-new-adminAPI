var GoogleSearch = require('google-search');
var googleSearch = new GoogleSearch({
    key: 'AIzaSyBn7F5tuFmuhWoC8ntngoGZ2RYjVG9vcWA',
    cx: '010451391194642671989:4307xry1jxs'
  });
   
var trends = require('node-google-search-trends');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;


function getTOP_IndiaSites(){
    trends('India', 10, function(err, data) {
        if (err) return console.err(err);
        let topSites=[];
        Object.keys(data).map((e)=>{
        var singlesite={};
            singlesite.title=(data[e]['title'].length) ? data[e]['title'][0] : "";
            singlesite.description=data[e]['description'].length ? data[e]['description'][0] : "";
            singlesite.traffic=data[e]['ht:approx_traffic'].length ? data[e]['ht:approx_traffic'][0].replace(/,/g,'').replace('+','') : "";
            singlesite.contentLink=data[e]['ht:news_item'].length ? ((data[e]['ht:news_item'][0]['ht:news_item_url'].length) ? data[e]['ht:news_item'][0]['ht:news_item_url'][0] : "" ) : "";
            singlesite.contentImageUrl=data[e]['ht:picture'].length ? data[e]['ht:picture'][0] : "";
            singlesite.dateTracked=data[e]['pubDate'].length ? data[e]['pubDate'][0] : "";
            topSites.push(singlesite);
        });
        
        // Sending and receiving data in JSON format using POST method
        
        var xhr = new XMLHttpRequest();
        var url = "http://localhost:3000/sites";            //https://adminsa.herokuapp.com/sites
        var data = JSON.stringify(topSites);
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log("Last CRON Completed at "+new Date()+"!!");
            }
        };
        xhr.send(data);
    });
}


function get_Top_Sites_Content(){
    googleSearch.build({
        q: "hello",
        start: 5,
        fileType: "pdf",
        gl: "tr", //geolocation,
        lr: "lang_tr",
        num: 2, // Number of search results to return between 1 and 10, inclusive
        // siteSearch: "http://kitaplar.ankara.edu.tr/" // Restricts results to URLs from a specified site
      }, function(error, response) {
        console.log(JSON.stringify(response));
      });
}


get_Top_Sites_Content();
// getTOP_IndiaSites();
