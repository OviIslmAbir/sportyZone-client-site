import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import '../../../Common/Style/Style.css'
import SingleClass from './SingleClass';
import useTitle from '../../../Hooks/useTitle';
const Classes = () => {
    useTitle("Classes")
    const {data: classes = [] } = useQuery({
        queryKey: ['classes'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/classes')
            const data = await res.json()
            return data;
        },
    })

    return (
        <div className='container mt-5'>
            <h2 className='text-center mb-4'>Classes</h2>
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {
                    classes.map(singleClass => <SingleClass  key={singleClass._id} singleClass={singleClass}></SingleClass>)
                }
            </div>
       </div>
    );
};

export default Classes;