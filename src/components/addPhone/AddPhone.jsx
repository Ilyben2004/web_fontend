import React from 'react';
import Header from '../header/Header';
import AddPhoneForme from './AddPhoneForme';
import PhoneSvg from './PhoneSvg';











function AddPhone() {

    return (
       
            
      
        <div className="app-containerCC">
            <Header />
          
            <div className="containerCC">
        
                <div className="descreptionCC imSignContainer">
               
                <div className="textSign">Your  Please Enter Your Appreils Information
                            </div>
                   <AddPhoneForme />
                </div>
                <div className="imageCC">
                    <PhoneSvg />
                 

                </div>
            </div>
        
          
        </div>
    
    );
}

export default AddPhone;
