import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import {AuthContext} from "../../../context";
import MyButton from "../button/MyButton";

const Navbar = () => {
    const {isAuth,setIsAuth} =useContext(AuthContext)

    const logout=()=>{
        setIsAuth(true)
        localStorage.removeItem('auth')
    }
    return (
        <nav className="navbar">
            <MyButton onClick={logout}>
                Выйти
            </MyButton>
            <div className="navbar__links">
                <Link to="/posts">Посты</Link>
                <Link to="/homepage">Дом</Link>
            </div>
        </nav>
    );
};

export default Navbar;