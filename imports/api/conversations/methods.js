import {Meteor} from 'meteor/meteor';
import Security from '/imports/api/security.js';

import Conversations from '/imports/api/conversations/collection';

Meteor.methods({

    //create a conversation using Conversation Name, privacy type and Author Id.
    'createConversation': function (name,privacy, authorId) {
    	Security.checkLoggedIn(this.userId);
        return Conversations.insert({name: name,privacy:privacy,authorId:authorId });
    },

    //list conversation by type of user. If a user is logged in, he'll see only public conversations.
    'showConversations':function(){
    	if(Security.isLoggedIn(this.userId))
    	return Conversations.find().fetch();
    	else
    	{
    		return Conversations.find({privacy: false}).fetch();
    	}
    },

    //find author of a conversation, in order to determine if it's online or not
    'findAuthor':function(id){
    	return Conversations.findOne({_id:id});
    },

    //delete conversation by Id. It is used when author has gone. 
    'deleteConversation':function(id){
    	return Conversations.remove({_id:id});
    }
})

