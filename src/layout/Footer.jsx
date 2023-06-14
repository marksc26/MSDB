import React from 'react'
import logoFooter from '../assets/images/logo.png'
import '../layout/styles/Footer.css'
import logoDev from '../assets/images/logoDev.png'

const Footer = () => {
    return (
        <footer className='footer'>
            <div>
                <img className='logoFooter' src={logoFooter} alt="" />
            </div>
            <div className='dev'>
                <p>Development by:</p>
                <img className='logoDev' src={logoDev} alt="" />
            </div>
        </footer>
    )
}

export default Footer