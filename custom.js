jQuery(document).ready(function() {
	// do something here
    addButtonClickHandlers();
    setupUI();
});

// UI
function setupUI(){
	$('#log').css('background-color','#FFFF44');
	$('#output1').css('background-color','black');
}


function addButtonClickHandlers() {
    $('#button1').click(button1Action);
    $('#toggleLogButton').click(hideLog);
    $('#clearLogButton').click(clearLog);
};

function hideLog() {
	$('#log').hide(20,function(){
		$('toggleLogButton').click(showLog);
	});
}

function showLog() {
	$('#log').show(20,function(){
		$('toggleLogButton').click(hideLog);
	});
}

function clearLog() {
	$('#log') = "";
}

/* good example of caching
var hash = function(obj){
  // some cool hashing
  return obj.lastName + obj.firstName; // just an example
};

var dict = {};

dict[hash(obj1)] = obj1;
dict[hash(obj2)] = obj2;
*/

// short Url / longurl/ count
var urlCountAndCache = {
	'short_url' :'',
	'long_url' :'',
	'count' :''
}


var twitterContainer = {};


var twitterView = {
       'time' : '',
       'user' : '',
       'url' : ''

} 

//

function button1Action() {
    
    $.twitterSearch('webgl',3, function(replyObj){
        var tweets = replyObj.results;
log('sizeof result = '+ tweets.length);
        $.each(tweets, function(i,tweet) {

       		var url = extractUrl(tweet.text);
		function callback(long_url) {
//			log("                long_url : " + long_url);	


			// tweet local storage
			var t = {
 				'time' : tweet.created_at,
			       	'user' : '@'+tweet.from_user,
        			'url' : long_url,
				'user_pic_url' : tweet.profile_image_url,
				'text' : tweet.text
                         }
		
			//log(inspect(t)+"");
			//twitterContainer[t.url] = t.long_url;
			//log(inspect(twitterContainer)+"");
			//log(twitterContainer[t.url].user);
			
			log( ' > '+long_url+'< ');
			log( '		>'+ t.text + '<');

			var p = $("<p></p>");
			p.css('color','red');
			//p.append(long_url);
			var a = $("<a></a>").attr('href',long_url);
			a.css('color','red');
			a.append(long_url);
			p.append(a);
//			var a = $("<a></a>").attr('href',long_url);
			$('#output1').append(p);

		};
		if ( url!= '') {
//log("url : " + url);
			$.shortUrlResolve(url,callback);
        	}
	});
    });
}


// utils/debug

function log(msg) {
    $('#log').append('<p>'+msg.replace(" ",'') +'</p>');
}

function inspect(obj) {
    for( property in obj ) {
        log(property + " = " + obj[property]);
    }
}

// utils/string
function extractUrl(text) {
    var result = '';
    var rgxp = /http/;
    var words = text.split(' ');
    for ( var i = 0; i < words.length ; i++) {
        var w = words[i];
	$.trim(w);
        if ( ! w.search(rgxp)) {
            result = w;
            result = result.replace(" ", "");
	}
    }
    return result;
}


// adding functions to jquery

(function( $ ){
	$.extend( {

		//
		twitterSearch: function( searchText, numPosts, callback ) {
			var info = {};
			
			if( searchText == 'undefined' || numPosts == 'undefined' ) {
				return;
			} else if( $.isFunction( numPosts ) ) {
				// If only username and callback function is set
				callback = numPosts;
				numPosts = 5;
			}
			
			var url = "http://search.twitter.com/search.json?q=" + searchText + "&callback=?";
			log ( "twitterSearch::url = " + url);			
	
			$.getJSON( url, function( data ){
				if( $.isFunction( callback ) ) {
log("json replied : " + data );
					callback.call( this, data );
				}
				
			});
		}
	});

	$.extend({

		//
		shortUrlResolve: function( shortUrl , callback ) {
//log("::shortUrlResolve");
			var info={};
			if( shortUrl == 'undefined' || ! $.isFunction(callback) ) {
				return;
			}
			
			var url = "http://127.0.0.1:8000/unshorten?url=" + shortUrl + "&callback=?";
//log(' json get ' + url);

			
			$.getJSON( url, function( data){
//log("::shorUrlResolve : " + data);
				callback.call(this, data );
			});

		}

	});
})( jQuery );

