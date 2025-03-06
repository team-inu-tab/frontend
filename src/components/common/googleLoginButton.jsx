import React, { useRef } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';

const GoogleLogIn = () => {
  const linkRef = useRef(null);

  const handleSuccess = (credentialResponse) => {
    const token = credentialResponse.credential;
    const redirectUrl = `https://likelionfesival.shop/oauth2/authorization/google?token=${encodeURIComponent(token)}`;
    
    if (linkRef.current) {
      linkRef.current.href = redirectUrl;
      linkRef.current.click();
    }
  };

  return (
    <GoogleOAuthProvider clientId="776239999845-1l9ai960n66udm13vhcgeredtlr0e76q.apps.googleusercontent.com">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => {
          console.log("로그인 실패");
        }}
      />
      <a ref={linkRef} style={{ display: 'none' }}></a>
    </GoogleOAuthProvider>
  );
};

export default GoogleLogIn;