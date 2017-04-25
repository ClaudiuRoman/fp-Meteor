import {Meteor} from 'meteor/meteor';
import People from './collection.js';
import Security from '/imports/api/security.js';

Meteor.methods({

	//create an account for new registered user
	'createAccount': function(email,name,password){

		 return People.insert({name:name, email:email, password:password});


	},

	//check if we already have email adress taken. It is helpfull when trying to register with an already taken email.
	'findOneWithSameEmail':function(email){
		return People.findOne({email:email});
	}
	

});
