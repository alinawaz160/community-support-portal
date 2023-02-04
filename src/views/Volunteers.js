import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import { IconButton } from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

export default function Volunteer() {

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            let response = await fetch('/getVolunteers', {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            })
            const json = await response.json();
            setData(json.map(volunteer => ({
                ...volunteer,
                options: (
                    <IconButton
                        variant="outlined"
                    >
                        <DeleteOutlineOutlinedIcon />
                    </IconButton>
                ),
            })));
        }
        fetchData();
    }, []);


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
            name: "fullname"
        },
        {
            label: "Address",
            name: "address"
        },
        {
            label: "Phone",
            name: "phone"
        },
        {
            label: "Email",
            name: "email"
        },
        {
            label: "Quality Points",
            name: "qualityPoints",
        },
        {
            label: "Options",
            name: "options",
        }
    ];
    return (

        <div>
            <MUIDataTable
                title={"Volunteer List"}
                columns={columns}
                data={data}
                options={options}
            />
        </div>

    )
}
