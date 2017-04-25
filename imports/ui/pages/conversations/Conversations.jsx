import React, {Button, Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {createContainer} from 'meteor/react-meteor-data';
import CreateConversation from './CreateConversation';
import Conversations from '/imports/api/conversations/collection.js';
import Timers from 'react-timers';
import './style.css';

 //this component lists conversations
 class ConversationsList extends React.Component {
    constructor() {
        super();
    }


    render() {
        const {loading, conversations} = this.props;
        
        //if user is logged in, we give him all types of conversations and possibility to create conversation
        if(Meteor.userId())
        {
            return (
                <div>
                    <div className="row">
                        <div className="col-md-2">
                        </div>
                        <div className="col-md-8">
                            <a href="/" className="btn btn-primary btn-lg btn-block btn-huge">Home</a>
                        </div>
                        <div className="col-md-2">
                        </div>
                        
                    </div>
                    <br></br>
                    
                    {
                        //loop through conversations and list them here
                        conversations.map((conversation) => {
                            return (
                                <div>
                                   
                                    
                                        <div className="container">
                                            <div className="row">
                                                
                                                <div className="col-md-3">
                                                    <div className="offer offer-success">
                                                        <div className="shape">
                                                            <div className="shape-text">
                                                                                            
                                                            </div>
                                                        </div>
                                                        <div className="offer-content">
                                                            <h3 className="lead">
                                                                <a href={"/chatSpace/" + conversation._id}>{conversation.name}</a>
                                                            </h3>                       
                                                            <p>
                                                                Space for something
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                        </div>
    

                                    
                                </div>
                            )
                        })
                    }
                    <CreateConversation></CreateConversation>
                </div>
            )
        }

        //if a user is not logged in, we give him only public conversations and don't give him the possibility to create new conversations
        else{
            return (

                    <div>
                    <div className="row">
                        <div className="col-md-2">
                        </div>
                        <div className="col-md-8">
                            <a href="/" className="btn btn-primary btn-lg btn-block btn-huge">Home</a>
                        </div>
                        <div className="col-md-2">
                        </div>
                        
                    </div>
                    <br></br>
                    
                    {
                        //loop through conversations and list them
                        conversations.map((conversation) => {
                            return (
                                <div>
                                    <div className="container">
                                            <div className="row">
                                                
                                                <div className="col-md-3">
                                                    <div className="offer offer-success">
                                                        <div className="shape">
                                                            <div className="shape-text">
                                                                                            
                                                            </div>
                                                        </div>
                                                        <div className="offer-content">
                                                            <h3 className="lead">
                                                                <a href={"/chatSpace/" + conversation._id}>{conversation.name}</a>
                                                            </h3>                       
                                                            <p>
                                                                Space for something
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                        </div>
                                    
                                </div>
                            )
                        })
                    }
                    
                </div>
                )
        }
    }
}

//create container for conversations here
 export default createContainer((props) => {
    const handle = Meteor.subscribe('conversations');
   
   //if user is logged in, give him all conversations
    if(Meteor.userId())
        return {
            loading: !handle.ready(),
            conversations: Conversations.find().fetch()
        }

    //if user is not logged in, give him only private converasations
    else{
        return {
            loading: !handle.ready(),
            conversations: Conversations.find({privacy: false}).fetch()
        }
    }
}, ConversationsList);
