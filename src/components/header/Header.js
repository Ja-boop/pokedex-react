import React from 'react';
import './header.css';
import logo from './logo/logo.svg'

const Header = () => {
    return (
        <React.Fragment>
        <div className="logo-container">
            <a href="/pokedex-react">
                <img className="logo" src={logo} alt="pokedex" ></img>
            </a>
        </div>
        </React.Fragment>
    )
};

export default Header;
