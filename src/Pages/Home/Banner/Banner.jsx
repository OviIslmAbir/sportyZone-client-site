import React from 'react';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/custom-animations/fold-out-animation.css';
import 'react-awesome-slider/dist/styles.css';
const Banner = () => {
    return (
        <div className='container my-4'>
            <AwesomeSlider style={{height:"550px"}} animation="foldOutAnimation" bullets={false}>
                <div style={{height:"550px"}} data-src="img/banner-2.jpg" />
                <div style={{height:"550px"}} data-src="img/banner-1.jpg" />
                <div style={{height:"550px"}} data-src="img/banner-3.jpg" />
            </AwesomeSlider>
        </div>
    );
};

export default Banner;