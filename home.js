import './home.css';
import React, { useState, useEffect } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "/Users/praneel/Desktop/Advanced To-do List/advtodolist/src/firebase";
import './home.css';

function Home({ setUser, user, children }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            setUser(JSON.parse(user));
        }
    }, [setUser]);

    const handleSignUp = async () => {
        try {
            const newUser = await createUserWithEmailAndPassword(auth, email, password);
            setUser(newUser.user);
            localStorage.setItem("user", JSON.stringify(newUser.user));
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleLogin = async () => {
        try {
            const loginUser = await signInWithEmailAndPassword(auth, email, password);
            setUser(loginUser.user);
            localStorage.setItem("user", JSON.stringify(loginUser.user));
        } catch (error) {
            if (error.code === 'auth/invalid-credential') {
                alert('User not found. Please sign up first or check your email and password.');
            } else {
                console.log(error.message);
            }
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setUser(null);
            localStorage.removeItem("user");
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div>
            {user ? (
                <div>
                    <div className='user-info'> 
                        <p className="useremail" >{user?.email}</p>
                        <button className="signout" onClick={handleLogout}>Sign Out</button>
                    </div>
                    <hr className='breakline'/>
                    {children}
                </div>
            ) : (
                <div>
                    <p className="heading">To-Do List</p>  
                    <form className="homepage">
                        <input className="usernameinput" placeholder="Email Id" onChange={(event) => setEmail(event.target.value)} />
                        <input className="usernameinput" placeholder="Password" type="password" onChange={(event) => setPassword(event.target.value)} />
                    </form>
                    <div className="buttoncontainer">
                        <button className="taskpagebutton" onClick={handleSignUp}>Sign Up</button>
                        <button className="taskpagebutton" onClick={handleLogin}>Login</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home;