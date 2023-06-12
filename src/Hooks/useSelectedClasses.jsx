import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';



const useSelectedClasses = () => {
    const { user, loading } = useContext(AuthContext);
    const { refetch, data: selectedClasses = [] } = useQuery({
        queryKey: ['selectedClasses', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await fetch(`https://assignment-12-server-site-ecru.vercel.app/selectedClasses?email=${user?.email}`)
            const data = await res.json()
            return data;
        },
    })

    return [selectedClasses, refetch]

}
export default useSelectedClasses;