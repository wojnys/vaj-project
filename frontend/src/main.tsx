import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "./state/store.ts";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateJokePage from "./components/pages/CreateJokePage.tsx";
import ListJokesPage from "./components/pages/ListJokesPage.tsx";
import GetRandomJokePage from "./components/pages/GetRandomJokePage.tsx";
import ProfilePage from "./components/pages/ProfilePage.tsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { index: true, element: <h1>Home</h1> },
            { path: "joke", element: <GetRandomJokePage /> },
            { path: "joke/create-joke", element: <CreateJokePage /> },
            { path: "joke/list-jokes", element: <ListJokesPage /> },
            { path: "profile", element: <ProfilePage /> },
            // {
            //     path: "characters/:characterId",
            //     loader: characterDetailLoader,
            //     element: <CharacterDetail />,
            //     children: [
            //         {
            //             index: true,
            //             loader: characterCommentsLoader,
            //             action: characterCommentsAction,
            //             element: <CharacterComments />,
            //         },
            //     ],
            // },
            // {
            //     path: "episodes",
            //     loader: episodesLoader,
            //     element: <Episodes />,
            //     children: [
            //         { index: true, element: <h1>Choose an episode</h1> },
            //         {
            //             path: ":episodeId",
            //             loader: episodeDetailLoader,
            //             element: <EpisodeDetail />,
            //         },
            //     ],
            // },

            // {
            //     path: "locations",
            //     loader: locationsLoader,
            //     element: <Locations />,
            //     children: [
            //         { index: true, element: <h1>Choose a location</h1> },
            //         {
            //             path: ":locationId",
            //             loader: locationDetailLoader,
            //             element: <LocationDetail />,
            //         },
            //     ],
            // },
        ],
    },
]);

createRoot(document.getElementById("root")!).render(
    <QueryClientProvider client={queryClient}>
        <Provider store={store}>
            <StrictMode>
                <RouterProvider router={router} />
            </StrictMode>
        </Provider>
    </QueryClientProvider>
);
