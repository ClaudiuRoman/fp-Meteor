import { Meteor } from 'meteor/meteor';
import Conversations from '/imports/api/conversations/collection.js'; 

Meteor.publish('conversations', function () {
    return Conversations.find();
})