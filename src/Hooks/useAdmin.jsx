import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../Provider/AuthProvider";

const useAdmin = () => {
    const {user} = useContext(AuthContext)
    const { data: isAdmin, isLoading: isAdminLoading} = useQuery({
        queryKey: ['isAdmin', user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/users/admin/${user?.email}`);
            const data = await res.json()
            return data.admin;
        }
    })
    return[isAdmin, isAdminLoading]
};

export default useAdmin;