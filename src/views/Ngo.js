import React from "react";
import MUIDataTable from "mui-datatables";
import { IconButton } from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

export default function NGO() {
    const options = {
        download: false,
        print: false,
        selectableRowsHideCheckboxes: true,
        search: false,
        viewColumns: false,
        filter: false,
        customToolbar: () => (<IconButton
            variant="outlined"
        >
            <AddCircleOutlineOutlinedIcon></AddCircleOutlineOutlinedIcon>
        </IconButton>),
    };
    const columns = [
        {
            label: "Name",
            name: "name"
        },
        {
            label: "Company",
            name: "company"
        },
        {
            label: "City",
            name: "city"
        },
        {
            label: "State",
            name: "state"
        },
        {
            label: "Delete",
            name: "delete",
        }
    ];
    const initialData = [
        {
            name: "Raja",
            company: "Test Corp1",
            city: "Denmark",
            state: "NY",
            delete: (
                <IconButton
                    variant="outlined"
                >
                    <DeleteOutlineOutlinedIcon></DeleteOutlineOutlinedIcon>
                </IconButton>
            ),
        },
        {
            name: "Joe James2",
            company: "Test Corp2",
            city: "Karachi",
            state: "NS",
            delete: (
                <IconButton
                    variant="outlined"
                >
                    <DeleteOutlineOutlinedIcon></DeleteOutlineOutlinedIcon>
                </IconButton>
            ),
        },
        {
            id: 2,
            name: "Joe James3",
            company: "Test Corp3",
            city: "Lahore",
            state: "NA",
            delete: (
                <IconButton
                    variant="outlined"
                >
                    <DeleteOutlineOutlinedIcon></DeleteOutlineOutlinedIcon>
                </IconButton>
            ),
        }
    ];
    return (

        <div>
            <MUIDataTable
                title={"NGO's List"}
                data={initialData}
                columns={columns}
                options={options}
            />
        </div>

    )
}
