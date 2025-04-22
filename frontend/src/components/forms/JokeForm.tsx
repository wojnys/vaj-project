import { InputLabel, MenuItem, TextField } from "@mui/material";
import Select from "@mui/material/Select";
import { useForm } from "@tanstack/react-form";
import { searchCateogryJoke, searchTextJoke, useJokeCategories } from "../../hooks/useJokes";
import React from "react";

import { useQueryClient } from "@tanstack/react-query";

import FormControl from "@mui/material/FormControl";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setJoke } from "../../state/joke/jokeSlice";
import Error from "../errors/Error";

const JokeForm = () => {
    const { isLoading, data } = useJokeCategories();

    const dispatch = useDispatch();

    const form = useForm({
        defaultValues: {
            query: "",
            category: "",
        },
    });

    const [errorState, setErrorState] = React.useState<Map<string, string> | null>(null);
    const queryClient = useQueryClient();

    const handleQueryChange = async (query: string) => {
        form.setFieldValue("query", query);
        try {
            const result = await queryClient.fetchQuery({
                queryKey: ["search-joke", query],
                queryFn: () => searchTextJoke(query),
            });

            setErrorState(new Map([["query", ""]]));

            if (result) dispatch(setJoke(result));
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setErrorState(new Map([["query", error.response?.data.message]]));
            }
        }
    };

    const handleCategoryChange = async (category: string) => {
        form.setFieldValue("category", category);
        try {
            const result = await queryClient.fetchQuery({
                queryKey: ["search-joke-by-category", category],
                queryFn: () => searchCateogryJoke(category), // define this
            });

            setErrorState(new Map([["category", ""]]));

            if (result) dispatch(setJoke(result));
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setErrorState(new Map([["category", error.response?.data.message]]));
            }
        }
    };

    return (
        <form className="flex w-full gap-4">
            <div className="w-2/3 h-20">
                <form.Field
                    name="query"
                    children={(field) => (
                        <TextField
                            id="outlined-basic"
                            label="Search joke by text"
                            variant="outlined"
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => handleQueryChange(e.target.value)}
                            className="w-full"
                        />
                    )}
                />
                <Error errorMessage={errorState?.get("query") ?? null} />
            </div>

            <div className="w-1/3">
                <form.Field
                    name="category"
                    children={(field) => (
                        <FormControl fullWidth>
                            {isLoading ? (
                                <InputLabel id="demo-simple-select-label">Loading ...</InputLabel>
                            ) : (
                                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                            )}

                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={field.state.value}
                                variant="outlined"
                                label="Category"
                                className="w-full"
                                onChange={(e) => handleCategoryChange(e.target.value)}
                            >
                                {data?.map((category) => (
                                    <MenuItem key={category} value={category}>
                                        {category}
                                    </MenuItem>
                                )) ?? <MenuItem value="">No categories</MenuItem>}
                            </Select>
                        </FormControl>
                    )}
                />
                <Error errorMessage={errorState?.get("category") ?? null} />
            </div>
        </form>
    );
};

export default JokeForm;
