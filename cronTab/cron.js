var trends = require('node-google-search-trends');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function getTOP_IndiaSites(){
    trends('India', 10, function(err, data) {
        if (err) return console.err(err);
        let topSites=[];
        Object.keys(data).map((e)=>{
        var singlesite={};
            singlesite.title=(data[e]['title'].length) ? data[e]['title'][0] : "";
            singlesite.traffic=data[e]['ht:approx_traffic'].length ? data[e]['ht:approx_traffic'][0].replace(/,/g,'').replace('+','') : "";
            singlesite.description=data[e]['description'].length ? data[e]['description'][0] : "";
            singlesite.contentLink=data[e]['ht:news_item'].length ? ((data[e]['ht:news_item'][0]['ht:news_item_url'].length) ? data[e]['ht:news_item'][0]['ht:news_item_url'][0] : "" ) : "";
            singlesite.contentImageUrl=data[e]['ht:picture'].length ? data[e]['ht:picture'][0] : "";
            singlesite.dateTracked=data[e]['pubDate'].length ? data[e]['pubDate'][0] : "";
            topSites.push(singlesite);
        });

        // Sending and receiving data in JSON format using POST method
        //
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

getTOP_IndiaSites();
