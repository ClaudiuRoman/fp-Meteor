import React, {Button, Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import '/imports/api/conversations/methods.js';
import './style.css';

//component for creating new conversations
export default class CreateConversation extends Component{

    constructor() {
        super();
    }

    //on submit, it checks if the privacy was selected and name is not null and inserts a new conversation in collection
    handleSubmit(event) {
        event.preventDefault();
        const publicOption = this.refs.publicOption.checked;
        const privateOption = this.refs.privateOption.checked;


        const name = ReactDOM.findDOMNode(this.refs.conversationName).value;

        //if we don't have a privacy selected 
        if(!publicOption && !privateOption)
        {
            alert("You must select privacy of a conversation!");
        }
        //if there is no name for conversation
        else if(!name)
            alert("Please choose a name for conversation!");
        //else if everything is ok
        else{


            privacy = true ? privateOption : false;

            //creates a conversation
            Meteor.call('createConversation',name,privacy,Meteor.userId(),function (err, res) {
            console.log(err, res);
            })

            // Clear form
            ReactDOM.findDOMNode(this.refs.conversationName).value = '';
        }




    }


    render (){
        return (
            <div className ="row">
                <div className="col-md-4">
                </div>
                <div className= "col-md-8 conversationForm">
                    <div className="form-inline required">
                        <div className="form-group has-feedback">
                            <label className="input-group">
                                <span className="input-group-addon">
                                    <input type="radio" ref= "publicOption" name="privacy_options" value="public" id="public_btn"/> 
                                </span>
                                <div className="form-control form-control-static publicOption" >
                                    Public
                                </div>
                                <span className="glyphicon form-control-feedback "></span>
                            </label>
                        </div>
                        <div className="form-group has-feedback ">
                            <label className="input-group">
                                <span className="input-group-addon">
                                    <input type="radio" ref="privateOption" name="privacy_options" value="private" id="private_btn"/>
                                </span>
                                <div className="form-control form-control-static privateOption">
                                    Private
                                </div>
                                <span className="glyphicon form-control-feedback "></span>
                            </label>
                        </div>
                    </div>    

                    <form onSubmit={this.handleSubmit.bind(this)}  >

                        <input type="text" ref="conversationName"   placeholder="Enter a name for conversation"></input>
                            <br></br>

                        <input type="submit" value="Submit"></input>
                    </form>

                </div>

            </div>
        )
    }

}