import React, { useEffect, useRef, useState } from "react";
import MUIDataTable from "mui-datatables";
import { IconButton,Button } from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { message } from "antd";
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
export default function NGO() {
    
    const [data, setData] = useState([]);

    const tableRef = useRef();

    const handleDelete = async (id) => {
        console.log("Id:", id);
        const response = await fetch(`deleteVolunteer/${id}`, {
            method: "DELETE",
        });

        if (response.ok) {
            message.success("Volunteer deleted successfully");
            reloadTable();
        } else {
            message.error("Failed to delete volunteer");
        }
    };

    const reloadTable = () => {
        fetchData();
        tableRef.current && tableRef.current.reload();
    };

    useEffect(() => {

        fetchData();
    }, []);
    const fetchData = async () => {
        let response = await fetch("/getNGO", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        const json = await response.json();
        setData(
            json.map((volunteer) => ({
                ...volunteer,
                options: (
                    <IconButton
                        variant="outlined"
                        onClick={() => {
                            handleDelete(volunteer._id);
                        }}
                    >
                        <DeleteOutlineOutlinedIcon />
                    </IconButton>
                ),
            }))
        );
    };


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
        <div className="flex items-center justify-center h-100vh">
        <MUIDataTable
            ref={tableRef}
            title={"Volunteer List"}
            columns={columns}
            data={data}
            options={options}
            className="w-[90%]"
        />
        <div className="absolute top-10">
            <Button
                className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-full"
                onClick={(() => {
                    window.location.reload();
                })}
                size="large"
            >
                <RotateLeftIcon />
            </Button>
        </div>
    </div>
    )
}
