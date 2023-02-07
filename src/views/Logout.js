import { message } from "antd";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Logout(){
    
    const history = useNavigate();
    const logout =async ()=>{
        try {
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
                history.push('/');
                message.success("Logged Out");
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        logout();
    },[])
    
    return(
        <div>
            {window.location.replace("/")}
        </div>
    );
}
export default Logout;