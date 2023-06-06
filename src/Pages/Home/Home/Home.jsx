import React from 'react';
import Banner from '../Banner/Banner';
import useTitle from '../../../Hooks/useTitle';

const Home = () => {
    useTitle("Home")
    return (
        <div>
            <Banner></Banner>
        </div>
    );
};

export default Home;