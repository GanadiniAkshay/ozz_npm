var request = require('request');


function logConversation(bot_guid){
	var that = this;

	that.url = 'https://api.ozz.ai/conversations'
	that.bot_guid = bot_guid;

	that.log = function(data,message,isBotReply,convo_id,sender_id,payload,intent,entities){
		data['bot_guid'] = that.bot_guid;

		//Check required entities and throw error
		if (typeof data['message'] === 'undefined'){
			throw new Error('You must supply message');
		}

		if (typeof data['isBotReply'] === 'undefined'){
			throw new Error('You must supply if it is a bot reply');
		}

		//Check if optional params supplied and put default value if not
		data['convo_id'] = typeof data['convo_id'] !== 'undefined'? data['convo_id'] : "";
		data['sender_id'] = typeof data['sender_id'] !== 'undefined'? data['sender_id'] : "";
		data['payload'] = typeof data['payload'] !== 'undefined'? data['payload'] : {};
		data['intent'] = typeof data['intent'] !== 'undefined'? data['intent'] : "";
		data['entities'] = typeof data['entities'] !== 'undefined'? data['entities'] : {};

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
