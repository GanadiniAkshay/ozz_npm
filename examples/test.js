var ozz = require('./index')('6c73c666-e7cd-11e6-b179-123e4509c2b0'); 

var data = {
    'message':'Hey',
    'sender_id':123,
    'sender_name':'akshay'
}
ozz.logOutgoing(data);