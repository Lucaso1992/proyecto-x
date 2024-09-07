import Home from "../views/Home/Home.jsx";
import Profile from "../views/Profile/Profile.jsx";
import RatingSystem from "../views/Rating.jsx";

const routes = [
    {
        path: '/',
        element: <Home/>
    },
    {
        path: '/profile',
        element: <Profile/>
    },
    {
        path: '/rating',
        element: <RatingSystem />
    }
   
]

export default routes;