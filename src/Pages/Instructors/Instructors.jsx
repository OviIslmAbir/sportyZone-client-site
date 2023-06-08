import React from 'react';
import { useQuery } from '@tanstack/react-query';
const Instructors = () => {
    const {data: instructors = [] } = useQuery({
        queryKey: ['instructors'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/instructors')
            const data = await res.json()
            return data;
        },
    })
    return (
        <div className='container mt-5'>
                <h2 className='text-center mb-4'>Instructors</h2>
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {
                    instructors.map(instructor => 
                        <div className="col" key={instructor._id}>
                            <div style={{border:"none"}} className="card h-100 shadow-lg">
                            <img src={instructor.image} className="card-img-top" alt="..."/>
                            <div className="card-body">
                                <h5 className="card-title mb-3">{instructor.instructorName}</h5>
                                <h5 className="card-title mb-3">{instructor.email}</h5>
                            </div>
                        </div>
                    </div>
                )
                }
            </div>
        </div>
    );
};

export default Instructors;