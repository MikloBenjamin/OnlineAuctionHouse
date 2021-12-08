import React from "react";
import { Link } from "react-router-dom";
import logo from "../logoGGfinal.png";
import { getLoginSvg, getLogoutSvg, getUserSvg, getCreatePostSvg } from "../helpers/svgFunctions";

function userCreatePost(isLoggedIn, user){
    if(isLoggedIn){
        return <div>
            {getCreatePostSvg()}
            <Link to={{
                pathname: "/createpost",
                state: user
            }}>Create Post</Link>
        </div>
    }
}

const NavBar = props => (
    <nav id="shared_navbar">
        <Link to={{
            pathname: "/",
            state: props.user
        }}>
            <img id="logo" src={logo} alt=""></img>
        </Link>
        <div className="navbar-input">
            <div className="iconPairs">
                {props.userIcon}
                <Link to={{
                    pathname: "/user",
                    state: {
                        "visitor": props.user,
                        "owner": props.user,
                    }
                }}>
                    {props.username}
                </Link>
            </div>
            {props.create_post}
            <div className="iconPairs">
                {props.loginIcon}
                <Link to={{
                    pathname: "/login",
                    state: props.state
                }}>{props.login}</Link>
            </div>
            {/* <div>
                {getDropdownSvg()}
            </div> */}
        </div>
        {/* <div className="search-engine-div">
            <form>
                <input className="search" type="text" placeholder="Search.." name="search"/>
                {getSearchSvg()}
            </form>
        </div> */}
    </nav>
)

function showNavbar(user){
    if (user !== undefined && user !== null && user !== "" && user !== 0 && user !== {}){
        return  <NavBar user={user} username={user.firstname + " " + user.lastname} state={"logout"} login={"Logout"} userIcon={getUserSvg()} loginIcon={getLogoutSvg()} create_post={userCreatePost(true, user)}/>
    }
    return  <NavBar user={undefined} username={""} state={"login"} login={"Login"} userIcon={""} loginIcon={getLoginSvg()} create_post={userCreatePost(false)}/>
}

export {
    showNavbar
}
