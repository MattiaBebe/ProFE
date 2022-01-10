import React from "react";
import '../CssFile/login.css';
import Navbar from './navbar';
import TaskTable from "./taskTable";
import PaginaFantine from "./paginaFantine";
import Test from "./paginaTest";
import OperazioniVarie from "./operazioniVarie";

class Login extends React.Component{
    constructor(props){
        super(props);

        this.checkPassword = this.checkPassword.bind(this);
        this.setUsername = this.setUsername.bind(this);
        this.setPassword = this.setPassword.bind(this);
        
        this.state = {
            logged: false,
            userName: '',
            password: '',
            layout: 
                <>
                <Navbar />
                <div className="loginBody">
                    <div className="login-box">
                        <h1> Login </h1>
                        <div className="textbox">
                            <input type="text" placeholder="Username" className="input" value={this.userName} onChange={this.setUsername}/>
                        </div>
                        <div className="textbox">
                            <input type="password" placeholder="Password" value={this.password} className='input' onChange={this.setPassword}/>
                        </div>
                        <input className='btn' type="button" name="login" value="Accedi" onClick={this.checkPassword}/>
                    </div>
                </div>
                </>
        };
    }

    render(){
        return(this.state.layout);
    }

    setLayout(){
        if(!this.state.logged){
            this.setState({
            })
        }
    }

    setUsername(event){
        this.setState({userName: event.target.value});
    }

    setPassword(event){
        this.setState({password: event.target.value});
    }

    checkPassword(){
        var url = 'http://localhost:3001/users/'+this.state.userName;
        fetch(url)
         .then(response => response.json())
         .then(data => { 
            var password = data.password;
            var err = data.err;
            if(err){
                this.setState({
                layout :
                    <div class="alert alert-primary d-flex align-items-center" role="alert">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                        </svg>
                        <div>
                            No user with this userName: {this.state.userName}
                        </div>
                    </div>,
                logged : false
                })
            }
            else{
                if(password == this.state.password){
                    if(this.state.userName === 'andvol'){
                        this.setState({
                            logged: true,
                            layout: <TaskTable/>
                        });
                    }
                    else{
                        this.setState({
                            logged: true,
                            layout: <OperazioniVarie />
                            // <PaginaFantine user={this.state.userName}/>
                            // layout : <Test/>     
                        });
                    }
                }  
            }
        })
    }
}

export default Login;