import React from "react";
import accessDenied from "../assets/accessDenied.png";

const AccessDenied =() =>{
    return(
        <div className="txt text-white font-bold font-200 "> 
            <img src={accessDenied} width={"100px"}/>
            <div>Access Denied</div>
        </div>
    )
}
export default AccessDenied;