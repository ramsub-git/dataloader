var https = require('https');
/*var db = require("./db.js");
var DataAccess = new DataAccess();*/
var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');

var natural_language_understanding = new NaturalLanguageUnderstandingV1({
	"username" : "1497774f-4e7e-42ac-b174-6b2aedb42f08",
	"password" : "GcXv1piVhVIo",
	'version_date' : NaturalLanguageUnderstandingV1.VERSION_DATE_2017_02_27
});

var parameters = {
		  "text" : "",
		  "features" : {
		    "entities" : {
		      "emotion" : true,
		      "sentiment" : true,
		      "limit" : 2
		    },
		    "keywords" : {
		      "emotion" : true,
		      "sentiment" : true,
		      "limit" : 2
		    }
		  }
		}

https.get("https://itunes.apple.com/us/rss/topgrossingapplications/limit=10/json", (res) => {
	// Do stuff with response
	var resJson = "";
	res.on('data', (d) => {
		resJson += d;
	});

	res.on('end', (e) => {
		console.log(e);
		var head = JSON.parse(resJson);
		//		console.log(head.feed.entry[0].summary.label);
		var entries = head.feed.entry;
		console.log("length: " + entries.length);


		for (var k = 0; k < entries.length; k++) {
			parameters.text = entries[k].summary.label;

			natural_language_understanding.analyze(parameters, function(err, response) {
				if (err)
					console.log('error:', err);
				else
					console.log(JSON.stringify(response, null, 2));
			});
		}

	/*entries.foreach(function(elt, i, array) {
		console.log(elt.summary.label);
	});*/
	});

})
	.on('error', (e) => {
		console.error(e);
	});


