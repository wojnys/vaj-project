// hooks/usePosts.ts
import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query";
import { Joke, JokeType } from "../types/general";
import apiClient from "../api/apiClient";
import axios from "axios";

export const fetchRandomJoke = async (): Promise<JokeType> => {
    const { data } = await apiClient.get<JokeType>("http://localhost:8000/api/jokes/random");
    return data;
};

export const searchTextJoke = async (query: string): Promise<JokeType> => {
    const { data } = await apiClient.get(`http://localhost:8000/api/jokes/search?query=${query}`);
    if (data.result.length === 0) {
        return {} as JokeType;
    }
    return data.result[0];
};

const fetchCategories = async (): Promise<string[]> => {
    const { data } = await apiClient.get<string[]>("/categories");
    return data;
};

export const searchCateogryJoke = async (category: string): Promise<JokeType> => {
    const { data } = await apiClient.get(`http://localhost:8000/api/jokes/random?category=${category}`);
    if (data.result?.length === 0) {
        return {} as JokeType;
    }
    return data;
};

export const createNewJoke = async (joke: Joke): Promise<Joke> => {
    const { data } = await axios.post<Joke>("http://localhost:8000/api/jokes", joke);
    return data;
};

const getJokes = async (): Promise<JokeType[]> => {
    const { data } = await axios.get<JokeType[]>("http://localhost:8000/api/jokes");
    return data;
};

export const deleteJoke = async (id: number): Promise<void> => {
    await axios.delete(`http://localhost:8000/api/jokes/${id}`);
};

//////////////////////

export const useDeleteJoke = () => {
    return useMutation({
        mutationFn: async (id: number) => {
            return await deleteJoke(id);
        },
    });
};

export const useGetJokes = (): UseQueryResult<JokeType[], Error> => {
    return useQuery<JokeType[]>({
        queryKey: ["jokes"],
        queryFn: getJokes,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });
};

export const useRandomJoke = (): UseQueryResult<JokeType, Error> => {
    return useQuery<JokeType>({
        queryKey: ["joke"],
        queryFn: fetchRandomJoke,
    });
};

export const useSearchJokes = (query: string): UseQueryResult<JokeType, Error> => {
    return useQuery<JokeType>({
        queryKey: ["joke", query],
        queryFn: () => searchTextJoke(query),
        enabled: !!query, // Only run the query if the query string is not empty
    });
};

export const useJokeCategories = (): UseQueryResult<string[], Error> => {
    return useQuery<string[]>({
        queryKey: ["categories"],
        queryFn: fetchCategories,
    });
};

export const useSearchCategoryJokes = (category: string): UseQueryResult<JokeType, Error> => {
    return useQuery<JokeType>({
        queryKey: ["joke", category],
        queryFn: () => searchCateogryJoke(category),
        enabled: !!category, // Only run the query if the category is not empty
    });
};
