import React from 'react';
import { useQuery } from '@tanstack/react-query';
const PopularInstructors = () => {
    const {data: instructors = [] } = useQuery({
        queryKey: ['instructors'],
        queryFn: async () => {
            const res = await fetch('https://assignment-12-server-site-ecru.vercel.app/instructors')
            const data = await res.json()
            return data.slice(0, 6);
        },
    })
    return (
        <div className='container mt-5'>
             <h2 className='text-center mb-4'>Popular Instructors</h2>
             <div className="row row-cols-1 row-cols-md-3 g-4">
                {
                    instructors.map(instructor => 
                    <div className="col" key={instructor._id}>
                        <div style={{border:"none"}} className="card h-100 shadow-lg">
                        <img src={instructor.image} className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title mb-3">{instructor.instructorName}</h5>
                            <div>
                                <p className="card-text mb-2">Subject Name: {instructor.className}</p>
                                <p className="card-text">Total Student: {instructor.numberOfStudents}</p>
                            </div>
                        </div>
                    </div>
                </div>)
                }
            </div>
        </div>
    );
};

export default PopularInstructors;