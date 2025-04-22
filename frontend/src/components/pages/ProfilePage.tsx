import { Container, Typography, TextField, Button, Box } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useGetUser, useUpdateUser } from "../../hooks/useUsers";
import { useForm } from "@tanstack/react-form";
import { UserTypeUpdate } from "../../types/general";
import { useEffect } from "react";

const ProfilePage = () => {
    const queryClient = useQueryClient();
    const id = 1; // Replace with actual user ID
    const { data: profile, isLoading, isError } = useGetUser(id);

    // Updated to use the refactored `useUpdateUser` hook
    const mutation = useUpdateUser();

    // Ensure default values are provided to avoid uncontrolled-to-controlled warnings
    const form = useForm({
        defaultValues: {
            firstname: profile?.firstname || "",
            lastname: profile?.lastname || "",
            username: profile?.username || "",
            email: profile?.email || "",
        },
        // Updated mutation call to pass `id` and `userData` as an object
        onSubmit: async ({ value }) => {
            try {
                await mutation.mutateAsync({
                    id,
                    userData: {
                        firstname: value.firstname ?? "",
                        lastname: value.lastname ?? "",
                        username: value.username ?? "",
                    },
                });
                console.log("Form submitted with values:", value);

                console.log("User data updated successfully!");
            } catch (error) {
                console.error("Failed to update user data:", error);
            }
        },
    });

    useEffect(() => {
        if (profile) {
            form.setFieldValue("firstname", profile.firstname || "");
            form.setFieldValue("lastname", profile.lastname || "");
            form.setFieldValue("username", profile.username || "");
            form.setFieldValue("email", profile.email || "");
        }
    }, [profile]);

    return (
        <Container maxWidth="lg" className="flex flex-col gap-4 mt-32">
            <Typography variant="h4" component="h1" gutterBottom>
                Profile Page
            </Typography>
            <form
                className="flex w-full flex-wrap"
                onSubmit={(e) => {
                    e.preventDefault();
                    form.handleSubmit();
                }}
            >
                <div className="w-1/2 h-20 p-2">
                    <form.Field
                        name="firstname"
                        children={(field) => (
                            <TextField
                                id="outlined-basic"
                                label="Firstname"
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

                <div className="w-1/2 h-20 p-2">
                    <form.Field
                        name="lastname"
                        children={(field) => (
                            <TextField
                                id="outlined-basic"
                                label="Lastname"
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
                <div className="w-1/2 h-20 p-2">
                    <form.Field
                        name="username"
                        children={(field) => (
                            <TextField
                                id="outlined-basic"
                                label="Username"
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
                <div className="w-1/2 h-20 p-2">
                    <form.Field
                        name="email"
                        children={(field) => (
                            <TextField
                                disabled={true}
                                id="outlined-basic"
                                label="Email"
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
                    Update User data
                </Button>
            </form>
        </Container>
    );
};

export default ProfilePage;
