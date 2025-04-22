import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Joke, JokeType } from "../../types/general";

interface JokeState {
    joke: JokeType;
}

const initialState: JokeState = {
    joke: {
        id: 0,
        title: "",
        content: "",
        category: "",
        authorId: 0,
    },
};

const jokeSlice = createSlice({
    name: "joke",
    initialState,
    reducers: {
        setJoke: (state, action: PayloadAction<JokeType>) => {
            state.joke = action.payload;
        },
    },
});

export const { setJoke } = jokeSlice.actions;
export default jokeSlice.reducer;
