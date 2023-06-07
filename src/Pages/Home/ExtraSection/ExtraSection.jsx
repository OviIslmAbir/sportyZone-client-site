import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";

import "swiper/css";
import "swiper/css/pagination";

const ExtraSection = () => {
    const [reviews , setReviews] = useState([])
    useEffect(() => {
        fetch('review.json')
           .then(res => res.json())
           .then(data => setReviews(data))
    }, [])
    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">What your student says</h2>
             <Swiper
                    slidesPerView={3}
                    spaceBetween={30}
                    pagination={{
                    clickable: true,
                    }}
                    modules={[Pagination]}
                    className="mySwiper p-4"
                >
                    {
                        reviews.map(review =>
                            <SwiperSlide>
                                <div className="text-center" key={review.id}>
                                    <img style={{width:"80px", height: "80px", borderRadius:"50%"}} src={review.image} alt="" className="mb-3" />
                                    <h4>{review.student_name}</h4>
                                    <p className="text-left">{review.comment}</p>
                                    <p><small>{review.date}</small></p>
                                </div>
                            </SwiperSlide>
                            )
                    }
            </Swiper>
        </div>
    );
};

export default ExtraSection;