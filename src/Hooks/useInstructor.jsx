import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../Provider/AuthProvider';


const useInstructor = () => {
    const {user} = useContext(AuthContext)
    const { data: isInstructor, isLoading: isInstructorLoading} = useQuery({
        queryKey: ['isInstructor', user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/users/instructor/${user?.email}`);
            const data = await res.json()
            return data.instructor;
        }
    })
    return[isInstructor, isInstructorLoading]
};
;

export default useInstructor;