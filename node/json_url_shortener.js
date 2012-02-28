var tcp = require('net');
var http = require('http');
var express = require("express");
var nodejs_url = require('url');
var nodejs_events = require('events');

//http server setup
var server = express.createServer();
server.enable("jsonp callback");

server.get("/unshorten", function(req, res) {
    var url = req.query.url;
    console.log("short url : " + url );
    if (isshort(url)) {
       unshorten(url,callback);
    } else {
	callback(url);	
    };
    
    function callback ( url ) {
        if ( isshort(url) ) {
		console.log("url is still short : "+url+"\n\n");
				
	} else {
	  console.log("long url : " + url );
          res.json(url);
	}
    }
});

server.listen(8000);


// utils/net/url

function isshort(link) {
    var is_short_link = false;
    for (var j = 0; j < services.length; j++) {
        if (link && link.indexOf(services[j]) == 0) {
            is_short_link = true;
            break;
        }
    }
    return is_short_link;
};

function unshorten(short_link, callback) {
    var final_url_string = '';
    var parsed_url = nodejs_url.parse(short_link);
    var options = {
        host: parsed_url.hostname,
        port: parsed_url.port,
        path: parsed_url.pathname,
        method: 'HEAD'
    };

    console.log(JSON.stringify(options));
    var req = http.request(options, function(res) {
            console.log( "\n" + res.statusCode+' : ' + JSON.stringify(res.headers)+"\n");
            final_url_string = res.headers.location;

	    if ( isshort(final_url_string) ) {
		console.log("url is still short : "+final_url_string+"\n\n");
		unshorten(final_url_string,callback);
	    } else {	   	
             	callback(final_url_string);
	    }
        });
    req.write('\n\n');
    req.end();
    short_link=final_url_string;
    console.log("short link" + short_link);
}

var services = [
'http://2tu.us/',
'http://3.ly/',
'http://afx.cc/',
'http://alturl.com/',
'http://amzn.to/',
'http://arst.ch/',
'http://awe.sm/',
'http://b2l.me/',
'http://bbc.in/',
'http://bit.ly/',
'http://blo.gr/',
'http://bt.io/',
'http://chart.ly/',
'http://cli.gs/',
'http://cl.ly/',
'http://cnt.to/',
'http://con.st/',
'http://cot.ag/',
'http://cptlst.com/',
'http://datafl.ws/',
'http://db.ly/',
'http://digg.com/',
'http://disq.us/',
'http://dlvr.it/',
'http://drp.ly/',
'http://econ.st/',
'http://fav.me/',
'http://fb.me/',
'http://ff.im/',
'http://flic.kr/',
'http://gclink.us/',
'http://gdzl.la/',
'http://goo.gl/',
'http://grab.ly/',
'http://gu.com/',
'http://huff.to/',
'http://icio.us/',
'http://idek.net/',
'http://instapaper.com/',
'http://is.gd/',
'http://jan.io/',
'http://j.mp/',
'http://jr.ly/',
'http://kiq.me/',
'http://lev.me/',
'http://lnk.ms/',
'http://l.pr/',
'http://mee.bo/',
'http://minurl.org/',
'http://moourl.com/',
'http://mu.ly/',
'http://mzl.la/',
'http://neow.in/',
'http://nyr.kr/',
'http://nyti.ms/',
'http://nyturl.com/',
'http://om.ly/',
'http://on0.us/',
'http://on.cnn.com/',
'http://oreil.ly/',
'http://ow.ly/',
'http://ping.fm/',
'http://plr.is/',
'http://pop.is/',
'http://post.ly/',
'http://ptiturl.com/',
'http://pwr.com/',
'http://r2.ly/',
'http://reg.cx/',
'http://retwt.me/',
'http://s2t.vg/',
'http://shar.es/',
'http://short.to/',
'http://shozu.com/',
'http://sn.im/',
'http://snipr.com/',
'http://snipurl.com/',
'http://snurl.com/',
'http://s.nyt.com/',
'http://su.pr/',
'http://swtiny.eu/',
'http://t.co/',
'http://tcrn.ch/',
'http://tiny.cc/',
'http://tinyurl.com/',
'http://tl.gd/',
'http://tnw.to/',
'http://tr.im/',
'http://tumblr.com/',
'http://twt.gs/',
'http://twt.tl/',
'http://twurl.nl/',
'http://ub0.cc/',
'http://u.nu/',
'http://ur1.ca/',
'http://url.ag/',
'http://ur.ly/',
'http://uurl.in/',
'http://vf.cx/',
'http://wapo.st/',
'http://wp.me/',
'http://xrl.in/',
'http://y.ahoo.it/',
'http://zz.gd/'
];



