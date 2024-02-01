import React, { useState } from 'react'
import { auth, provider, emailProvider } from "../firebase-config"
import { signInWithPopup } from "firebase/auth"

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

    }

    const changeOption = (value) => {
        setSignIn(value)
        setSignUp(!value)
    }

    return (
        <div className="auth">
            <h1>Chatter</h1>
            <button id="option" onClick={() => changeOption(false)}>Sign Up</button>
            <button id="option" onClick={() => changeOption(true)}>Sign In</button>

            {signIn ? (
                <div>
                    <p>Sign In with Email</p>
                    <button onClick={signInWithEmail}>Sign In with Email</button>
                </div>
            ) : (
                <div>
                    <p>Sign Up with Email</p>
                    <button onClick={signUpWithEmail}>Sign Up with Email</button>
                </div>
            )}
            <h4>OR</h4>
            <p>Sign In with Google</p>
            <button onClick={signInWithGoogle}>Sign In with Google</button>
        </div>
    )
}

export default Auth;