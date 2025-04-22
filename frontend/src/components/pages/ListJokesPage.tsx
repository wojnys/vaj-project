import { Container, Typography } from "@mui/material";
import JokeTable from "../table/JokeTable";
import { useGetJokes, useDeleteJoke } from "../../hooks/useJokes";

const ListJokesPage = () => {
    const { data: jokes, isLoading, isError, refetch } = useGetJokes();
    const deleteJokeMutation = useDeleteJoke();

    const handleDelete = (id: number) => {
        console.log("Deleting joke with ID:", id);
        deleteJokeMutation.mutate(id, {
            onSuccess: () => {
                console.log("Joke deleted successfully");
                refetch();
            },
            onError: (error: any) => {
                console.error("Error deleting joke:", error);
            },
        });
    };

    return (
        <Container maxWidth="lg" className="flex flex-col gap-4 mt-32">
            <Typography variant="h4" component="h1" gutterBottom>
                List of Jokes
            </Typography>
            <JokeTable data={jokes ?? []} onDelete={(id) => handleDelete(id)} />
        </Container>
    );
};

export default ListJokesPage;
