
import React from "react";


//Home
const Home = React.lazy(()=>import('./views/Home'));

const routes = [
    { path:'/Home' ,name:"Home" , component:Home}
]
export default routes;