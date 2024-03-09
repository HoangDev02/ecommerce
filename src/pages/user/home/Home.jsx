import React from 'react';
import HomeUser from '../../../Components/User/Home/HomeUser';
import Carousels from '../../../Components/User/Carousels/Carousels';
import Category from '../../../Components/NavBar/Category';
import './home.css';
const Home = () => {
    return (
        <div className='backrgound'>
            <Category/>
            <Carousels/>
            <HomeUser/>
        </div>
    );
};

export default Home;