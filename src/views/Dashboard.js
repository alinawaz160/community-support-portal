import React from "react";
import { Link } from "react-router-dom";

export default class Dashboard extends React.Component{
    render(){
        return(
            <div>
                <h1>Dashboard Page</h1>
                <Link to="/">
                    Go to Home
                </Link>
            </div>
        )
    }
} 