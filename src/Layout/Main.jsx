import React, { useContext } from 'react';
import { Outlet } from "react-router-dom";
import Navbar from '../Common/Navbar/Navbar';
import Footer from '../Common/Footer/Footer';
import { ThemeContext } from '../Provider/ThemeProvider';
import '../Common/Style/Style.css'
const Main = () => {
    const { darkTheme } = useContext(ThemeContext);
    const contentClass = darkTheme ? 'dark-content' : 'light-content';

    return (
        <div  className={contentClass}>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;