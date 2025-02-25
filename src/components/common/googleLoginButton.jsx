import React, { props } from 'react'
import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';

const GoogleLogIn = () => {
  return (
    <React.Fragment>
      <GoogleOAuthProvider clientId='클라이언트 ID'>
        <GoogleLogin
          className={`$className`}
          buttonText={`$buttonText`}
          onSuccess={(credentialResponse) => {
            console.log(credentialResponse);
          }}
          onError={() => {
            console.log('Login Failed');
          }}
        />
      </GoogleOAuthProvider>
    </React.Fragment>
  )
}

export default GoogleLogIn