import React, {Button, Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import route from '/imports/routing/router.js'
import '/imports/api/people/methods.js';
import './style.css';

//component for Register
export default class Register extends Component{
    constructor() {
        super();
    }

    //on hitting Register, handleSubmit validates data and creates an account
    handleSubmit(event) {
        event.preventDefault();

        //taking data
        const email = ReactDOM.findDOMNode(this.refs.email).value;
        const password = ReactDOM.findDOMNode(this.refs.password).value;
        const confirmPassword = ReactDOM.findDOMNode(this.refs.confirmPassword).value;
        const name = ReactDOM.findDOMNode(this.refs.name).value;   

        //check passwords
        if(password!=confirmPassword||password=='')
            alert("Please check passwords!");
        //check name
        else if(name=='')
            alert("Please choose a name");
        //if it is ok
        else
        {
            //see if email is already taken
            Meteor.call('findOneWithSameEmail',email,function (err, res) {
                if(res){
                    alert("Email is taken!");
                }else{
                    //create Account
                    Meteor.call('createAccount',email,name,password,function (err, res) {
                        if(!err)
                        {
                            Accounts.createUser({
                                email: email, 
                                password: password,
                            });
                            //alerts user and goes to home page
                            alert("Signup succesful!");
                            route.go('/');
                        }
                        else
                            console.log(err);



                    })

                }


            })




        }




    }

    render(){
        return (



            <div className="row">
                <div className="col-md-4">
                </div>
                <div className="col-md-8">

                    <form onSubmit={this.handleSubmit.bind(this)}  >
                        <input type="text" ref="email"   placeholder="Email"></input>
                        <br></br>
                        <input type="text" ref="name"   placeholder="Name"></input>
                        <br></br>
                        <input type="password" ref="password"   placeholder="Password"></input>
                        <br></br>
                        <input type="password" ref="confirmPassword"   placeholder="Confirm Password"></input>
                        <br></br>
                        <input type="submit" value="Submit"></input>
                    </form>

                </div>
            </div>
        )
    }

}
