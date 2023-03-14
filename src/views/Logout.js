import { message } from "antd";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Logout(){
    
    useEffect(()=>{
        logout();
    },[])
    const history = useNavigate();
    const logout = async () => {
        try {
            console.log("ali")
            const responce = await fetch('/logout', {
                method:"GET",
                headers:{
                    Accept: "application/json",
                    'Content-Type': "application/json"
                },
                credentials:"include"
            })
            if(responce.status === 401 || !responce){
                message.error("Logout Later");
            }
            else{
                history.push("/")
                clearStorage();
                message.success("Logged Out");
            }
        } catch (error) {
            console.log(error);
        }
    }
    const clearStorage = () =>{
        localStorage.clear();
    }

    
    return(
        <div>
            {window.location.replace("/")}
        </div>
    );
}
export default Logout;