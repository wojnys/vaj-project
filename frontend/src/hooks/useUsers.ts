import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";
import { UserType, UserTypeUpdate } from "../types/general";

export const updateUserdata = async (id: number, userData: UserTypeUpdate): Promise<void> => {
    await axios.put(`http://localhost:8000/api/users/${id}`, userData);
};

export const getUser = async (id: number): Promise<UserType> => {
    const { data } = await axios.get(`http://localhost:8000/api/users/${id}`);
    return data;
};

//////////////////////

// Removed the `useUpdateUser` hook and replaced it with a direct call to `updateUserdata` in the mutation function.
export const useUpdateUser = () => {
    return useMutation({
        mutationFn: async ({ id, userData }: { id: number; userData: UserTypeUpdate }) => {
            return await updateUserdata(id, userData);
        },
    });
};

export const useGetUser = (id: number): UseQueryResult<UserType, Error> => {
    return useQuery<UserType>({
        queryKey: ["user", id],
        queryFn: () => getUser(id),
    });
};
