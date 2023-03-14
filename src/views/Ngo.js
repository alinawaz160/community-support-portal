import React, { useEffect, useRef, useState } from "react";
import MUIDataTable from "mui-datatables";
import { IconButton, Button } from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { message } from "antd";
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import AccessDenied from "../components/AccesDenied";
export default function NGO() {

    const [data, setData] = useState([]);
    const [user, setUser] = useState(null);

    const tableRef = useRef();

    const handleDelete = async (id) => {
        if(user && user === "Admin"){
        const response = await fetch(`deleteNGO/${id}`, {
            method: "DELETE",
        });

        if (response.ok) {
            message.success("Volunteer deleted successfully");
            reloadTable();
        } else {
            message.error("Failed to delete volunteer");
        }
    }
    else{
        message.info("Access Denied")
    }
    };

    const reloadTable = () => {
        fetchData();
        tableRef.current && tableRef.current.reload();
    };

    useEffect(() => {

        fetchData();
        setUser(window.localStorage.getItem("user"))
    }, []);
    const fetchData = async () => {
        let response = await fetch("/getNGO", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        const json = await response.json();
        const activeNgo = json.filter(ngo => ngo.activeStatus === "true");
        const data = activeNgo.map((ngo) => ({
            ...ngo,
            options: (
                <IconButton
                    variant="outlined"
                    onClick={() => {
                        handleDelete(ngo._id);
                    }}
                >
                    <DeleteOutlineOutlinedIcon color="error" />
                </IconButton>
            ),
        }));
        setData(data);
    };

    const options = {
        download: false,
        print: false,
        selectableRowsHideCheckboxes: true,
        search: false,
        viewColumns: false,
        filter: false,
    };
    const columns = [
        {
            label: "Name",
            name: "ngoName"
        },
        {
            label: "Branches",
            name: "branches"
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
            label: "Active Status",
            name: "activeStatus",
        },
        {
            label: "Options",
            name: "options",
        }
    ];
    return (
        <div className="flex items-center justify-center h-100vh">
            {user && (user === "Admin" || user === "Ngo") ? (
                <>
                    <MUIDataTable
                        ref={tableRef}
                        title={"NGO List"}
                        columns={columns}
                        data={data}
                        options={options}
                        className="w-[90%]"
                    />
                    <div className="absolute top-10">
                        <Button
                            className="bg-red-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-full"
                            onClick={(() => {
                                window.location.reload();
                            })}
                            size="large"
                        >
                            <RotateLeftIcon />
                        </Button>
                    </div>
                </>
            ) :
                (
                    <div className="accessDenied my-20">
                        <AccessDenied />
                    </div>
                )
            }
        </div>
    )
}
