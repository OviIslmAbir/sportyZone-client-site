import { useQuery } from '@tanstack/react-query';
import React from 'react';

const PopularClasses = () => {
    const {data: classes = [] } = useQuery({
        queryKey: ['classes'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/classes')
            const data = await res.json()
            return data;
        },
    })
    return (
        <div className='container mt-4'>
            <h2 className='text-center mb-3'>Popular Classes</h2>
            <div>
                <div className="row">
                    {
                        classes.map(singleClass => 
                            <div className="col-lg-6" key={singleClass._id}>
                                <div className="card mb-3">
                                    <div className="row g-0">
                                        <div className="col-md-4">
                                            <img src={singleClass.image} style={{height:"100%"}} className="img-fluid rounded-start" alt="..."/>
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body">
                                                <h5 className="card-title">{singleClass.name}</h5>
                                                <p className="card-text">{singleClass.details}</p>
                                                <p className="card-text"><small>Total Student Enroll: {singleClass.studentTotalEnroll}</small></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default PopularClasses;