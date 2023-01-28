import { ArrowRight, Settings } from "@mui/icons-material";
import { Box, Button, Card, CardContent, IconButton, Tooltip, Typography } from "@mui/material";
import React from "react";
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList, ListChildComponentProps } from 'react-window';



function renderRow(props) {
    const { index, style } = props;

    return (
        <ListItem 
            style={style}
            key={index}
            component="div"
            secondaryAction={
                <div>
                    <Button color="primary" style={{ padding: "10px" }}>
                        Accept
                    </Button>
                    <Button color="error" style={{ padding: "10px" }}>
                        Reject
                    </Button>
                </div>
            }
        >
            <ListItemText primary={`Item ${index + 1}`} />
        </ListItem>
    );
}
class Dashboard extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div className="container">
                <Typography
                    alignItems={"center"}
                    variant={"h3"}
                    color={"white"}
                    textAlign={"left"}
                    className="txt text-bold"
                    padding={"10px"}
                >
                    Dashboard
                </Typography>
                <div className="row w-full flex flex-col md:flex-row md:justify-around md:items-center ">
                    <div className="w-full md:w-1/2 p-3">
                        <Card sx={{ maxWidth: 345, background: "#306c74", borderRadius: "15px" }}
                        >
                            <CardContent
                            >
                                <Typography
                                    alignItems={"center"}
                                    variant={"h4"}
                                    color={"white"}
                                    textAlign={"center"}
                                    className="txt text-bold"
                                >
                                    Volunteers
                                </Typography>
                                <Typography
                                    alignItems={"center"}
                                    variant={"h4"}
                                    color={"white"}
                                    textAlign={"center"}
                                    className="txt text-bold my-20"

                                >
                                    560
                                </Typography>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="w-full md:w-1/2 p-3">
                        <Card sx={{ maxWidth: 345, background: "#306c74", borderRadius: "15px" }}>
                            <CardContent>
                                <Typography
                                    alignItems={"center"}
                                    variant={"h4"}
                                    color={"white"}
                                    textAlign={"center"}
                                    className="txt text-bold"
                                >
                                    NGO's
                                </Typography>
                                <Typography
                                    alignItems={"center"}
                                    variant={"h4"}
                                    color={"white"}
                                    textAlign={"center"}
                                    className="txt text-bold my-20"

                                >
                                    1200
                                </Typography>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="w-full md:w-1/2 p-3">
                        <Card sx={{ maxWidth: 345, background: "#306c74", borderRadius: "15px" }}>
                            <CardContent>
                                <Typography
                                    alignItems={"center"}
                                    variant={"h4"}
                                    color={"white"}
                                    textAlign={"center"}
                                    className="txt text-bold"
                                >
                                    User's
                                </Typography>
                                <Typography
                                    alignItems={"center"}
                                    variant={"h4"}
                                    color={"white"}
                                    textAlign={"center"}
                                    className="txt text-bold my-20"

                                >
                                    120
                                </Typography>
                            </CardContent>
                        </Card>
                    </div>
                </div>
                <div className="requests flex justify-center items-center">
                    <div className="w-full md:w-1/2 p-3">
                        <Card style={{ borderRadius: "15px" }}>
                            <CardContent>
                                <div>
                                    <div className="txt text-center font-bold"><h1>Requests</h1></div>
                                    <div>
                                        <FixedSizeList
                                            color={"white"}
                                            height={200}
                                            itemSize={26}
                                            itemCount={200}
                                            overscanCount={5}                                        >
                                            {renderRow}
                                        </FixedSizeList>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}
export default Dashboard;