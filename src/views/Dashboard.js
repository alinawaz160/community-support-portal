import { ArrowRight, Settings } from "@mui/icons-material";
import { Box, Button, Card, CardContent, IconButton, Tooltip, Typography } from "@mui/material";
import React from "react";
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList, ListChildComponentProps } from 'react-window';



const renderRow = (props) => (index, style) => {
    console.log("data", props);
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
            <ListItemText>{props}</ListItemText>
        </ListItem>
    );
}
const renderRowJoin = (props) => (index, style) => {
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
            <ListItemText>{props}</ListItemText>
        </ListItem>
    );
}
class Dashboard extends React.Component {
    constructor() {
        super();
        this.state = {
            signUpRequests: [],
            projectRequests: [],
        }
    }
    componentDidMount() {
        this.fetchData();
    }
    fetchData = async () => {
        try {
            const response = await fetch('/getProjects', {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const data = await response.json();
            this.setState({ projectRequests: data });
        } catch (error) {
            console.error(error);
        }
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
                <div className="requests flex justify-around items-center w-full">
                    <div className="w-full md:w-1/2  ml-5 mr-5">
                        <Card style={{ borderRadius: "15px" }}>
                            <CardContent>
                                <div>
                                    <div className="txt text-center font-bold"><h1>Join Requests</h1></div>
                                    <div>
                                        <FixedSizeList
                                            color={"white"}
                                            height={200}
                                            itemSize={30}
                                            itemCount={this.state.signUpRequests.length}
                                            overscanCount={5}                                        >
                                            {renderRow(this.state.projects)}
                                        </FixedSizeList>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="w-full md:w-1/2 ml-5">
                        <Card style={{ borderRadius: "15px" }}>
                            <CardContent>
                                <div>
                                    <div className="txt text-center font-bold"><h1>Project Requests</h1></div>
                                    <div>
                                        <FixedSizeList
                                            color={"white"}
                                            height={200}
                                            itemSize={26}
                                            itemCount={5}
                                            overscanCount={5}                                        >
                                            {renderRowJoin}
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