import React from 'react';
import Header from '../header/Header';

import WorldSvg from '../home/WorldSvg';
import SignupForm from '../signupForm/SignupForm';
import './signup.css'








function Signup() {
    return (
       
            
      
        <div className="app-containerCC">
            <Header />
            <div className="containerCC">
                <div className="descreptionCC">
                  
                       
                        <div className="imSignContainer">
                            <div className="textSign">
                                Please Enter Your Informations
                            </div>
                         <SignupForm />
                   

                         </div>
                  
                  
                  
                </div>
                <div className="imageCC">
                    <WorldSvg />


                </div>
            </div>
        
          
        </div>
    
    );
}

export default Signup;
