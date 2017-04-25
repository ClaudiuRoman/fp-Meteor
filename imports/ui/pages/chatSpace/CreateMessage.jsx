import React, {Button, Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import '/imports/api/messages/methods.js';
import route from '/imports/routing/router.js';



let author=null;

//this components is for sending messages
export default class CreateMessage extends Component{

	constructor() {
        super();
        
    }
    
    //on submit, this method takes content, author's name and time and inserts it in message collection
    handleSubmit(event) {
    event.preventDefault();
    const conversationId = route.current().params.id;

	const text = ReactDOM.findDOMNode(this.refs.messageText).value;
    const userId = Meteor.userId();

    let author=null;

    //find author name and insert message in collection
    Meteor.call('findAuthorName',Meteor.user().emails[0].address, function (err, res) {
     if(res.name)
        Meteor.call('createMessage',text,userId,res.name,conversationId,function (err, res) {
         console.log(err, res);

    })


     });

    
   
    // Clear form
    ReactDOM.findDOMNode(this.refs.messageText).value = '';
    

  }

    //rendering for submiting a message
    render (){
    	return (
            
    		<form className ="sendMessage" onSubmit={this.handleSubmit.bind(this)}  >
            <input type="text" ref="messageText"   placeholder="Enter a message"></input>
            <br></br>
           <input type="submit" value="Submit" className = "submitButton"></input>
            </form>
    		)
    }

}