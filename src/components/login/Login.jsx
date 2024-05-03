import React from 'react';
import Header from '../header/Header';
import '../home/Home.css';
import './login.css';

import WorldSvg from '../home/WorldSvg';
import LoginForm from '../loginForm/LoginForm';
import {Link} from 'react-router-dom';








function Login() {
    return (
       
            
      
        <div className="app-containerCC">
            <Header />
            <div className="containerCC">
                <div className="descreptionCC">
                    <div className="loginFormCC">
                       
                        <div className="imLoginContainer">
                         <LoginForm />
                   

                         </div>
                  
                    </div>
                  
                  
                </div>
                <div className="imageCC">
                    <WorldSvg />


                </div>
            </div>
        
          
        </div>
    
    );
}

export default Login;
