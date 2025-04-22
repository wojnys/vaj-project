import { Button, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { createNewJoke, useJokeCategories } from "../../hooks/useJokes";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";

const CreateJokePage = () => {
    const { isLoading, data } = useJokeCategories();

    const mutation = useMutation({
        mutationFn: async (value: any) => {
            return await createNewJoke(value);
        },
    });

    const form = useForm({
        defaultValues: {
            title: "",
            content: "",
            category: "",
        },
        onSubmit: async ({ value }) => {
            try {
                await mutation.mutateAsync(value);

                console.log("Joke created successfully!");
            } catch (error) {
                console.error("Failed to create joke:", error);
            }
        },
    });

    return (
        <Container maxWidth="lg" className="flex flex-col gap-4 mt-32">
            <Typography variant="h4" component="h1" gutterBottom>
                List of Jokes
            </Typography>
            <form
                className="flex w-full flex-wrap"
                onSubmit={(e) => {
                    e.preventDefault();
                    form.handleSubmit();
                }}
            >
                <div className="w-2/3 h-20 p-2">
                    <form.Field
                        name="title"
                        children={(field) => (
                            <TextField
                                id="outlined-basic"
                                label="Write short joke title"
                                required
                                variant="outlined"
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.setValue(e.target.value)}
                                className="w-full"
                            />
                        )}
                    />
                </div>

                <div className="w-1/3 p-2">
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
                                    required
                                    variant="outlined"
                                    label="Category"
                                    className="w-full"
                                    onChange={(e) => {
                                        field.setValue(e.target.value);
                                    }}
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
                </div>

                <div className="w-full h-20 p-2">
                    <form.Field
                        name="content"
                        children={(field) => (
                            <TextField
                                id="outlined-basic"
                                label="Write joke contentt"
                                variant="outlined"
                                required
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.setValue(e.target.value)}
                                className="w-full"
                            />
                        )}
                    />
                </div>
                <Button variant="contained" color="primary" type="submit" className="w-1/3">
                    Create Joke
                </Button>
            </form>
        </Container>
    );
};

export default CreateJokePage;
