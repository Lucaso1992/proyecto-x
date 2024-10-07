import Home from "../views/Home/Home.jsx";
import Profile from "../views/Profile/Profile.jsx";
import MyPosts from "../views/MyPosts/MyPosts.jsx";

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
        path: '/my-posts',
        element: <MyPosts/>
    },
   
]

export default routes;