import * as React from "react";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { JokeType } from "../../types/general";
import { useMutation } from "@tanstack/react-query";
import { deleteJoke } from "../../hooks/useJokes";

interface JokeTableProps {
    data: JokeType[] | null;
    onDelete: (id: number) => void; // Callback to handle deletion
}

const JokeTable: React.FC<JokeTableProps> = ({ data, onDelete }) => {
    const mutation = useMutation({
        mutationFn: async (id: number) => {
            return await deleteJoke(id);
        },
    });

    const handleDelete = (id: number) => {
        onDelete(id); // Ensure the parent updates the data prop
    };

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 70 },
        { field: "title", headerName: "Title", width: 130 },
        { field: "content", headerName: "Joke content", width: 130 },
        { field: "category", headerName: "Category", width: 130 },
        { field: "authorId", headerName: "Author", width: 130 },
        {
            field: "actions",
            headerName: "Actions",
            width: 100,
            renderCell: (params: GridRenderCellParams) => (
                <Button variant="contained" color="error" size="small" onClick={() => handleDelete(params.row.id)}>
                    Delete
                </Button>
            ),
        },
    ];

    const paginationModel = { page: 0, pageSize: 5 };

    return (
        <Paper sx={{ height: 400, width: "100%" }}>
            <DataGrid
                rows={data ?? []}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                sx={{ border: 0 }}
            />
        </Paper>
    );
};

export default JokeTable;
