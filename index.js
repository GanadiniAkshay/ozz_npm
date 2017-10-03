var request = require('request');
var rp = require('request-promise');


function ozzai(setup){
	var that = this;

	that.url = 'https://api.ozz.ai/conversations'
	that.setup = setup

	that.message = function(message){
		var data = that.setup;
		
		if ("url" in data){
			var base_url = data["url"];
			if (base_url[base_url.length-1] == '/'){
				base_url = base_url.substring(0, base_url.length - 1);
			}
		}else{
			var base_url = "https://ozz.ai";
		}

		var url = base_url + '/api/parse/' + data["bot_guid"];

		var options = { method: 'POST',
			url: url,
			headers: 
			{
				'cache-control': 'no-cache',
				'content-type': 'application/json' 
			},
			body: { q: message },
			json: true };
		
		var options_log = { method: 'POST',
			url: 'https://ozz.ai/api/logs',
			headers: 
				{'cache-control': 'no-cache',
				'content-type': 'application/json' },
			body: 
				{ message: message,
				bot_guid: data.bot_guid,
				pat: data.pat,
				pid: data.pid,
				url: base_url },
			json: true };
		
		request(options_log, function (error, response, body) {
			if (error) throw new Error(error);
		});
		return rp(options);
	}
}

function ozz(setup){

	if (!setup){
		throw new Error('You must supply API Key');
	}

	if (!("bot_guid" in setup)){
		throw new Error('You must supply Bot GUID');
	}

	if (!("pat" in setup)){
		throw new Error('You must supply Page Access Token');
	}

	if (!("pid" in setup)){
		throw new Error('You must supply FB Page ID');
	}
	
	return new ozzai(setup);
}
module.exports = ozz;
