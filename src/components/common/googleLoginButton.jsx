import React from 'react';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';

const GoogleLogIn = () => {
  const handleSuccess = (credentialResponse) => {
    const token = credentialResponse.credential;

    // POST 요청 사용
    axios.get("https://likelionfesival.shop/oauth2/authorization/google", {withCredentials: true})
      .then((response) => {
        console.log("로그인 성공:", response.data);
        window.location.href = "https://festivalteama.shop";
      })
      .catch((error) => {
        console.error("로그인 처리 중 오류 발생: ", error);
      });
  };

  return (
    <GoogleOAuthProvider clientId="776239999845-1l9ai960n66udm13vhcgeredtlr0e76q.apps.googleusercontent.com">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => {
          console.log("로그인 실패");
        }}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleLogIn;