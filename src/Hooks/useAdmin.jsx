import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../Provider/AuthProvider";

const useAdmin = () => {
    const {user} = useContext(AuthContext)
    const { data: isAdmin, isLoading: isAdminLoading} = useQuery({
        queryKey: ['isAdmin', user?.email],
        queryFn: async () => {
            const res = await fetch(`https://assignment-12-server-site-ecru.vercel.app/users/admin/${user?.email}`);
            const data = await res.json()
            return data.admin;
        }
    })
    return[isAdmin, isAdminLoading]
};

export default useAdmin;