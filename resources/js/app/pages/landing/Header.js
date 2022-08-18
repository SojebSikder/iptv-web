import React from 'react'

import Config from '../../../../admin/classes/Config';

export default function Header() {
    return (
        <header>
            <a href="#" className="logo"> {Config.getAppName()}</a>

            <input type="checkbox" id="menu-bar" />
            <label htmlFor="menu-bar" className="fas fa-bars"></label>

            <nav className="navbar">
                <a href="#home">home</a>
                {/* <a href="#features">features</a> */}
                <a href="#about">about</a>
                {/* <a href="#review">review</a>
                <a href="#pricing">pricing</a>
                <a href="#contact">contact</a> */}
            </nav>

        </header>
    )
}
