import React from 'react';
import '../styles/Header.css';
import piggy_bank from '../assets/piggy_bank.svg';

function Header() {
    return (
        <header className="app-header">
          <img src={piggy_bank} className="app-logo" alt="logo" />
        </header>
    );
}

export default Header;
