import { Button, Container } from "@mui/material";
import JokeCard from "../JokeCard";
import { useRandomJoke } from "../../hooks/useJokes";
import JokeForm from "../forms/JokeForm";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setJoke } from "../../state/joke/jokeSlice";
import { RootState } from "../../state/store";

const GetRandomJokePage = () => {
    const { data, isLoading, error, refetch } = useRandomJoke();

    const joke = useSelector((state: RootState) => state.joke.joke);
    const dispatch = useDispatch();

    useEffect(() => {
        if (data?.content) {
            dispatch(setJoke(data));
        }
    }, [data]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    console.log(joke);

    return (
        <Container maxWidth="lg" className="flex flex-col gap-4 mt-32">
            <JokeForm />

            <div className="w-full flex justify-center py-4">
                <JokeCard />
            </div>

            <Button variant="contained" className="mt-4" onClick={() => refetch()}>
                Get random joke
            </Button>
        </Container>
    );
};

export default GetRandomJokePage;
