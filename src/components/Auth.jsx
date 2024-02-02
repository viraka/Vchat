import React, { useState } from 'react'
import { auth, provider, emailProvider } from "../firebase-config"
import { signInWithPopup } from "firebase/auth"
import '../styles/Auth.css'

import Cookies from 'universal-cookie'
const cookies = new Cookies()

const Auth = (props) => {
    const [signIn, setSignIn] = useState(false)
    //const [isSignedIn, setIsSignedIn] = useState(false)
    //const [isEmail, setIsEmail] = useState(false)


    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider)
            cookies.set("auth-token", result.user.refreshToken)
            props.setIsAuth(true)
        }
        catch (err) {
            console.error(err)
        }

    }

    const signInWithEmail = async () => {
        await signInWithPopup(auth, emailProvider)
    }

    const signUpWithEmail = async () => {
        // createUserWithEmailAndPassword(auth, email, password)
        //     .then((userCredential) => {
        //         // Signed up 
        //         const user = userCredential.user;
        //         // ...
        //     })
        //     .catch((error) => {
        //         const errorCode = error.code;
        //         const errorMessage = error.message;
        //         // ..
        //     });
    }

    const changeOption = (value) => {
        setSignIn(value)
        setSignUp(!value)
    }

    return (
        <div className="auth">
            <h1>Chatter</h1>
            <div className='auth-container'>
                <div className='auth-options'>
                    <button id="option" autoFocus onClick={() => changeOption(false)} disabled>Sign Up</button>
                    <button id="option" onClick={() => changeOption(true)} disabled>Sign In</button>
                </div>

                <div className='emailpass'>
                    <div>
                        <label htmlFor="email1">Email: </label>
                        <input type="text" id='email1' disabled />
                    </div>
                    <div>
                        <label htmlFor="password1">Password: </label>
                        <input type="password" id='password1' disabled />
                    </div>
                    {signIn ? (
                        <button onClick={signInWithEmail} disabled>Sign In with Email</button>
                    ) : (

                        <button onClick={signUpWithEmail} disabled>Sign Up with Email</button>
                    )}
                    <h1>Feature Coming Soon</h1>
                </div>

            </div>
            <h4>OR</h4>
            <p>Sign In with Google</p>
            <button onClick={signInWithGoogle}>Sign In with Google</button>
        </div>
    )
}

export default Auth;