import React, {useContext} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import Posts from "../Pages/Posts";
import Homepage from "../Pages/Homepage";
import PostIdPage from "../Pages/PostIdPage";
import Login from "../Pages/Login";
import {AuthContext} from "../context";
import Loader from "./UI/Loader/Loader";

const AppRouter = () => {
    const {isAuth,isLoading}=useContext(AuthContext)

    if(isLoading){
        return <Loader/>
    }

    return (
        isAuth
            ?
            <div>
                <Routes>
                    <Route path="/login" element={<Login/>} />
                    <Route path="/homepage" element={<Homepage/>} />
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
            </div>
            :
            <div>
                <Routes>
                    <Route path="/posts" element={<Posts/>} />
                    <Route exact path="/posts/:id" element={<PostIdPage/>} />
                    <Route path="/homepage" element={<Homepage/>} />
                    <Route path="*" element={<Navigate to="/posts" />} />
                </Routes>
            </div>

    );
};

export default AppRouter;