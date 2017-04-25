// file: /imports/ui/Home.jsx
import React, {Button, Component, PropTypes} from 'react';
import route from '/imports/routing/router.js';
import './style.css';

//component for Home page
export default class Home extends React.Component {

    constructor(){
        super();
    }

    //event for Logout
    Logout(event){
        //logout
        Meteor.logout(function (err) {
            if (!err) {
                location.reload();
            } else {
                console.log(err);
            }
        });
    }


    render() {
        //if user is not logged in, we give him possibility to register, login and see conversations
        if(!Meteor.userId())
            return (
            <div>
                <h1 className="greeting">Welcome to Meteor Chat App</h1>

                <div className="container">
                    <br></br>
                    <div className="row">
                        <div className="col-md-2">
                        </div>
                        <div className="col-md-8">
                            <a href="/login" className="btn btn-primary btn-lg btn-block btn-huge">Login</a>
                        </div>
                        <div className="col-md-2">
                        </div>

                    </div>

                    <div className="row">
                        <div className="col-md-2">
                        </div>
                        <div className="col-md-8">
                            <a href="/register" className="btn btn-default btn-lg btn-block btn-huge">Register</a>
                        </div>
                        <div className="col-md-2">
                        </div>

                    </div>

                    <div className="row">
                        <div className="col-md-2">
                        </div>
                        <div className="col-md-8">
                            <a href="/conversations" className="btn btn-success btn-lg btn-block btn-huge">Conversations</a>
                        </div>
                        <div className="col-md-2">
                        </div>

                    </div>

                    <br></br>
                </div>

            </div>
            )

        //else if a user is already logged in, we give him possibility to logout and see conversations
        else{
            return(
                <div>
                    <h1 className="greeting">Welcome to Meteor Chat App</h1>

                    <div className="container">
                        <br></br>


                        <div className="row">
                            <div className="col-md-2">
                            </div>
                            <div className="col-md-8">
                                <a href="/conversations" className="btn btn-success btn-lg btn-block btn-huge">Conversations</a>
                            </div>
                            <div className="col-md-2">
                            </div>
                        </div>



                        <div className="row">
                            <div className="col-md-2">
                            </div>
                            <div onClick={this.Logout.bind(this)} className="col-md-8">
                                <a href="#" className="btn btn-danger btn-lg btn-block btn-huge">Logout</a>
                            </div>
                            <div className="col-md-2">
                            </div>

                        </div>
                        <br></br>
                    </div>

                </div>
            )
        }
    }
}