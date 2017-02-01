var request = require('request');


function logConversation(bot_guid){
	var that = this;

	that.url = 'https://api.ozz.ai/conversations'
	that.bot_guid = bot_guid;

	that.logIncoming = function(data){
		data['bot_guid'] = that.bot_guid;

		//Check required entities and throw error
		if (typeof data['message'] === 'undefined'){
			throw new Error('You must supply message');
		}

		//Check if optional params supplied and put default value if not
		data['sender_name'] = typeof data['sender_name'] !== 'undefined'? data['sender_name'] : "";
		data['sender_id'] = typeof data['sender_id'] !== 'undefined'? data['sender_id'] : "";
		data['payload'] = typeof data['payload'] !== 'undefined'? data['payload'] : {};

		data['isBotReply'] = false
		data['intent'] =''
		data['entities'] = {}
		data['convo_id'] = ''

		request({
			url: that.url,
			method: 'POST',
			json: data
		}, function(err, response){
			if (err){
				throw err;
			}
			console.log(response.body);
		})	
	}

	that.logOutgoing = function(data){
		data['bot_guid'] = that.bot_guid;

		//Check required entities and throw error
		if (typeof data['message'] === 'undefined'){
			throw new Error('You must supply message');
		}

		//Check if optional params supplied and put default value if not
		data['sender_name'] = typeof data['sender_name'] !== 'undefined'? data['sender_name'] : "";
		data['sender_id'] = typeof data['sender_id'] !== 'undefined'? data['sender_id'] : "";
		data['payload'] = typeof data['payload'] !== 'undefined'? data['payload'] : {};

		data['isBotReply'] = true
		data['intent'] =''
		data['entities'] = {}
		data['convo_id'] = ''
		
		request({
			url: that.url,
			method: 'POST',
			json: data
		}, function(err, response){
			if (err){
				throw err;
			}
			console.log(response.body);
		})	
	}
}

function ozz(bot_guid){

	if (!bot_guid){
		throw new Error('You must supply API Key');
	}
	return new logConversation(bot_guid);
}
module.exports = ozz;
