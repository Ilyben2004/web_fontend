import React from 'react';
import Header from '../header/Header';
import './Home.css';
import { ButtonCustom } from '../Bscmps'; // Import ButtonCustom component
import WorldSvg from './WorldSvg';
import {Link} from 'react-router-dom';







function Home() {

    return (
       
            
      
        <div className="app-containerCC">
            <Header />
            <div className="containerCC">
                <div className="descreptionCC">
                    <div className="textContainerCC">
                        <div className="text">  Hello , You can start tracking  your Drivers Now</div>
                        <Link to="/login">  <div className="button">   <ButtonCustom  className='ButtonCustomed' buttonContent="Get Started" /></div></Link>
                       
                       
                  
                    </div>
                </div>
                <div className="imageCC">
                    <WorldSvg />


                </div>
            </div>
        
          
        </div>
    
    );
}

export default Home;
