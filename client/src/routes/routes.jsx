import Home from "../views/Home/Home.jsx";
import Profile from "../views/Profile/Profile.jsx";

const routes = [
    {
        path: '/',
        element: <Home/>
    },
    {
        path: '/profile',
        element: <Profile/>
    }
   
]

export default routes;