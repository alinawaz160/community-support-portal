import { Card, CardContent } from "@mui/material";
import React from "react";

class Dashboard extends React.Component{
    constructor(){
        super();
    }
    render(){
        return(
            <div className="container">
                <div className="row w-full flex md:flex-row md:justify-around md:items-center ">
                    <div className="w-full md:w-1/2 p-3">
                    <Card sx={{ maxWidth: 345, background: "#306c74", borderRadius:"15px"}}>
                        <CardContent>
                            Ali
                        </CardContent>
                    </Card>
                    </div>
                    <div className="w-full md:w-1/2 p-3">
                    <Card sx={{ maxWidth: 345, background: "#306c74", borderRadius:"15px"}}>
                        <CardContent>
                        Ali  
                        </CardContent>
                    </Card>
                    </div>
                    <div className="w-full md:w-1/2 p-3">
                    <Card sx={{ maxWidth: 345, background: "#306c74", borderRadius:"15px"}}>
                        <CardContent>
                        Ali 
                        </CardContent>
                    </Card>
                    </div>
                </div>
                <div className="requests w-full">
                    <div className="w-full md:w-1/2">
                    <Card>
                        <CardContent>
                            Ali
                        </CardContent>
                    </Card>
                    </div>
                </div>
            </div>
        )
    }
}
export default Dashboard;