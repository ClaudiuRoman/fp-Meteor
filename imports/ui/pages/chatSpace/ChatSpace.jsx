import React, {Button, Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {createContainer} from 'meteor/react-meteor-data';
import Messages from '/imports/api/messages/collection.js';
import CreateMessage from '/imports/ui/pages/chatSpace/CreateMessage.jsx';
import Conversations from '/imports/api/conversations/collection.js';
import route from '/imports/routing/router.js';
import '/imports/api/conversations/methods.js';
import '/imports/api/messages/methods';
import './style.css';

//Component that renders the space for messages and component that creates messages
class MessagesList extends React.Component{

	constructor(){
	super();

	}

	//when component did mount, we check for presence of conversation author on every 3 seconds. 
	componentDidMount () {

		let author=null;

		Meteor.call('findAuthor',route.current().params.id, function (err, res) {
		author = res.authorId;
		})

		//check for author's presence
		Cronometer = Meteor.setInterval(function () {

			//case id author is gone
			if(!Presences.findOne({userId: author}))
			{
				//delete the current conversation
				Meteor.call('deleteConversation',route.current().params.id, function (err, res) {
					if(res){

						//alert the users
						alert("It looks like the author of this conversation has dissapeared in a mysterious way. Sorry for that, but we need to destroy this chat.")
						
						//delete messages from this conversation
						Meteor.call('deleteMessages',route.current().params.id, function (err, res) {
							console.log("deleted!");
						})

						//redirect users to conversations page
						route.go('/conversations');
						//stop Interval.
						clearInterval(Cronometer);

					}


				})

			} 

		}, 3000)

	}




	render(){
		const {loading,messages} = this.props;
		//if we have logged user, we give him the possibility for sendind messages
		if(Meteor.userId())
			return (

				<div > 


					<div className="row">
						<div className="col-md-2">
						</div>
						<div className="col-md-8">
							<a href="/conversations" className="btn btn-primary btn-lg btn-block btn-huge">Conversations</a>
						</div>
						<div className="col-md-2">
						</div>

					</div>

					<div className="container clearfix">

						<div className="chat">   
							<div className="chat-history">
								<ul className="chat-ul">


									{
										//map through messages and list them
										messages.map((message)=>{
											if(message.authorId==Meteor.userId())
												return (

													<li className="clearfix">
														<div className="message-data align-right">
															<span className="message-data-name">{message.authorName}<br></br>{message.date.getFullYear()}.{message.date.getMonth()}.{message.date.getDay()}<br></br>{message.date.getHours()}:{message.date.getMinutes()}</span> <i className="fa fa-circle me"></i>
														</div>
														<div className="message me-message float-right"> {message.content}</div>
													</li>

												)
											else
												return (

													<li>

													<div className="message-data">
														<span className="message-data-name"><i className="fa fa-circle you"></i> {message.authorName}<br></br>{message.date.getFullYear()}.{message.date.getMonth()}.{message.date.getDay()}<br></br>{message.date.getHours()}:{message.date.getMinutes()}</span>
													</div>
													<div className="message you-message">
													{message.content}
													</div>

													</li>

												)
										})
									}
								</ul>

							</div>

						</div> 
					</div>
					<CreateMessage></CreateMessage>
				</div>


				)
				//if user is not logged in, we don't give him possibility to send messages
				else
					return (

						<div > 
							<div className="container clearfix">

								<div className="chat">   
									<div className="chat-history">
										<ul className="chat-ul">


											{
												messages.map((message)=>{

													return (

														<li>

															<div className="message-data">
																<span className="message-data-name"><i className="fa fa-circle you"></i> {message.authorName}<br></br>{message.date.getFullYear()}.{message.date.getMonth()}.{message.date.getDay()}<br></br>{message.date.getHours()}:{message.date.getMinutes()}</span>
															</div>

															<div className="message you-message">
															{message.content}
															</div>

														</li>

													)
												})
											}
										</ul>

									</div>

								</div> 
							</div>

						</div>




				)
	}


}

//create container for messages collection here
export default createContainer((props)=>{

	//subscribe to messages collection when entering this page
	const handle = Meteor.subscribe('messages');

	return {
		//returning messages sorted by date
	'loading':!handle.ready(),
	'messages':Messages.find({conversationId: route.current().params.id},{sort:{date: 1}}).fetch()

	}

},MessagesList);

