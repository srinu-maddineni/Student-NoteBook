import React from 'react'
import { GoogleLogin } from '@react-oauth/google'
import axios from 'axios'

const GoogleAuth = () => {





    return (
        <>
            <div>
                <h1>GoogleAuth</h1>
                <GoogleLogin
                    onSuccess={credentialResponse => {
                        console.log(credentialResponse);
                    }}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                />
            </div>

        </>
    )

}

export default GoogleAuth