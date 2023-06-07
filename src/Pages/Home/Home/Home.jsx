import React from 'react';
import Banner from '../Banner/Banner';
import useTitle from '../../../Hooks/useTitle';
import PopularClasses from '../PopularClasses/PopularClasses';

const Home = () => {
    useTitle("Home")
    return (
        <div>
            <Banner></Banner>
            <PopularClasses></PopularClasses>
        </div>
    );
};

export default Home;