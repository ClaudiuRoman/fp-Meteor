import {Meteor} from 'meteor/meteor';
import Messages from '/imports/api/messages/collection.js';
import Security from '/imports/api/security.js';
import People from '/imports/api/people/collection';

Meteor.methods({

	//create a message 
	'createMessage': function(text,authorId,authorName,conversationId){
		Security.checkLoggedIn(this.userId);
		return Messages.insert({content: text, authorId: authorId,authorName: authorName,conversationId:conversationId,date: new Date()});
	},

	//find the name of the author in order to display in message head.
	'findAuthorName':function(email){

    	return People.findOne({email:email});
	},

	//delete messages. It is called when user has gone and we need to delete the entire conversation+ messages
	'deleteMessages':function(conversationId){
		return Messages.remove({conversationId:conversationId});
	}

});
