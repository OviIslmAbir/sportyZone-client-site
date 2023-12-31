import { useQuery } from '@tanstack/react-query';
import React from 'react';
import './populerClasses.css'
const PopularClasses = () => {
    const {data: classes = [] } = useQuery({
        queryKey: ['classes'],
        queryFn: async () => {
            const res = await fetch('https://assignment-12-server-site-ecru.vercel.app/classes')
            const data = await res.json()
            return data.slice(0, 6);
        },
    })
    return (
        <div className='container mt-5'>
            <h2 className='text-center mb-4'>Popular Classes</h2>
            <div>
                <div className="row">
                    {
                        classes.map(singleClass => 
                            <div className="col-lg-6" key={singleClass._id}>
                                <div className="card mb-3" style={{height:"280px"}}>
                                     <img src={singleClass.image} style={{height:"100%", width:"100%"}} className="img-fluid rounded" alt="..."/>
                                    <div className="card-img-overlay">
                                        <div className="card-body body">
                                            <h2 className="card-title">{singleClass.name}</h2>
                                            <p className="card-text">{singleClass.details}</p>
                                            <p className="card-text"><small>Total Student Enroll: {singleClass.studentTotalEnroll}</small></p>
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