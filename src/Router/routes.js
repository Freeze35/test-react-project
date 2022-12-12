import Posts from "../Pages/Posts";
import PostIdPage from "../Pages/PostIdPage";
import Homepage from "../Pages/Homepage";

export const routes = [
        {path: '/posts',component:Posts,exact:true},
        {path: '/posts/:id',component:PostIdPage,exact:true},
        {path: '/homepage',component:Homepage,exact:true}
    ]