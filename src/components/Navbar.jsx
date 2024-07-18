import React from 'react';
import '../styleSheets/Layout.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul className="navbar-nav">
                <li className="nav-item font-weight-bold text-white">Weather Application</li>
            </ul>
        </nav>
    );
};

export default Navbar;