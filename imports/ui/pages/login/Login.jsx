import React, {Button, Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import route from '/imports/routing/router.js';


//component for Login
export default class Login extends Component{
	constructor() {
        super();
    }

    //when hitting "Login" it takes email and passwords and logs in with this data 
    handleSubmit(event) {
        event.preventDefault();

        const email = ReactDOM.findDOMNode(this.refs.email).value;
        const password = ReactDOM.findDOMNode(this.refs.password).value;

        //login method
        Meteor.loginWithPassword(email, password, function (err) {
            //if succes, go to main page
            if (!err) {
                
                route.go('/');
            } else {
                console.log(err);
                alert("There is something wrong in your data input!");
                
            }
        })
        // Clear form
        ReactDOM.findDOMNode(this.refs.email).value = '';
        ReactDOM.findDOMNode(this.refs.password).value='';
    }

    render(){
    	return (

    		<form onSubmit={this.handleSubmit.bind(this)}  >
                <input type="text" ref="email"   placeholder="Email"></input>
                <br></br>
                <input type="password" ref="password"   placeholder="Password"></input>
                <br></br>
                <input type="submit" value="Submit"></input>
            </form>
    		)
    }

}
/**/